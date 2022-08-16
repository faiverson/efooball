<?php

namespace App\Http\Controllers;

use App\Enums\GameVersion;
use App\Models\Game;
use App\Models\Team;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TeamController extends Controller
{
    public function stats(Request $request)
    {
      $args = (object) [
        'version' => empty($request->version) ? GameVersion::TOTAL : GameVersion::getValue($request->version),
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

      if($args->version != GameVersion::TOTAL) {
          $query->where('g.version', '=', $args->version);
      }

      $query->whereBetween('g.created_at', [$args->start_at, $args->end_at]);

      $query->groupBy(["$team_table.name", "$team_table.id"]);
      $query->havingRaw('COUNT(`g`.`id`) > ?',  [$args->min_amount]);
      $query->orderByRaw('average DESC');

      return response()->json(['data' => $query->get()]);
    }
}
