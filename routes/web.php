<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\TelegramBotController;
use App\Http\Controllers\TournamentController;

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

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

// no anda todavia el webhook, usamos getUpdates instead
Route::match(['get', 'post'], '/webhook/{token}', function () {
    $tg = app('telegram.bot');
    $updates = $tg->getWebhookUpdates();
    return json_encode($updates);
});

Route::get('/telegram', function () {
    $telegram = app('telegram.bot');
    // $response = $telegram->getMe();
    // $response = $telegram->getUpdates();

    //testing a message
    $response = $telegram->sendMessage([
        'chat_id' => env('TELEGRAM_CHAT_ID'),
        'text' => 'Hello world!'
    ]);
    return json_encode($response);
});

Route::get('/create-hook', function () {
    $baseurl = env('APP_URL');
    $token = env('TELEGRAM_TOKEN');
    $telegram = app('telegram.bot');
    $telegram->removeWebhook();
    $response = $telegram->setWebhook(['url' => "https://api.telegram.org/bot${$token}/setWebhook?url=${$baseurl}/webhook/${$token}"]);
    return json_encode($response);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('random-teams', [TeamController::class, 'random_teams'])->name('random-teams');

Route::get('/players-stats', function () {
    return Inertia::render('PlayerStats', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('players-stats');

Route::controller(TournamentController::class)->group(function () {
    Route::get('/tournaments/libertadores', 'libertadores')->name('libertadores');
    Route::get('/tournaments/sudamericana', 'sudamericana')->name('sudamericana');
});

require __DIR__.'/auth.php';
