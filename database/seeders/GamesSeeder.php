<?php

namespace Database\Seeders;

use App\Models\Game;
use App\Models\Team;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use PulkitJalan\Google\Facades\Google;

class GamesSeeder extends Seeder
{
    const FIRST_ROW = 2;

    const LAST_ROW = 2173;

    public function run()
    {
        $client = Google::getClient();
        $client->setScopes(\Google_Service_Sheets::SPREADSHEETS_READONLY);
        $sheets = new \Google_Service_Sheets($client);
        $spreadsheetId = config('google.client_id');
        $from_row = self::FIRST_ROW;
        $to_row = self::LAST_ROW;
        $range = "martes!B{$from_row}:H{$to_row}";
        $response = $sheets->spreadsheets_values->get($spreadsheetId, $range);
        $rows = $response->getValues();
        $this->createGames($rows);
    }

    protected function createGames($rows)
    {
        $date = now();
        foreach ($rows as $row) {
            $date = empty($row[0]) ? $date : Carbon::createFromFormat('M d, Y', $row[0]);
            $players = explode('/', $row[1]);
            sort($players);
            $home = Team::where('name', "{$players[0]}-{$players[1]}")->first();
            $players = explode('/', $row[4]);
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
                    'team_home_score' => $row[2],
                    'team_away_score'=> $row[3],
                    'version'=> Str::replace(' ', '_', strtolower($row[6])),
                    'result'=> $row[2] >= $row[3] ? ($row[2] > $row[3] ? 'home' : 'draw')  : 'away',
                    'created_at'=> $date->format('Y-m-d H:i:s'),
                    'updated_at'=> $date->format('Y-m-d H:i:s'),
                ]);
            }
            catch (\Exception $e) {
                dd($row, $e);
            }
            $this->command->info("Game created ID: {$game->id} - {$game->teamHome->name} {$game->team_home_score}-{$game->team_away_score} {$game->teamAway->name}");
        }
    }
}
