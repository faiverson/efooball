<?php

namespace App\Http\Controllers;

use App\Enums\GameVersion;
use App\Models\Game;
use App\Models\Player;
use App\Models\Team;
use Illuminate\Database\Query\Builder;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PlayerController extends Controller
{
    public function stats(Request $request)
    {
        $current_version = config('filters.current_version');
        $min_amount = config('filters.min_amount');
        $start_at = config('filters.start_at');
        $end_at = config('filters.end_at');
        $query = $this->queryTeamStats([$current_version], $min_amount, $start_at, $end_at);

        return Inertia::render('PlayerStats', [
            'data' => $query->get(),
            'current_version' => $current_version,
            'start_at' => $start_at,
            'end_at' => $end_at,
            'min_amount' => $min_amount
        ]);
    }

    public function api_stats(Request $request)
    {
        $args = (object) [
            'versions' => empty($request->versions) ? GameVersion::getValues() : array_map(fn($item) => GameVersion::getValue($item), explode(',', $request->versions)),
            'start_at' => $request->start_at,
            'end_at' => $request->end_at,
            'min_amount' => $request->min_amount ?? 1
        ];

        $query = $this->queryTeamStats($args->versions, $args->min_amount, $args->start_at, $args->end_at);
        return response()->json(['data' => $query->get()]);
    }

    private function queryTeamStats(array $versions, int $min_amount, string $start_at = null, string $end_at = null): Builder
    {
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

        $query->whereIn('g.version',  $versions);
        if($start_at && $end_at) {
            $query->whereBetween('g.played_at', [$start_at, $end_at]);
        } elseif(empty($start_at) && $end_at) {
            $query->where('g.played_at', '<=', $end_at);
        } elseif(empty($end_at) && $start_at) {
            $query->where('g.played_at', '>=', $start_at);
        }

        $query->groupBy(["$player_table.name", "$player_table.id"]);
        $query->havingRaw('COUNT(`g`.`id`) > ?',  [$min_amount]);
        $query->orderByRaw('average DESC');
        return $query;
    }

}
