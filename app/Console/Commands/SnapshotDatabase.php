<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class SnapshotDatabase extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'db:snapshot-seeds';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Wipe database, seed from Google Sheets, and create a SQL snapshot';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        if (app()->environment('production')) {
            $this->error('This command cannot be run in production!');
            return Command::FAILURE;
        }

        $this->info('1. Wiping database...');
        $this->call('migrate:fresh');

        $this->info('2. Running base seeders...');
        // User specified only TeamsSeeder, GamesSeeder, SingleGamesSeeder.
        // TeamsSeeder handles players truncation and insertion.
        $this->call('db:seed', ['--class' => 'TeamsSeeder']);

        $this->info('3. Seeding from Google Sheets (this may take a while)...');
        
        $this->call('db:seed', ['--class' => 'GamesSeeder']);
        $this->call('db:seed', ['--class' => 'SingleGamesSeeder']);

        $this->info('4. Creating SQL snapshot...');
        
        $snapshotPath = database_path('snapshots/full_dump.sql');
        $snapshotDir = dirname($snapshotPath);
        
        if (!File::exists($snapshotDir)) {
            File::makeDirectory($snapshotDir, 0755, true);
        }

        $database = config('database.connections.pgsql.database');
        $username = config('database.connections.pgsql.username');
        $password = config('database.connections.pgsql.password');
        $host = config('database.connections.pgsql.host');
        $port = config('database.connections.pgsql.port');

        // Tables to export
        $tables = [
            'users',
            'players',
            'teams',
            'players_teams',
            'games',
            'single_games',
            'tournaments',
            // Add other tables if needed, e.g., migrations table if we want to skip migration? 
            // Usually for seeding we just want data.
        ];

        $tableArgs = '';
        foreach ($tables as $table) {
            $tableArgs .= " -t $table";
        }

        // Use PGPASSWORD env var to avoid password prompt
        $command = "PGPASSWORD='$password' pg_dump -h $host -p $port -U $username -d $database --data-only --inserts $tableArgs > $snapshotPath";

        // If running inside Docker (Sail), we might need to adjust host/user if this command is run from OUTSIDE.
        // But this command is a Laravel command, so it runs INSIDE the container (or via sail artisan).
        // If run via `sail artisan`, it runs inside the container.
        // Inside the container, 'pgsql' host resolves to the postgres container.
        
        $returnVar = null;
        $output = [];
        exec($command, $output, $returnVar);

        if ($returnVar !== 0) {
            $this->error('Failed to create snapshot.');
            $this->error(implode("\n", $output));
            return Command::FAILURE;
        }

        $this->info("Snapshot created at: $snapshotPath");

        return Command::SUCCESS;
    }
}
