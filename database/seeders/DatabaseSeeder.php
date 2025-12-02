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
            // DB::unprepared(file_get_contents($snapshotPath)); 
            // DB::unprepared might fail with large files or specific pg_dump output (like COPY).
            // Better to use psql command line for reliability with pg_dump output.
            
            $url = config('database.connections.pgsql.url');

            if ($url) {
                $command = "psql \"$url\" -f $snapshotPath";
            } else {
                $database = config('database.connections.pgsql.database');
                $username = config('database.connections.pgsql.username');
                $password = config('database.connections.pgsql.password');
                $host = config('database.connections.pgsql.host');
                $port = config('database.connections.pgsql.port');
                
                $command = "PGPASSWORD='$password' psql -h $host -p $port -U $username -d $database -f $snapshotPath";
            }
            
            $returnVar = null;
            $output = [];
            exec($command, $output, $returnVar);
            
            if ($returnVar !== 0) {
                $this->command->error('Failed to load snapshot.');
                $this->command->error(implode("\n", $output));
            } else {
                $this->command->info('Snapshot loaded successfully.');
            }
        } else {
            $this->command->warn('Snapshot not found. Running base seeders only. Run db:snapshot-seeds to generate snapshot.');
            $this->call(TeamsSeeder::class);
            $this->call(GamesSeeder::class);
            $this->call(SingleGamesSeeder::class);
        }
    }
}
