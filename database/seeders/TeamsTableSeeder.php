<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class TeamsTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('teams')->delete();
        
        \DB::table('teams')->insert(array (
            0 => 
            array (
                'id' => 1,
                'name' => 'Fabian-Gabriel',
            ),
            1 => 
            array (
                'id' => 2,
                'name' => 'Fabian-Guasti',
            ),
            2 => 
            array (
                'id' => 3,
                'name' => 'Fabian-Hache',
            ),
            3 => 
            array (
                'id' => 4,
                'name' => 'Fabian-Horacio',
            ),
            4 => 
            array (
                'id' => 5,
                'name' => 'Fabian-Jose Luis',
            ),
            5 => 
            array (
                'id' => 6,
                'name' => 'Fabian-Juan',
            ),
            6 => 
            array (
                'id' => 7,
                'name' => 'Fabian-Kaplan',
            ),
            7 => 
            array (
                'id' => 8,
                'name' => 'Fabian-Luciano',
            ),
            8 => 
            array (
                'id' => 9,
                'name' => 'Fabian-Marcelo',
            ),
            9 => 
            array (
                'id' => 10,
                'name' => 'Fabian-Martin',
            ),
            10 => 
            array (
                'id' => 11,
                'name' => 'Fabian-Miguel',
            ),
            11 => 
            array (
                'id' => 12,
                'name' => 'Fabian-Negro Juan',
            ),
            12 => 
            array (
                'id' => 13,
                'name' => 'Fabian-Pedro',
            ),
            13 => 
            array (
                'id' => 14,
                'name' => 'Gabriel-Guasti',
            ),
            14 => 
            array (
                'id' => 15,
                'name' => 'Gabriel-Hache',
            ),
            15 => 
            array (
                'id' => 16,
                'name' => 'Gabriel-Horacio',
            ),
            16 => 
            array (
                'id' => 17,
                'name' => 'Gabriel-Jose Luis',
            ),
            17 => 
            array (
                'id' => 18,
                'name' => 'Gabriel-Juan',
            ),
            18 => 
            array (
                'id' => 19,
                'name' => 'Gabriel-Kaplan',
            ),
            19 => 
            array (
                'id' => 20,
                'name' => 'Gabriel-Luciano',
            ),
            20 => 
            array (
                'id' => 21,
                'name' => 'Gabriel-Marcelo',
            ),
            21 => 
            array (
                'id' => 22,
                'name' => 'Gabriel-Martin',
            ),
            22 => 
            array (
                'id' => 23,
                'name' => 'Gabriel-Miguel',
            ),
            23 => 
            array (
                'id' => 24,
                'name' => 'Gabriel-Negro Juan',
            ),
            24 => 
            array (
                'id' => 25,
                'name' => 'Gabriel-Pedro',
            ),
            25 => 
            array (
                'id' => 26,
                'name' => 'Guasti-Hache',
            ),
            26 => 
            array (
                'id' => 27,
                'name' => 'Guasti-Horacio',
            ),
            27 => 
            array (
                'id' => 28,
                'name' => 'Guasti-Jose Luis',
            ),
            28 => 
            array (
                'id' => 29,
                'name' => 'Guasti-Juan',
            ),
            29 => 
            array (
                'id' => 30,
                'name' => 'Guasti-Kaplan',
            ),
            30 => 
            array (
                'id' => 31,
                'name' => 'Guasti-Luciano',
            ),
            31 => 
            array (
                'id' => 32,
                'name' => 'Guasti-Marcelo',
            ),
            32 => 
            array (
                'id' => 33,
                'name' => 'Guasti-Martin',
            ),
            33 => 
            array (
                'id' => 34,
                'name' => 'Guasti-Miguel',
            ),
            34 => 
            array (
                'id' => 35,
                'name' => 'Guasti-Negro Juan',
            ),
            35 => 
            array (
                'id' => 36,
                'name' => 'Guasti-Pedro',
            ),
            36 => 
            array (
                'id' => 37,
                'name' => 'Hache-Horacio',
            ),
            37 => 
            array (
                'id' => 38,
                'name' => 'Hache-Jose Luis',
            ),
            38 => 
            array (
                'id' => 39,
                'name' => 'Hache-Juan',
            ),
            39 => 
            array (
                'id' => 40,
                'name' => 'Hache-Kaplan',
            ),
            40 => 
            array (
                'id' => 41,
                'name' => 'Hache-Luciano',
            ),
            41 => 
            array (
                'id' => 42,
                'name' => 'Hache-Marcelo',
            ),
            42 => 
            array (
                'id' => 43,
                'name' => 'Hache-Martin',
            ),
            43 => 
            array (
                'id' => 44,
                'name' => 'Hache-Miguel',
            ),
            44 => 
            array (
                'id' => 45,
                'name' => 'Hache-Negro Juan',
            ),
            45 => 
            array (
                'id' => 46,
                'name' => 'Hache-Pedro',
            ),
            46 => 
            array (
                'id' => 47,
                'name' => 'Horacio-Jose Luis',
            ),
            47 => 
            array (
                'id' => 48,
                'name' => 'Horacio-Juan',
            ),
            48 => 
            array (
                'id' => 49,
                'name' => 'Horacio-Kaplan',
            ),
            49 => 
            array (
                'id' => 50,
                'name' => 'Horacio-Luciano',
            ),
            50 => 
            array (
                'id' => 51,
                'name' => 'Horacio-Marcelo',
            ),
            51 => 
            array (
                'id' => 52,
                'name' => 'Horacio-Martin',
            ),
            52 => 
            array (
                'id' => 53,
                'name' => 'Horacio-Miguel',
            ),
            53 => 
            array (
                'id' => 54,
                'name' => 'Horacio-Negro Juan',
            ),
            54 => 
            array (
                'id' => 55,
                'name' => 'Horacio-Pedro',
            ),
            55 => 
            array (
                'id' => 56,
                'name' => 'Jose Luis-Juan',
            ),
            56 => 
            array (
                'id' => 57,
                'name' => 'Jose Luis-Kaplan',
            ),
            57 => 
            array (
                'id' => 58,
                'name' => 'Jose Luis-Luciano',
            ),
            58 => 
            array (
                'id' => 59,
                'name' => 'Jose Luis-Marcelo',
            ),
            59 => 
            array (
                'id' => 60,
                'name' => 'Jose Luis-Martin',
            ),
            60 => 
            array (
                'id' => 61,
                'name' => 'Jose Luis-Miguel',
            ),
            61 => 
            array (
                'id' => 62,
                'name' => 'Jose Luis-Negro Juan',
            ),
            62 => 
            array (
                'id' => 63,
                'name' => 'Jose Luis-Pedro',
            ),
            63 => 
            array (
                'id' => 64,
                'name' => 'Juan-Kaplan',
            ),
            64 => 
            array (
                'id' => 65,
                'name' => 'Juan-Luciano',
            ),
            65 => 
            array (
                'id' => 66,
                'name' => 'Juan-Marcelo',
            ),
            66 => 
            array (
                'id' => 67,
                'name' => 'Juan-Martin',
            ),
            67 => 
            array (
                'id' => 68,
                'name' => 'Juan-Miguel',
            ),
            68 => 
            array (
                'id' => 69,
                'name' => 'Juan-Negro Juan',
            ),
            69 => 
            array (
                'id' => 70,
                'name' => 'Juan-Pedro',
            ),
            70 => 
            array (
                'id' => 71,
                'name' => 'Kaplan-Luciano',
            ),
            71 => 
            array (
                'id' => 72,
                'name' => 'Kaplan-Marcelo',
            ),
            72 => 
            array (
                'id' => 73,
                'name' => 'Kaplan-Martin',
            ),
            73 => 
            array (
                'id' => 74,
                'name' => 'Kaplan-Miguel',
            ),
            74 => 
            array (
                'id' => 75,
                'name' => 'Kaplan-Negro Juan',
            ),
            75 => 
            array (
                'id' => 76,
                'name' => 'Kaplan-Pedro',
            ),
            76 => 
            array (
                'id' => 77,
                'name' => 'Luciano-Marcelo',
            ),
            77 => 
            array (
                'id' => 78,
                'name' => 'Luciano-Martin',
            ),
            78 => 
            array (
                'id' => 79,
                'name' => 'Luciano-Miguel',
            ),
            79 => 
            array (
                'id' => 80,
                'name' => 'Luciano-Negro Juan',
            ),
            80 => 
            array (
                'id' => 81,
                'name' => 'Luciano-Pedro',
            ),
            81 => 
            array (
                'id' => 82,
                'name' => 'Marcelo-Martin',
            ),
            82 => 
            array (
                'id' => 83,
                'name' => 'Marcelo-Miguel',
            ),
            83 => 
            array (
                'id' => 84,
                'name' => 'Marcelo-Negro Juan',
            ),
            84 => 
            array (
                'id' => 85,
                'name' => 'Marcelo-Pedro',
            ),
            85 => 
            array (
                'id' => 86,
                'name' => 'Martin-Miguel',
            ),
            86 => 
            array (
                'id' => 87,
                'name' => 'Martin-Negro Juan',
            ),
            87 => 
            array (
                'id' => 88,
                'name' => 'Martin-Pedro',
            ),
            88 => 
            array (
                'id' => 89,
                'name' => 'Miguel-Negro Juan',
            ),
            89 => 
            array (
                'id' => 90,
                'name' => 'Miguel-Pedro',
            ),
            90 => 
            array (
                'id' => 91,
                'name' => 'Negro Juan-Pedro',
            ),
        ));
        
        
    }
}