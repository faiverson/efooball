<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        $versions = \App\Enums\GameVersion::getValues();
        $versionsString = "'" . implode("', '", $versions) . "'";

        DB::statement("ALTER TABLE games DROP CONSTRAINT IF EXISTS games_version_check");
        DB::statement("ALTER TABLE games ADD CONSTRAINT games_version_check CHECK (version::text IN ($versionsString))");

        DB::statement("ALTER TABLE single_games DROP CONSTRAINT IF EXISTS single_games_version_check");
        DB::statement("ALTER TABLE single_games ADD CONSTRAINT single_games_version_check CHECK (version::text IN ($versionsString))");
    }

    public function down()
    {
        // We can't easily revert to the "old" list without hardcoding it, 
        // but dropping the constraint is safe enough or we could just leave it.
        // For strict correctness, we'd restore the old list, but let's just keep the new one 
        // as it's a superset.
    }
};
