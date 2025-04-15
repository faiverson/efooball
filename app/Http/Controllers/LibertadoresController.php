<?php

namespace App\Http\Controllers;

use App\Models\Tournament;
use App\Enums\TournamentType;
use Inertia\Inertia;
use Illuminate\Http\Request;

class LibertadoresController extends Controller
{
    public function index(Request $request)
    {
        $tournaments = Tournament::where('type', TournamentType::LIBERTADORES)
            ->with(['games' => function ($query) {
                $query->orderBy('id');
            }])
            ->orderBy('played_at', 'desc')
            ->get();

        if ($this->isAPI($request)) {
            return response()->json(['tournaments' => $tournaments]);
        }

        return Inertia::render('Libertadores', [
            'tournaments' => $tournaments,
        ]);
    }
}
