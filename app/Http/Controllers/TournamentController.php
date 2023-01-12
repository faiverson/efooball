<?php

namespace App\Http\Controllers;

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
}
