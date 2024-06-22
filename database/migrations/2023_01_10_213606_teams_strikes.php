<?php

use App\Enums\StrikeType;
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
            $table->unsignedInteger('loosing_strike')->default(0);

            $table->unsignedInteger('strike')->nullable(true);
            $table->enum('strike_type', StrikeType::getValues())->default(StrikeType::INIT);

            $table->json('games')->nullable(true);
            $table->json('winning_strikes_games')->nullable(true);
            $table->json('loosing_strikes_games')->nullable(true);
            $table->date('start_at');
            $table->date('end_at')->nullable(true);
        });

        Schema::create('single_strikes', function (Blueprint $table) {
            $table->increments('id');

            $table->unsignedInteger('player_id');
            $table->foreign('player_id')->references('id')->on('players')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->unsignedInteger('winning_strike')->default(0);
            $table->unsignedInteger('loosing_strike')->default(0);

            $table->unsignedInteger('strike')->nullable(true);
            $table->enum('strike_type', StrikeType::getValues())->default(StrikeType::INIT);

            $table->json('games')->nullable(true);
            $table->json('winning_strikes_games')->nullable(true);
            $table->json('loosing_strikes_games')->nullable(true);
            $table->date('start_at');
            $table->date('end_at')->nullable(true);
        });
    }

    public function down()
    {
        Schema::dropIfExists('single_strikes');
        Schema::dropIfExists('team_strikes');
    }
};
