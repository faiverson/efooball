<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $snapshotPath = database_path('snapshots/full_dump.sql');

        if (file_exists($snapshotPath)) {
            $this->command->info('Loading data from SQL snapshot...');
            
            // Truncate tables to avoid duplicate key errors
            // Add other tables here if they are included in the dump
            $this->command->info('Truncating tables...');
            \DB::statement('TRUNCATE TABLE games, single_games, tournaments RESTART IDENTITY CASCADE');

            $url = config('database.connections.pgsql.url');

            // Add ON_ERROR_STOP=1 to fail immediately on error
            if ($url) {
                $command = "psql \"$url\" -v ON_ERROR_STOP=1 -f $snapshotPath 2>&1";
            } else {
                $database = config('database.connections.pgsql.database');
                $username = config('database.connections.pgsql.username');
                $password = config('database.connections.pgsql.password');
                $host = config('database.connections.pgsql.host');
                $port = config('database.connections.pgsql.port');
                
                $command = "PGPASSWORD='$password' psql -h $host -p $port -U $username -d $database -v ON_ERROR_STOP=1 -f $snapshotPath 2>&1";
            }
            
            $returnVar = null;
            $output = [];
            exec($command, $output, $returnVar);
            
            if ($returnVar !== 0) {
                $this->command->error('Failed to load snapshot.');
                $this->command->error(implode("\n", $output));
                throw new \Exception('Database dump import failed: ' . implode("\n", $output));
            } else {
                $this->command->info('Snapshot loaded successfully.');
                // Optional: Log first few lines of output to verify
                // $this->command->info(implode("\n", array_slice($output, 0, 5)));
            }
        } else {
            $this->command->warn('Snapshot not found. Running base seeders only. Run db:snapshot-seeds to generate snapshot.');
            $this->call(TeamsSeeder::class);
            $this->call(GamesSeeder::class);
            $this->call(SingleGamesSeeder::class);
        }
    }
}
