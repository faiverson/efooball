<?php

namespace App\Http\Controllers;

use App\Models\SingleGame;
use Illuminate\Http\Request;
use App\Models\Tournament;
use Inertia\Inertia;

class TournamentController extends Controller
{
    public function libertadores()
    {
        return Inertia::render('Libertadores', ['tournaments' => Tournament::libertadores()->orderByDesc('id')->get()]);
    }
    public function sudamericana()
    {
        return Inertia::render('Sudamericana', ['tournaments' => Tournament::sudamericana()->orderByDesc('id')->get()]);
    }
    public function torneo()
    {
        $tournaments = Tournament::torneo()
            ->orderByDesc('id')
            ->get()
            ->map(function ($tournament) {
                if (empty($tournament->games)) {
                    return collect();
                }

                $gameIds = is_string($tournament->games) ? json_decode($tournament->games, true) : $tournament->games;
                $tournament->games = SingleGame::whereIn('id', $gameIds)->get();

                // Calculate total teams from the games
                $teamIds = $tournament->games->flatMap(function ($game) {
                    return [$game->home_id, $game->away_id];
                })->unique()->values();

                $tournament->total_teams = $teamIds->count();

                return $tournament;
            });

        return Inertia::render('IndividualTournament', [
            'tournaments' => $tournaments
        ]);
    }
    public function copa()
    {
        return Inertia::render('Copa', ['tournaments' => Tournament::copa()->orderByDesc('id')->get()]);
    }
}
