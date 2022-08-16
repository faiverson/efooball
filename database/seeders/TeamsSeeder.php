<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class TeamsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Schema::disableForeignKeyConstraints();
        DB::table('teams')->truncate();
        DB::table('players_teams')->truncate();
        DB::table('players')->truncate();
        Schema::enableForeignKeyConstraints();

        $players = [
            [
                'name' => 'Fabian'
            ],
            [
                'name' => 'Horacio'
            ],
            [
                'name' => 'Guasti'
            ],
            [
                'name' => 'Gabriel'
            ],
            [
                'name' => 'Juan'
            ],
            [
                'name' => 'Negro Juan'
            ],
            [
                'name' => 'Hache'
            ],
            [
                'name' => 'Martin'
            ],
            [
                'name' => 'Luciano'
            ],
            [
                'name' => 'Kaplan'
            ],
            [
                'name' => 'Marcelo'
            ],
            [
                'name' => 'Pedro'
            ],
            [
                'name' => 'Jose Luis'
            ],
            [
                'name' => 'Miguel'
            ]
        ];
        \App\Models\Player::insert($players);
        $players = \App\Models\Player::orderBy('name')->get();
        $rest = \App\Models\Player::where('id', '<>', 1)->orderBy('name')->get();

        $players->map(function($item) use($rest) {
            if($rest->count() > 0) {
                foreach ($rest as $partner) {
                    $team = \App\Models\Team::create(['name' => "{$item->name}-$partner->name"]);
                    $team->players()->sync([$item->id, $partner->id]);
                }
                $rest->shift();
            }
        });
    }
}
