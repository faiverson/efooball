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

        $query = $this->queryVersusFromTeamStats($args->first_player_id, $args->second_player_id, $args->versions, $args->start_at, $args->end_at, $args->modality);
        $query_total = $this->queryVersusFromTeamTotalStats($args->first_player_id, $args->second_player_id, $args->versions, $args->start_at, $args->end_at, $args->modality);
        $query_single = $this->queryVersusFromSingleStats($args->first_player_id, $args->second_player_id, $args->versions, $args->start_at, $args->end_at, $args->modality);
        $query_total_single = $this->queryVersusFromSingleTotalStats($args->first_player_id, $args->second_player_id, $args->versions, $args->start_at, $args->end_at, $args->modality);

        return response()->json(['data' => [
            'first_player' => Player::find($args->first_player_id),
            'second_player' => Player::find($args->second_player_id),
            'team_stats' => [
                'games' => $query->get(),
                'totals' => $query_total->get()->first(),
            ],
            'single_stats' => [
                'games' => $query_single->get(),
                'totals' => $query_total_single->get()->first(),
            ]

        ]]);
    }

    private function queryTeamStats(array $versions, int $min_amount, string $start_at = null, string $end_at = null, $modality = null): Builder
    {
        $player_table = (new Player())->getTable();
        $team_table = (new Team())->getTable();
        $game_table = (new Game())->getTable();

        $query = DB::table('players');

        $query->select(["$player_table.name"]);
        $query->selectRaw("COUNT(g.id) as total");
        $query->selectRaw("SUM(CASE WHEN (g.team_home_id = t.id AND g.team_home_score > g.team_away_score) THEN 1
                                                  WHEN (g.team_away_id = t.id AND g.team_home_score < g.team_away_score) THEN 1
                                                  ELSE 0 END) as win");
        $query->selectRaw("SUM(CASE WHEN g.team_home_score = g.team_away_score THEN 1 ELSE 0 END) as draw");
        $query->selectRaw("SUM(CASE WHEN (g.team_home_id = t.id AND g.team_home_score < g.team_away_score) THEN 1
                                                  WHEN (g.team_away_id = t.id AND g.team_home_score > g.team_away_score) THEN 1
                                                  ELSE 0 END) as lost");

        $query->selectRaw("CAST(((SUM(CASE WHEN (g.team_home_id = t.id AND g.team_home_score > g.team_away_score) THEN 3
                                                  WHEN (g.team_away_id = t.id AND g.team_home_score < g.team_away_score) THEN 3
                                                  WHEN g.team_home_score = g.team_away_score THEN 1 END) / (COUNT(g.id) * 3.0)) * 100) AS DECIMAL(8,2))
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
        $query->havingRaw('COUNT(g.id) >= ?',  [$min_amount]);
        $query->orderByRaw('average DESC');
        return $query;
    }
    private function querySingleStats(array $versions, int $min_amount, string $start_at = null, string $end_at = null, $modality = null): Builder
    {
        $player_table = (new Player())->getTable();
        $game_table = (new SingleGame())->getTable();

        $query = DB::table('players');

        $query->select(["$player_table.name"]);
        $query->selectRaw("COUNT(g.id) as total");
        $query->selectRaw("SUM(CASE WHEN (g.home_id = players.id AND g.home_score > g.away_score) THEN 1
                                                  WHEN (g.away_id = players.id AND g.home_score < g.away_score) THEN 1
                                                  ELSE 0 END) as win");
        $query->selectRaw("SUM(CASE WHEN g.home_score = g.away_score THEN 1 ELSE 0 END) as draw");
        $query->selectRaw("SUM(CASE WHEN (g.home_id = players.id AND g.home_score < g.away_score) THEN 1
                                                  WHEN (g.away_id = players.id AND g.home_score > g.away_score) THEN 1
                                                  ELSE 0 END) as lost");

        $query->selectRaw("CAST(((SUM(CASE WHEN (g.home_id = players.id AND g.home_score > g.away_score) THEN 3
                                                  WHEN (g.away_id = players.id AND g.home_score < g.away_score) THEN 3
                                                  WHEN g.home_score = g.away_score THEN 1 END) / (COUNT(g.id) * 3.0)) * 100) AS DECIMAL(8,2))
                                                  as average");


        $query->join("$game_table AS g", function (JoinClause $join) {
          $join->on('g.home_id', '=', 'players.id')
            ->orOn('g.away_id', '=', 'players.id');
        });

        $query->whereIn('g.version',  $versions);

        if(!empty($modality)) {
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
        $query->havingRaw('COUNT(g.id) >= ?',  [$min_amount]);
        $query->orderByRaw('average DESC');
        return $query;
    }

    private function queryVersusFromTeamStats(int $first_player_id, int $second_player_id, array $versions, string $start_at = null, string $end_at = null, $modality = null): Builder
    {
        $game_table = (new Game())->getTable();
        $player_team_table = 'players_teams';
        $team_table = (new Team())->getTable();

        $query = DB::table("$game_table as g")
            ->select([
                "g.*",
                "th.name as home_team_name",
                "ta.name as away_team_name"
            ])
            ->join("$team_table as th", "g.team_home_id", "=", "th.id")
            ->join("$team_table as ta", "g.team_away_id", "=", "ta.id");

        // Add version filter at root level
        if(!empty($versions)) {
            $query->whereIn('g.version', $versions);
        }

        // Add date range filter at root level
        if(!empty($start_at) && !empty($end_at)) {
            $query->whereBetween('g.played_at', [$start_at, $end_at]);
        }

        // Add modality filter at root level
        if(!empty($modality)) {
            $query->whereIn('g.type', $modality);
        }

        // Add player-team relationship conditions
        $query->where(function($q) use ($first_player_id, $second_player_id, $player_team_table) {
            $q->where(function($q) use ($first_player_id, $second_player_id, $player_team_table) {
                // First player on home team, second on away team
                $q->whereExists(function($q) use ($player_team_table, $first_player_id) {
                    $q->select(DB::raw(1))
                      ->from("$player_team_table")
                      ->whereRaw("team_id = g.team_home_id")
                      ->where('player_id', $first_player_id);
                })
                ->whereExists(function($q) use ($player_team_table, $second_player_id) {
                    $q->select(DB::raw(1))
                      ->from("$player_team_table")
                      ->whereRaw("team_id = g.team_away_id")
                      ->where('player_id', $second_player_id);
                });
            })
            ->orWhere(function($q) use ($first_player_id, $second_player_id, $player_team_table) {
                // First player on away team, second on home team
                $q->whereExists(function($q) use ($player_team_table, $first_player_id) {
                    $q->select(DB::raw(1))
                      ->from("$player_team_table")
                      ->whereRaw("team_id = g.team_away_id")
                      ->where('player_id', $first_player_id);
                })
                ->whereExists(function($q) use ($player_team_table, $second_player_id) {
                    $q->select(DB::raw(1))
                      ->from("$player_team_table")
                      ->whereRaw("team_id = g.team_home_id")
                      ->where('player_id', $second_player_id);
                });
            });
        });

        $query->orderByDesc('g.id');
        return $query;
    }

    private function queryVersusFromTeamTotalStats(int $first_player_id, int $second_player_id, array $versions, string $start_at = null, string $end_at = null, $modality = null): Builder
    {
        $game_table = (new Game())->getTable();
        $player_team_table = 'players_teams';

        $query = DB::table("$game_table as g")
            ->select([
                DB::raw("COUNT(g.id) as total"),
                DB::raw("SUM(CASE
                    WHEN pt1.team_id = g.team_home_id AND g.team_home_score > g.team_away_score THEN 1
                    WHEN pt1.team_id = g.team_away_id AND g.team_away_score > g.team_home_score THEN 1
                    ELSE 0
                END) as first_player_win"),
                DB::raw("SUM(CASE
                    WHEN g.team_home_score = g.team_away_score THEN 1
                    ELSE 0
                END) as draw"),
                DB::raw("SUM(CASE
                    WHEN pt1.team_id = g.team_home_id AND g.team_home_score < g.team_away_score THEN 1
                    WHEN pt1.team_id = g.team_away_id AND g.team_away_score < g.team_home_score THEN 1
                    ELSE 0
                END) as first_player_lost")
            ]);

        // Add version filter at root level
        if(!empty($versions)) {
            $query->whereIn('g.version', $versions);
        }

        // Add date range filter at root level
        if(!empty($start_at) && !empty($end_at)) {
            $query->whereBetween('g.played_at', [$start_at, $end_at]);
        }

        // Add modality filter at root level
        if(!empty($modality)) {
            $query->whereIn('g.type', $modality);
        }

        // Join with players_teams table for first player
        $query->join("$player_team_table as pt1", function($join) use ($first_player_id) {
            $join->on(function($join) {
                $join->on('pt1.team_id', '=', "g.team_home_id")
                    ->orOn('pt1.team_id', '=', "g.team_away_id");
            })
            ->where('pt1.player_id', '=', $first_player_id);
        });

        // Join with players_teams table for second player
        $query->join("$player_team_table as pt2", function($join) use ($second_player_id) {
            $join->on(function($join) {
                $join->on('pt2.team_id', '=', "g.team_home_id")
                    ->orOn('pt2.team_id', '=', "g.team_away_id");
            })
            ->where('pt2.player_id', '=', $second_player_id);
        });

        // Ensure players are on different teams
        $query->where(function($q) {
            $q->where(function($q) {
                $q->where('pt1.team_id', '=', DB::raw('g.team_home_id'))
                  ->where('pt2.team_id', '=', DB::raw('g.team_away_id'));
            })
            ->orWhere(function($q) {
                $q->where('pt1.team_id', '=', DB::raw('g.team_away_id'))
                  ->where('pt2.team_id', '=', DB::raw('g.team_home_id'));
            });
        });

        return $query;
    }
    private function queryVersusFromSingleStats(int $first_player_id, int $second_player_id, array $versions, string $start_at = null, string $end_at = null, $modality = null): Builder
    {
        $game_table = (new SingleGame())->getTable();

        $query = DB::table("$game_table as g");

        // Find matches where first player is home and second is away, or vice versa
        $query->where(function($q) use ($first_player_id, $second_player_id) {
            $q->where(function($q) use ($first_player_id, $second_player_id) {
                $q->where('g.home_id', $first_player_id)
                  ->where('g.away_id', $second_player_id);
            })->orWhere(function($q) use ($first_player_id, $second_player_id) {
                $q->where('g.home_id', $second_player_id)
                  ->where('g.away_id', $first_player_id);
            });
        });

        if(! empty($versions)) {
            $query->whereIn('g.version', $versions);
        }

        if(!empty($start_at) && !empty($end_at)) {
            $query->whereBetween('g.played_at', [$start_at, $end_at]);
        }

        if(!empty($modality) && is_array($modality)) {
            $query->whereIn('g.type', $modality);
        }
        // $q = vsprintf(str_replace('?', "'%s'", $query->toSql()), $query->getBindings());
        // dd($q);
        return $query;
    }

    private function queryVersusFromSingleTotalStats(int $first_player_id, int $second_player_id, array $versions, string $start_at = null, string $end_at = null, $modality = null): Builder
    {
        $game_table = (new SingleGame())->getTable();

        $query = DB::table("$game_table as g")
            ->select([
                DB::raw("COUNT(g.id) as total"),
                DB::raw("SUM(CASE
                    WHEN (g.home_id = $first_player_id AND g.home_score > g.away_score) OR (g.away_id = $first_player_id AND g.away_score > g.home_score) THEN 1
                    ELSE 0
                END) as first_player_win"),
                DB::raw("SUM(CASE
                    WHEN g.home_score = g.away_score THEN 1
                    ELSE 0
                END) as draw"),
                DB::raw("SUM(CASE
                    WHEN (g.home_id = $first_player_id AND g.home_score < g.away_score) OR (g.away_id = $first_player_id AND g.away_score < g.home_score) THEN 1
                    ELSE 0
                END) as first_player_lost")
            ]);

        // Find matches where first player is home and second is away, or vice versa
        $query->where(function($q) use ($first_player_id, $second_player_id) {
            $q->where(function($q) use ($first_player_id, $second_player_id) {
                $q->where('g.home_id', $first_player_id)
                  ->where('g.away_id', $second_player_id);
            })->orWhere(function($q) use ($first_player_id, $second_player_id) {
                $q->where('g.home_id', $second_player_id)
                  ->where('g.away_id', $first_player_id);
            });
        });

        if(! empty($versions)) {
            $query->whereIn('g.version', $versions);
        }

        if(!empty($start_at) && !empty($end_at)) {
            $query->whereBetween('g.played_at', [$start_at, $end_at]);
        }

        if(!empty($modality) && is_array($modality)) {
            $query->whereIn('g.type', $modality);
        }

        return $query;
    }

}
