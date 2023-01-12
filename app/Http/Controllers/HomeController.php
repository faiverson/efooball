<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Application;
use App\Enums\GameVersion;
use App\Models\Game;
use App\Models\Team;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

class HomeController extends Controller
{
    public function homepage(Request $request)
    {
        $args = (object) [
            'versions' => GameVersion::getValues(),
            'start_at' => $request->start_at ?? '2018-03-27',
            'end_at' => $request->end_at ?? now()->toDateString(),
            'min_amount' => 5
        ];

        $team_table = (new Team())->getTable();
        $game_table = (new Game())->getTable();

        $query = DB::table('teams');

        $query->select(["$team_table.name"]);
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
        $query->havingRaw('COUNT(`g`.`id`) > ?',  [$args->min_amount]);
        $query->orderByRaw('average DESC');


        return Inertia::render('Home', [
            'stats' => $query->get(),
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,$query->get()
        ]);
    }
}
