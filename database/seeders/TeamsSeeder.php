<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use App\Models\Player;
use App\Models\Team;

class TeamsSeeder extends Seeder
{
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
        Player::insert($players);
        $players = Player::orderBy('name')->get();
        $rest = Player::where('id', '<>', 1)->orderBy('name')->get();

        $players->map(function($item) use($rest) {
            if($rest->count() > 0) {
                foreach ($rest as $partner) {
                    $team = Team::create(['name' => "{$item->name}-$partner->name"]);
                    $team->players()->sync([$item->id, $partner->id]);
                }
                $rest->shift();
            }
        });
    }
}
