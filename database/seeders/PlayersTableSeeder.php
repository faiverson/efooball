<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class PlayersTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('players')->delete();
        
        \DB::table('players')->insert(array (
            0 => 
            array (
                'id' => 1,
                'name' => 'Fabian',
            ),
            1 => 
            array (
                'id' => 2,
                'name' => 'Horacio',
            ),
            2 => 
            array (
                'id' => 3,
                'name' => 'Guasti',
            ),
            3 => 
            array (
                'id' => 4,
                'name' => 'Gabriel',
            ),
            4 => 
            array (
                'id' => 5,
                'name' => 'Juan',
            ),
            5 => 
            array (
                'id' => 6,
                'name' => 'Negro Juan',
            ),
            6 => 
            array (
                'id' => 7,
                'name' => 'Hache',
            ),
            7 => 
            array (
                'id' => 8,
                'name' => 'Martin',
            ),
            8 => 
            array (
                'id' => 9,
                'name' => 'Luciano',
            ),
            9 => 
            array (
                'id' => 10,
                'name' => 'Kaplan',
            ),
            10 => 
            array (
                'id' => 11,
                'name' => 'Marcelo',
            ),
            11 => 
            array (
                'id' => 12,
                'name' => 'Pedro',
            ),
            12 => 
            array (
                'id' => 13,
                'name' => 'Jose Luis',
            ),
            13 => 
            array (
                'id' => 14,
                'name' => 'Miguel',
            ),
        ));
        
        
    }
}