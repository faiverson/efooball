<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PlayerController;
use App\Http\Controllers\TeamController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::get('/', fn() => response()->json(['Laravel' => app()->version(), 'PHP' => PHP_VERSION,]));

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(PlayerController::class)->group(function () {
    Route::get('/player_stats', 'api_stats');
    Route::post('/player_versus', 'api_versus');
});

Route::controller(TeamController::class)->group(function () {
    Route::get('/team_stats', 'api_stats');
    Route::post('/team_versus', 'api_versus');
    Route::post('/random', 'api_random');
    Route::post('/strikes', 'api_strikes');
});
