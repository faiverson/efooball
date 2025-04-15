<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TournamentController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PlayerController;
use App\Http\Controllers\LibertadoresController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', HomeController::class . '@homepage')->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::controller(TeamController::class)->group(function () {
    Route::get('random-teams', 'random_teams')->name('random-teams');
    Route::get('team-stats', 'stats')->name('team-stats');
    Route::get('team-versus', 'versus')->name('team-versus');
});

Route::controller(PlayerController::class)->group(function () {
    Route::get('players-stats', 'stats')->name('players-stats');
    Route::get('players-versus', 'versus')->name('players-versus');
});

Route::controller(TournamentController::class)->group(function () {
    Route::get('/tournaments/libertadores', 'libertadores')->name('libertadores');
    Route::get('/tournaments/sudamericana', 'sudamericana')->name('sudamericana');
    Route::get('/tournaments/individual', 'torneo')->name('torneo');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
