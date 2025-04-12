<?php

namespace App\Http\Controllers;

use App\Enums\GameVersion;
use App\Enums\TournamentType;
use App\Models\Game;
use App\Models\Player;
use App\Models\SingleGame;
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
        $modality = config('filters.modality');
        $query = $this->queryTeamStats([$current_version], $min_amount, $start_at, $end_at, $modality);
        $query2 = $this->querySingleStats([$current_version], $min_amount, $start_at, $end_at, $modality);

        return Inertia::render('PlayerStats', [
            'data' => [
                'team_stats' => $query->get(),
                'single_stats' => $query2->get(),
            ],
            'current_version' => $current_version,
            'start_at' => $start_at,
            'end_at' => $end_at,
            'min_amount' => $min_amount
        ]);
    }
    public function versus(Request $request)
    {
        $current_version = config('filters.current_version');
        $min_amount = config('filters.min_amount');
        $start_at = config('filters.start_at');
        $end_at = config('filters.end_at');
        $modality = config('filters.modality');

        return Inertia::render('PlayerVersus', [
            'players' => Player::has('matches')->orderBy('name')->get(),
            'current_version' => $current_version,
            'start_at' => $start_at,
            'end_at' => $end_at,
        ]);

    }

    public function api_stats(Request $request)
    {
        $args = (object) [
            'versions' => empty($request->versions) ? GameVersion::getValues() : array_map(fn($item) => GameVersion::getValue($item), explode(',', $request->versions)),
            'start_at' => $request->start_at,
            'end_at' => $request->end_at,
            'min_amount' => $request->min_amount ?? 1,
            'modality' => empty($request->modality) ? TournamentType::getValues() : array_map(fn($item) => TournamentType::getValue($item), explode(',', $request->modality)),
        ];

        $query = $this->queryTeamStats($args->versions, $args->min_amount, $args->start_at, $args->end_at, $args->modality);
        $query2 = $this->querySingleStats($args->versions, $args->min_amount, $args->start_at, $args->end_at, $args->modality);
        return response()->json(['data' => [
                'team_stats' => $query->get(),
                'single_stats' => $query2->get(),
            ]
        ]);
    }

    public function api_versus(Request $request)
    {
        $args = (object) [
            'first_player_id' => $request->first_player_id,
            'second_player_id' => $request->second_player_id,
            'versions' => empty($request->versions) ? GameVersion::getValues() : array_map(fn($item) => GameVersion::getValue($item), explode(',', $request->versions)),
            'start_at' => $request->start_at,
            'end_at' => $request->end_at,
            'modality' => empty($request->modality) ? TournamentType::getValues() : array_map(fn($item) => TournamentType::getValue($item), explode(',', $request->modality)),
        ];

        $query = $this->queryVersusStats($args->first_team_id, $args->second_team_id, $args->versions, $args->start_at, $args->end_at);
        $query_total = $this->queryVersusTotalStats($args->first_team_id, $args->second_team_id, $args->versions, $args->start_at, $args->end_at);
        $totals = $query_total->get();
        return response()->json(['data' => [
            // 'team_stats' => [
            //     'first_player' => Team::find($args->first_player_id),
            // 'second_player' => Team::find($args->second_player_id),
            // 'games' => $query->get(),
            // 'totals' => $totals->first(),
            // ],
            // 'single_stats' => [
            //     'first_player' => Team::find($args->first_player_id),
            //     'second_player' => Team::find($args->second_player_id),
            //     'games' => $query->get(),
            //     'totals' => $totals->first(),
            // ]

        ]]);
    }

    private function queryTeamStats(array $versions, int $min_amount, string $start_at = null, string $end_at = null, $modality = []): Builder
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

        if(count($modality) > 0) {
            $query->whereIn('g.type',  $modality);
        }

        if($start_at && $end_at) {
            $query->whereBetween('g.played_at', [$start_at, $end_at]);
        } elseif(empty($start_at) && $end_at) {
            $query->where('g.played_at', '<=', $end_at);
        } elseif(empty($end_at) && $start_at) {
            $query->where('g.played_at', '>=', $start_at);
        }

        $query->groupBy(["$player_table.name", "$player_table.id"]);
        $query->havingRaw('COUNT(`g`.`id`) >= ?',  [$min_amount]);
        $query->orderByRaw('average DESC');
        return $query;
    }
    private function querySingleStats(array $versions, int $min_amount, string $start_at = null, string $end_at = null, $modality = []): Builder
    {
        $player_table = (new Player())->getTable();
        $game_table = (new SingleGame())->getTable();

        $query = DB::table('players');

        $query->select(["$player_table.name"]);
        $query->selectRaw("COUNT(`g`.`id`) as total");
        $query->selectRaw("SUM(CASE WHEN (`g`.`home_id` = `players`.`id` AND `g`.`home_score` > `g`.`away_score`) THEN 1
                                                  WHEN (`g`.`away_id` = `players`.`id` AND `g`.`home_score` < `g`.`away_score`) THEN 1
                                                  ELSE 0 END) as win");
        $query->selectRaw("SUM(CASE WHEN `g`.`home_score` = `g`.`away_score` THEN 1 ELSE 0 END) as draw");
        $query->selectRaw("SUM(CASE WHEN (`g`.`home_id` = `players`.`id` AND `g`.`home_score` < `g`.`away_score`) THEN 1
                                                  WHEN (`g`.`away_id` = `players`.`id` AND `g`.`home_score` > `g`.`away_score`) THEN 1
                                                  ELSE 0 END) as lost");

        $query->selectRaw("CAST(((SUM(CASE WHEN (`g`.`home_id` = `players`.`id` AND `g`.`home_score` > `g`.`away_score`) THEN 3
                                                  WHEN (`g`.`away_id` = `players`.`id` AND `g`.`home_score` < `g`.`away_score`) THEN 3
                                                  WHEN `g`.`home_score` = `g`.`away_score` THEN 1 END) / (COUNT(`g`.`id`) * 3)) * 100) AS DECIMAL(8,2))
                                                  as average");


        $query->join("$game_table AS g", function (JoinClause $join) {
          $join->on('g.home_id', '=', 'players.id')
            ->orOn('g.away_id', '=', 'players.id');
        });

        $query->whereIn('g.version',  $versions);

        if(count($modality) > 0) {
            $query->whereIn('g.type',  $modality);
        }

        if($start_at && $end_at) {
            $query->whereBetween('g.played_at', [$start_at, $end_at]);
        } elseif(empty($start_at) && $end_at) {
            $query->where('g.played_at', '<=', $end_at);
        } elseif(empty($end_at) && $start_at) {
            $query->where('g.played_at', '>=', $start_at);
        }

        $query->groupBy(["$player_table.name", "$player_table.id"]);
        $query->havingRaw('COUNT(`g`.`id`) >= ?',  [$min_amount]);
        $query->orderByRaw('average DESC');
        return $query;
    }

    private function queryVersusStats(int $first_team_id, int $second_team_id, array $versions, string $start_at = null, string $end_at = null): Builder
    {
        $game_table = (new Game())->getTable();
        $query = DB::table($game_table);
        $query->where(function ($q) use($first_team_id, $second_team_id) {
            $q->where(function ($q) use($first_team_id, $second_team_id) {
                $q->where('team_home_id', $first_team_id)->where('team_away_id', $second_team_id);
            })
            ->orWhere(function ($q) use($first_team_id, $second_team_id) {
                $q->where('team_home_id', $second_team_id)->where('team_away_id', $first_team_id);
            });
        });

        if(! empty($versions)) {
            $query->whereIn('version',  $versions);
        }
        if(!empty($start_at) && !empty($end_at)) {
            $query->whereBetween('played_at', [$start_at, $end_at]);
        }

        $query->orderByDesc('id');
        return $query;
    }

}
