<?php

namespace Database\Seeders;

use App\Models\Game;
use App\Models\Team;
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
        do {
            $total_games = Game::count();
            $from_row = $total_games + 2; // because should start +1 but the first row is a title, so it is 1 + 1 = 2
            $to_row = $from_row + self::CHUNK - 1;
            $range = "martes!B{$from_row}:H{$to_row}";
            $response = $sheets->spreadsheets_values->get($spreadsheetId, $range);
            $rows = $response->getValues();
            $this->createGames($rows);
        } while(count($rows) === self::CHUNK);
    }

    protected function createGames($rows)
    {
        $date = now();
        foreach ($rows as $row) {
            if(empty($row[1]) && empty($row[4])) {
                return false;
            }
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
            with(new TwoColumnDetail($this->command->getOutput()))->render(
                "{$game->teamHome->name} {$game->team_home_score}-{$game->team_away_score} {$game->teamAway->name}",
                '<fg=green;options=bold>Game ID: ' . $game->id .'</>'
            );
        }
    }
}
