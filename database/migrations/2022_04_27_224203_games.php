<?php

use App\Enums\GameType;
use App\Enums\GameVersion;
use App\Enums\TournamentType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('games', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('team_home_id');
            $table->unsignedInteger('team_away_id');
            $table->unsignedInteger('team_home_score');
            $table->unsignedInteger('team_away_score');
            $table->enum('result', ['home', 'draw', 'away']);
            $table->enum('version', GameVersion::getValues());
            $table->enum('type', TournamentType::getValues());
            $table->date('played_at');
        });

        Schema::create('single_games', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('home_id');
            $table->unsignedInteger('away_id');
            $table->unsignedInteger('home_score');
            $table->unsignedInteger('away_score');
            $table->string('penalty_score')->nullable();
            $table->enum('result', ['home', 'draw', 'away']);
            $table->enum('version', GameVersion::getValues());
            $table->enum('type', TournamentType::getValues());
            $table->date('played_at');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('single_games');
        Schema::dropIfExists('games');
    }
};
