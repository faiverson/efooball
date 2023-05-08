<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Application;
use App\Models\Game;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

class HomeController extends Controller
{
    public function homepage(Request $request)
    {
      $query = Game::latestGames()->limit(20);
      return Inertia::render('Home', [
          'games' => $query->get(),
          'canLogin' => Route::has('login'),
          'canRegister' => Route::has('register'),
          'laravelVersion' => Application::VERSION,
          'phpVersion' => PHP_VERSION
      ]);
    }
}
