<?php

namespace App\Http\Controllers;

use App\Enums\GameVersion;
use App\Models\Game;
use App\Models\Team;
use App\Models\Player;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Artisan;

class TeamController extends Controller
{
    public function stats(Request $request)
    {
      $args = (object) [
        'versions' => empty($request->versions) ? GameVersion::getValues() : array_map(fn($item) => GameVersion::getValue($item), explode(',', $request->versions)),
        'start_at' => $request->start_at ?? '2018-03-27',
        'end_at' => $request->end_at ?? now()->toDateString(),
        'min_amount' => $request->min_amount ?? 10
      ];

      $team_table = (new Team())->getTable();
      $game_table = (new Game())->getTable();

      $query = DB::table('teams');

      $query->select([
        "$team_table.name",
      ]);
      $query->selectRaw("COUNT(`g`.`id`) as total");
      $query->selectRaw("SUM(CASE WHEN (`g`.`team_home_id` = `teams`.`id` AND `g`.`team_home_score` > `g`.`team_away_score`) THEN 1
	                                          WHEN (`g`.`team_away_id` = `teams`.`id` AND `g`.`team_home_score` < `g`.`team_away_score`) THEN 1
                                            ELSE 0 END) as win");
      $query->selectRaw("SUM(CASE WHEN `g`.`team_home_score` = `g`.`team_away_score` THEN 1 ELSE 0 END) as draw");
      $query->selectRaw("SUM(CASE WHEN (`g`.`team_home_id` = `teams`.`id` AND `g`.`team_home_score` < `g`.`team_away_score`) THEN 1
	                                          WHEN (`g`.`team_away_id` = `teams`.`id` AND `g`.`team_home_score` > `g`.`team_away_score`) THEN 1
	                                          ELSE 0 END) as lost");

      $query->selectRaw("CAST(((SUM(CASE WHEN (`g`.`team_home_id` = `teams`.`id` AND `g`.`team_home_score` > `g`.`team_away_score`) THEN 3
	                                          WHEN (`g`.`team_away_id` = `teams`.`id` AND `g`.`team_home_score` < `g`.`team_away_score`) THEN 3
	                                          WHEN `g`.`team_home_score` = `g`.`team_away_score` THEN 1 END) / (COUNT(`g`.`id`) * 3)) * 100) AS DECIMAL(8,2))
	                                          as average");

      $query->join("$game_table AS g", function (JoinClause $join) use ($team_table, $args) {
        $join->on('g.team_home_id', '=', "$team_table.id")
             ->orOn('g.team_away_id', '=', "$team_table.id");
      });

      $query->whereIn('g.version',  $args->versions);
      $query->whereBetween('g.created_at', [$args->start_at, $args->end_at]);

      $query->groupBy(["$team_table.name", "$team_table.id"]);
      $query->havingRaw('COUNT(`g`.`id`) >= ?',  [$args->min_amount]);
      $query->orderByRaw('average DESC');

      return response()->json(['data' => $query->get()]);
    }

    public function random_teams(Request $request)
    {
        return Inertia::render('RandomTeams', ['players' => Player::all()]);
    }

    public function random(Request $request)
    {
        $strong = Player::whereIn('id', $request->head)->get() ?? collect();
        $weak = Player::whereIn('id', $request->tail)->get() ?? collect();
        if($strong->count() > $weak->count()) {
            $this->balance($strong, $weak);
        } elseif($weak->count() > $strong->count()) {
            $this->balance($weak, $strong);
        }

        $total = $strong->count() + $weak->count();
        $strong = $strong->shuffle();
        $weak = $weak->shuffle();
        $teams = [];
        for($i = 0; $i < ($total / 2); $i++) {
            $playerStrong = $strong[$i];
            $playerWeak = $weak[$i];

            $teams[] = Team::whereHas('players', function($q) use($playerStrong) {
                $q->where('players.id', $playerStrong->id);
            })->whereHas('players', function($q) use($playerWeak) {
                $q->where('players.id', $playerWeak->id);
            })->first();
        }

        $response = [
            'modality' => $strong->merge($weak)->shuffle()->first(),
            'teams' => $teams,
        ];

        $message = $this->parseMessage($response);

//        Artisan::call('tg:send', [
//            'message' => $message
//        ]);

        return response()->json(['data' => $response]);
    }

    public function strikes(Request $request)
    {
        return 'not build';
    }

    private function parseMessage(array $response): string
    {
        $player = $response['modality'];
        $teams = '';
        foreach($response['teams'] as $team) {
            $teams .= "\n{$team->name}";
        }
        return "El que elige la modalidad es: {$player->name}\n\nLos equipos son: $teams";
    }

    private function balance(&$bigger, &$lower)
    {
        $half = ($bigger->count() + $lower->count()) / 2;
        while($bigger->count() > $half) {
            $item = $bigger->shift();
            $lower->push($item);
        }
    }

    private function whatsapp($response)
    {
        $teams = collect(Arr::get($response, 'teams'));
        $player = Arr::get($response, 'modality');
        $team_txt = implode("\n", $teams->pluck('name')->all());
        $url = "https://messages-sandbox.nexmo.com/v0.1/messages";
        $text = "*Modalidad:* $player->name\n*Equipos:*\n$team_txt";

        $phones = [
            '5493516223135', // fabian
            '5493513811489', // juan
            '5493516371891', // gabi
            '5493516852080', // tincho
            '5493516806389', // horacio
//            '5493512353460',
//            '5493516142986',
            '5493512001308', // luciano
        ];

        foreach ($phones as $phone) {
            $params = [
                "from" => ["type" => "whatsapp", "number" => "14157386170"],
                "to" => ["type" => "whatsapp", "number" => $phone],
                "message" => [
                    "content" => [
                        "type" => "text",
                        "text" => $text
                    ]
                ]
            ];
            $headers = [
                "Authorization" => "Basic " . base64_encode(env('NEXMO_API_KEY') . ":" . env('NEXMO_API_SECRET')),
                "Content-Type" => "application/json",
                "Accept" => "application/json",
            ];

            $client = new \GuzzleHttp\Client();
            $response = $client->request('POST', $url, ["headers" => $headers, "json" => $params]);
            $data[]  = $response->getBody()->getContents();
        }
    }
}
