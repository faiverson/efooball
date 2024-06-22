<?php

namespace Database\Seeders;

use App\Enums\GameType;
use App\Enums\TournamentType;
use App\Models\Player;
use App\Models\SingleGame;
use App\Models\Tournament;
use Carbon\Carbon;
use Illuminate\Console\View\Components\TwoColumnDetail;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;
use PulkitJalan\Google\Facades\Google;

class SingleGamesSeeder extends Seeder
{
    const CHUNK = 250;

    public function run()
    {
        $client = Google::getClient();
        $client->setScopes(\Google_Service_Sheets::SPREADSHEETS_READONLY);
        $sheets = new \Google_Service_Sheets($client);
        $spreadsheetId = config('google.client_id');

        if(env('RESET_DATABASE')) {
            Schema::disableForeignKeyConstraints();
            DB::table('tournaments')->truncate();
            DB::table('single_strikes')->truncate();
            DB::table('single_games')->truncate();
            Schema::enableForeignKeyConstraints();
        }

        do {
            $total_games = SingleGame::count();
            $from_row = $total_games + 2; // because should start +1 but the first row is a title, so it is 1 + 1 = 2
            $to_row = $from_row + self::CHUNK - 1;
            $range = "individual!B{$from_row}:I{$to_row}";
            $response = $sheets->spreadsheets_values->get($spreadsheetId, $range);
            $rows = $response->getValues();
            $this->createGames($rows);
        } while(count($rows) === self::CHUNK);
    }

    protected function createGames($rows)
    {
        $t_id = 0;
        $date_at = null;
        foreach ($rows as $row) {
            [$date, $p_home, $home_score, $away_score, $p_away, $winner, $version, $tournament] = $row + [7 => ''];
            if(empty($p_home) && empty($p_away)) {
                return false;
            }

            if(empty($date) && empty($date_at)) {
              $date_at = Carbon::createFromFormat('Y-m-d', SingleGame::max('played_at'));
            } elseif(!empty($date)) {
              $date_at = Carbon::createFromFormat('M d, Y', $date);
            }

            $home = Player::where('name', trim($p_home))->first();
            $away = Player::where('name', trim($p_away))->first();
            if(empty($home) || empty($away)) {
              $this->command->error('Missing players', $row);
              throw new \Exception('Missing Player');
            }

            try {
                $type = $tournament ? strtolower($tournament) : TournamentType::AMISTOSO;
                $game_version = Str::replace(' ', '_', strtolower($version));
                $game = SingleGame::create([
                    'home_id' => $home->id,
                    'away_id' => $away->id,
                    'home_score' => $home_score,
                    'away_score'=> $away_score,
                    'type'=> $type,
                    'version'=> $game_version,
                    'result'=> $home_score >= $away_score ? ($home_score > $away_score ? 'home' : 'draw')  : 'away',
                    'played_at'=> $date_at->format('Y-m-d'),
                ]);

                if(!empty($tournament) && $type != TournamentType::AMISTOSO) {
                    $t = Tournament::{$type}()->where('played_at', '<>', $date_at->format('Y-m-d'))->count() + 1;
                    $ordinal = $this->strOrdinal($t);
                    $selTournament = Tournament::firstOrCreate(
                        [
                            'name'=> "$tournament $ordinal",
                            'game_type'=> GameType::SINGLE,
                            'type'=> $type,
                            'played_at'=> $date_at->format('Y-m-d'),
                            'version'=> $game_version,
                        ]
                    );

                    empty($selTournament->games) ? $selTournament->games = collect($game->getKey()): $selTournament->games->push($game->getKey());
                    $selTournament->positions = $this->calculateTournamentPosition($selTournament->games);
                    $selTournament->save();

                    if($selTournament->id !== $t_id) {
                      $t_id = $selTournament->id;
                      with(new TwoColumnDetail($this->command->getOutput()))->render(
                        '<fg=blue;options=bold>Tournament ID: ' . $selTournament->id .'</>'
                      );
                    }
                } elseif($t_id > 0) {
                  $t_id = 0;
                  with(new TwoColumnDetail($this->command->getOutput()))->render(
                    '<fg=blue;options=bold>End Tournament</>'
                  );
                }
            }
            catch (\Exception $e) {
                dd($row, $e);
            }

            with(new TwoColumnDetail($this->command->getOutput()))->render(
                "{$game->home->name} {$game->home_score}-{$game->away_score} {$game->away->name} ({$game->played_at})",
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
        $eloquentGames = SingleGame::with(['home', 'away'])->whereIntegerInRaw('id', $games->toArray())->get();
        return $eloquentGames->reduce(function ($positions, $game) {
            if(!array_key_exists($game->home->id, $positions)) {
                $positions[$game->home->id] = (object)['PLAYER' => $game->home->name, 'POINTS' => 0, 'GP' => 0, 'W' => 0, 'D' => 0, 'L' => 0, 'GF' => 0, 'GC' => 0, 'DIF' => 0];;
            }
            if(!array_key_exists($game->away->id, $positions)) {
                $positions[$game->away->id] = (object)['PLAYER' => $game->away->name, 'POINTS' => 0, 'GP' => 0, 'W' => 0, 'D' => 0, 'L' => 0, 'GF' => 0, 'GC' => 0, 'DIF' => 0];;
            }

            $local = $positions[$game->home->id];
            $away = $positions[$game->away->id];

            $local->GP += 1;
            $local->GF += $game->home_score;
            $local->GC += $game->away_score;
            $local->DIF += ($game->home_score - $game->away_score);
            $away->GP += 1;
            $away->GF += $game->away_score;
            $away->GC += $game->home_score;
            $away->DIF += ($game->away_score - $game->home_score);

            if($game->home_score > $game->away_score) {
                $local->POINTS += 3;
                $local->W += 1;
                $away->L += 1;
            } elseif($game->home_score === $game->away_score) {
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
