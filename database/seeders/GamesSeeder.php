<?php

namespace Database\Seeders;

use App\Enums\GameType;
use App\Enums\TournamentType;
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

class GamesSeeder extends Seeder
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
            Tournament::whereIn('type', [TournamentType::LIBERTADORES, TournamentType::SUDAMERICANA])->delete();
            DB::table('team_strikes')->truncate();
            DB::table('games')->truncate();
            Schema::enableForeignKeyConstraints();
        }

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
        $t_id = 0;
        $date_at = null;
        foreach ($rows as $row) {
            [$date, $home, $team_home_score, $team_away_score, $away, $winner, $version, $tournament] = $row + [7 => ''];
            if(empty($home) && empty($away)) {
                return false;
            }

            if(empty($date) && empty($date_at)) {
              $date_at = Carbon::createFromFormat('Y-m-d', Game::max('played_at'));
            } elseif(!empty($date)) {
              $date_at = Carbon::createFromFormat('M d, Y', $date);
            }

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
                $type = $tournament ? strtolower($tournament) : TournamentType::AMISTOSO;
                $game = Game::create([
                    'team_home_id' => $home->id,
                    'team_away_id' => $away->id,
                    'team_home_score' => $team_home_score,
                    'team_away_score'=> $team_away_score,
                    'type'=> $type,
                    'version'=> Str::replace(' ', '_', strtolower($version)),
                    'result'=> $team_home_score >= $team_away_score ? ($team_home_score > $team_away_score ? 'home' : 'draw')  : 'away',
                    'played_at'=> $date_at->format('Y-m-d'),
                ]);

                if(!empty($tournament) && $type != TournamentType::AMISTOSO) {
                    $t = Tournament::{$type}()->where('played_at', '<>', $date_at->format('Y-m-d'))->count() + 1;
                    $ordinal = $this->strOrdinal($t);
                    $selTournament = Tournament::firstOrCreate(
                        [
                            'name'=> "$tournament $ordinal",
                            'game_type'=> GameType::TEAM,
                            'type'=> $type,
                            'played_at'=> $date_at->format('Y-m-d'),
                            'version'=> Str::replace(' ', '_', strtolower($version)),
                        ]
                    );

                    empty($selTournament->games) ? $selTournament->games = collect($game->getKey()): $selTournament->games->push($game->getKey());
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
                "{$game->teamHome->name} {$game->team_home_score}-{$game->team_away_score} {$game->teamAway->name} ({$game->played_at})",
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
}
