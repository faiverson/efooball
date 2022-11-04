<?php

namespace App\Http\Controllers;

use App\Enums\GameVersion;
use App\Models\Game;
use App\Models\Player;
use App\Models\Team;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PlayerController extends Controller
{
    public function stats(Request $request)
    {
      $args = (object) [
        'versions' => empty($request->versions) ? GameVersion::getValues() : array_map(fn($item) => GameVersion::getValue($item), explode(',', $request->versions)),
        'start_at' => $request->start_at ?? '2018-03-27',
        'end_at' => $request->end_at ?? now()->toDateString(),
        'min_amount' => $request->min_amount ?? 10
      ];

      $player_table = (new Player())->getTable();
      $team_table = (new Team())->getTable();
      $game_table = (new Game())->getTable();

      $query = DB::table('players');

      $query->select(["$player_table.name"]);
      $query->selectRaw("COUNT(`g`.`id`) as total");
      $query->selectRaw("SUM(CASE WHEN (`g`.`team_home_id` = `t`.`id` AND `g`.`team_home_score` > `g`.`team_away_score`) THEN 1
	                                          WHEN (`g`.`team_away_id` = `t`.`id` AND `g`.`team_home_score` < `g`.`team_away_score`) THEN 1
                                            ELSE 0 END) as win");
      $query->selectRaw("SUM(CASE WHEN `g`.`team_home_score` = `g`.`team_away_score` THEN 1 ELSE 0 END) as draw");
      $query->selectRaw("SUM(CASE WHEN (`g`.`team_home_id` = `t`.`id` AND `g`.`team_home_score` < `g`.`team_away_score`) THEN 1
	                                          WHEN (`g`.`team_away_id` = `t`.`id` AND `g`.`team_home_score` > `g`.`team_away_score`) THEN 1
	                                          ELSE 0 END) as lost");

      $query->selectRaw("CAST(((SUM(CASE WHEN (`g`.`team_home_id` = `t`.`id` AND `g`.`team_home_score` > `g`.`team_away_score`) THEN 3
	                                          WHEN (`g`.`team_away_id` = `t`.`id` AND `g`.`team_home_score` < `g`.`team_away_score`) THEN 3
	                                          WHEN `g`.`team_home_score` = `g`.`team_away_score` THEN 1 END) / (COUNT(`g`.`id`) * 3)) * 100) AS DECIMAL(8,2))
	                                          as average");

      $query->join("players_teams AS pt", function (JoinClause $join) use ($player_table) {
        $join->on('pt.player_id', '=', "$player_table.id");
      });

      $query->join("$team_table AS t", function (JoinClause $join) {
        $join->on('pt.team_id', '=', 't.id');
      });

      $query->join("$game_table AS g", function (JoinClause $join) {
        $join->on('g.team_home_id', '=', 't.id')
             ->orOn('g.team_away_id', '=', 't.id');
      });

      $query->whereIn('g.version',  $args->versions);
      $query->whereBetween('g.created_at', [$args->start_at, $args->end_at]);

      $query->groupBy(["$player_table.name", "$player_table.id"]);
      $query->havingRaw('COUNT(`g`.`id`) > ?',  [$args->min_amount]);
      $query->orderByRaw('average DESC');

      return response()->json(['data' => $query->get()]);
    }
}
