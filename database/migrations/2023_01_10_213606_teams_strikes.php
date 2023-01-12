<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('team_strikes', function (Blueprint $table) {
            $table->increments('id');

            $table->unsignedInteger('team_id');
            $table->foreign('team_id')->references('id')->on('teams')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->unsignedInteger('winning_strike')->default(0);
            $table->unsignedInteger('undefeated_strike')->default(0);
            $table->unsignedInteger('loosing_strike')->default(0);
            $table->unsignedInteger('defeated_strike')->default(0);
            $table->unsignedInteger('last_game_id')->default(0);
            $table->foreign('last_game_id')->references('id')->on('games')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->unsignedInteger('current_strike');
            $table->enum('last_game', ['win', 'win_draw', 'last_draw', 'lost']);

            $table->json('current_games')->nullable(true);
            $table->json('winning_strikes_games')->nullable(true);
            $table->json('undefeated_strikes_games')->nullable(true);
            $table->json('loosing_strikes_games')->nullable(true);
            $table->json('defeated_strikes_games')->nullable(true);
        });
    }

    public function down()
    {
        Schema::dropIfExists('team_strikes');
    }
};
