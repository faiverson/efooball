<?php

namespace Database\Seeders;

use App\Models\Game;
use App\Models\Team;
use App\Models\Tournament;
use Carbon\Carbon;
use Illuminate\Console\View\Components\TwoColumnDetail;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;
use PulkitJalan\Google\Facades\Google;
use App\Enums\TournamentType;

class GamesSeeder extends Seeder
{
    const CHUNK = 250;

    public function run()
    {
        $client = Google::getClient();
        $client->setScopes(\Google_Service_Sheets::SPREADSHEETS_READONLY);
        $sheets = new \Google_Service_Sheets($client);
        $spreadsheetId = config('google.client_id');

        Schema::disableForeignKeyConstraints();
        DB::table('tournaments')->truncate();
        DB::table('team_strikes')->truncate();
        DB::table('games')->truncate();
        Schema::enableForeignKeyConstraints();

        do {
            $total_games = Game::count();
            $from_row = $total_games + 2; // because should start +1 but the first row is a title, so it is 1 + 1 = 2
            $to_row = $from_row + self::CHUNK - 1;
            $range = "martes!B{$from_row}:I{$to_row}";
            $response = $sheets->spreadsheets_values->get($spreadsheetId, $range);
            $rows = $response->getValues();
            $this->createGames($rows);
        } while(count($rows) === self::CHUNK);
    }

    protected function createGames($rows)
    {
        $date_at = now();
        foreach ($rows as $row) {
            [$date, $home, $team_home_score, $team_away_score, $away, $winner, $version, $tournament] = $row + [7 => ''];
            if(empty($home) && empty($away)) {
                return false;
            }
            $date_at = empty($date) ? $date_at : Carbon::createFromFormat('M d, Y', $date);
            $players = explode('/', $home);
            sort($players);
            $home = Team::where('name', "{$players[0]}-{$players[1]}")->first();
            $players = explode('/', $away);
            sort($players);
            $away = Team::where('name', "{$players[0]}-{$players[1]}")->first();
            if(empty($home) || empty($away)) {
              $this->command->error('Missing teams', $row);
              throw new \Exception('Missing Team');
            }

            try {
                $game = Game::create([
                    'team_home_id' => $home->id,
                    'team_away_id' => $away->id,
                    'team_home_score' => $team_home_score,
                    'team_away_score'=> $team_away_score,
                    'version'=> Str::replace(' ', '_', strtolower($version)),
                    'result'=> $team_home_score >= $team_away_score ? ($team_home_score > $team_away_score ? 'home' : 'draw')  : 'away',
                    'created_at'=> $date_at->format('Y-m-d H:i:s'),
                    'updated_at'=> $date_at->format('Y-m-d H:i:s'),
                ]);

                if(!empty($tournament)) {
                    $type = strtolower($tournament);
                    $t = Tournament::{$type}()->where('played_at', '<>', $date_at->format('Y-m-d'))->count() + 1;
                    $ordinal = $this->strOrdinal($t);
                    $selTournament = Tournament::firstOrCreate(
                        [
                            'name'=> "$tournament $ordinal",
                            'type'=> $type,
                            'played_at'=> $date_at->format('Y-m-d'),
                            'version'=> Str::replace(' ', '_', strtolower($version)),
                        ]
                    );

                    empty($selTournament->games) ? $selTournament->games = collect($game->getKey()): $selTournament->games->push($game->getKey());
                    $selTournament->positions = $this->calculateTournamentPosition($selTournament->games);
                    $selTournament->save();

                    with(new TwoColumnDetail($this->command->getOutput()))->render(
                        '<fg=blue;options=bold>Tournament ID: ' . $selTournament->id .'</>'
                    );
                }
            }
            catch (\Exception $e) {
                dd($row, $e);
            }

            with(new TwoColumnDetail($this->command->getOutput()))->render(
                "{$game->teamHome->name} {$game->team_home_score}-{$game->team_away_score} {$game->teamAway->name}",
                '<fg=green;options=bold>Game ID: ' . $game->id .'</>'
            );
        }
    }

    private function strOrdinal($value)
    {
        $number = abs($value);

        $indicators = ['th','st','nd','rd','th','th','th','th','th','th'];

        $suffix = $indicators[$number % 10];
        if ($number % 100 >= 11 && $number % 100 <= 13) {
            $suffix = 'th';
        }

        return number_format($number) . $suffix;
    }

    private function calculateTournamentPosition($games)
    {
        $eloquentGames = Game::with(['teamHome', 'teamAway'])->whereIntegerInRaw('id', $games->toArray())->get();
        return $eloquentGames->reduce(function ($positions, $game) {
            if(!array_key_exists($game->teamHome->id, $positions)) {
                $positions[$game->teamHome->id] = (object)['TEAM' => $game->teamHome->name, 'POINTS' => 0, 'GP' => 0, 'W' => 0, 'D' => 0, 'L' => 0, 'GF' => 0, 'GC' => 0, 'DIF' => 0];;
            }
            if(!array_key_exists($game->teamAway->id, $positions)) {
                $positions[$game->teamAway->id] = (object)['TEAM' => $game->teamAway->name, 'POINTS' => 0, 'GP' => 0, 'W' => 0, 'D' => 0, 'L' => 0, 'GF' => 0, 'GC' => 0, 'DIF' => 0];;
            }

            $local = $positions[$game->teamHome->id];
            $away = $positions[$game->teamAway->id];

            $local->GP += 1;
            $local->GF += $game->team_home_score;
            $local->GC += $game->team_away_score;
            $local->DIF += ($game->team_home_score - $game->team_away_score);
            $away->GP += 1;
            $away->GF += $game->team_away_score;
            $away->GC += $game->team_home_score;
            $away->DIF += ($game->team_away_score - $game->team_home_score);

            if($game->team_home_score > $game->team_away_score) {
                $local->POINTS += 3;
                $local->W += 1;
                $away->L += 1;
            } elseif($game->team_home_score === $game->team_away_score) {
                $local->POINTS += 1;
                $away->POINTS += 1;
                $local->D += 1;
                $away->D += 1;
            } else {
                $away->POINTS += 3;
                $away->W += 1;
                $local->L += 1;
            };

            return $positions;
        }, []);
    }
}
