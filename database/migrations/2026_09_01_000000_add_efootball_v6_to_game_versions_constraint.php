<?php

use App\Enums\GameVersion;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $versionsString = "'" . implode("', '", GameVersion::getValues()) . "'";

        DB::statement('ALTER TABLE games DROP CONSTRAINT IF EXISTS games_version_check');
        DB::statement("ALTER TABLE games ADD CONSTRAINT games_version_check CHECK (version::text IN ($versionsString))");

        DB::statement('ALTER TABLE single_games DROP CONSTRAINT IF EXISTS single_games_version_check');
        DB::statement("ALTER TABLE single_games ADD CONSTRAINT single_games_version_check CHECK (version::text IN ($versionsString))");

        DB::statement('ALTER TABLE tournaments DROP CONSTRAINT IF EXISTS tournaments_version_check');
        DB::statement("ALTER TABLE tournaments ADD CONSTRAINT tournaments_version_check CHECK (version::text IN ($versionsString))");
    }

    public function down(): void
    {
        $versions = array_filter(
            GameVersion::getValues(),
            fn (string $version): bool => $version !== GameVersion::EFOOTBALL_v6
        );
        $versionsString = "'" . implode("', '", $versions) . "'";

        DB::statement('ALTER TABLE games DROP CONSTRAINT IF EXISTS games_version_check');
        DB::statement("ALTER TABLE games ADD CONSTRAINT games_version_check CHECK (version::text IN ($versionsString))");

        DB::statement('ALTER TABLE single_games DROP CONSTRAINT IF EXISTS single_games_version_check');
        DB::statement("ALTER TABLE single_games ADD CONSTRAINT single_games_version_check CHECK (version::text IN ($versionsString))");

        DB::statement('ALTER TABLE tournaments DROP CONSTRAINT IF EXISTS tournaments_version_check');
        DB::statement("ALTER TABLE tournaments ADD CONSTRAINT tournaments_version_check CHECK (version::text IN ($versionsString))");
    }
};
