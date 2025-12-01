<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class PlayersTeamsTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('players_teams')->delete();
        
        \DB::table('players_teams')->insert(array (
            0 => 
            array (
                'id' => 1,
                'team_id' => 1,
                'player_id' => 1,
            ),
            1 => 
            array (
                'id' => 2,
                'team_id' => 1,
                'player_id' => 4,
            ),
            2 => 
            array (
                'id' => 3,
                'team_id' => 2,
                'player_id' => 1,
            ),
            3 => 
            array (
                'id' => 4,
                'team_id' => 2,
                'player_id' => 3,
            ),
            4 => 
            array (
                'id' => 5,
                'team_id' => 3,
                'player_id' => 1,
            ),
            5 => 
            array (
                'id' => 6,
                'team_id' => 3,
                'player_id' => 7,
            ),
            6 => 
            array (
                'id' => 7,
                'team_id' => 4,
                'player_id' => 1,
            ),
            7 => 
            array (
                'id' => 8,
                'team_id' => 4,
                'player_id' => 2,
            ),
            8 => 
            array (
                'id' => 9,
                'team_id' => 5,
                'player_id' => 1,
            ),
            9 => 
            array (
                'id' => 10,
                'team_id' => 5,
                'player_id' => 13,
            ),
            10 => 
            array (
                'id' => 11,
                'team_id' => 6,
                'player_id' => 1,
            ),
            11 => 
            array (
                'id' => 12,
                'team_id' => 6,
                'player_id' => 5,
            ),
            12 => 
            array (
                'id' => 13,
                'team_id' => 7,
                'player_id' => 1,
            ),
            13 => 
            array (
                'id' => 14,
                'team_id' => 7,
                'player_id' => 10,
            ),
            14 => 
            array (
                'id' => 15,
                'team_id' => 8,
                'player_id' => 1,
            ),
            15 => 
            array (
                'id' => 16,
                'team_id' => 8,
                'player_id' => 9,
            ),
            16 => 
            array (
                'id' => 17,
                'team_id' => 9,
                'player_id' => 1,
            ),
            17 => 
            array (
                'id' => 18,
                'team_id' => 9,
                'player_id' => 11,
            ),
            18 => 
            array (
                'id' => 19,
                'team_id' => 10,
                'player_id' => 1,
            ),
            19 => 
            array (
                'id' => 20,
                'team_id' => 10,
                'player_id' => 8,
            ),
            20 => 
            array (
                'id' => 21,
                'team_id' => 11,
                'player_id' => 1,
            ),
            21 => 
            array (
                'id' => 22,
                'team_id' => 11,
                'player_id' => 14,
            ),
            22 => 
            array (
                'id' => 23,
                'team_id' => 12,
                'player_id' => 1,
            ),
            23 => 
            array (
                'id' => 24,
                'team_id' => 12,
                'player_id' => 6,
            ),
            24 => 
            array (
                'id' => 25,
                'team_id' => 13,
                'player_id' => 1,
            ),
            25 => 
            array (
                'id' => 26,
                'team_id' => 13,
                'player_id' => 12,
            ),
            26 => 
            array (
                'id' => 27,
                'team_id' => 14,
                'player_id' => 4,
            ),
            27 => 
            array (
                'id' => 28,
                'team_id' => 14,
                'player_id' => 3,
            ),
            28 => 
            array (
                'id' => 29,
                'team_id' => 15,
                'player_id' => 4,
            ),
            29 => 
            array (
                'id' => 30,
                'team_id' => 15,
                'player_id' => 7,
            ),
            30 => 
            array (
                'id' => 31,
                'team_id' => 16,
                'player_id' => 4,
            ),
            31 => 
            array (
                'id' => 32,
                'team_id' => 16,
                'player_id' => 2,
            ),
            32 => 
            array (
                'id' => 33,
                'team_id' => 17,
                'player_id' => 4,
            ),
            33 => 
            array (
                'id' => 34,
                'team_id' => 17,
                'player_id' => 13,
            ),
            34 => 
            array (
                'id' => 35,
                'team_id' => 18,
                'player_id' => 4,
            ),
            35 => 
            array (
                'id' => 36,
                'team_id' => 18,
                'player_id' => 5,
            ),
            36 => 
            array (
                'id' => 37,
                'team_id' => 19,
                'player_id' => 4,
            ),
            37 => 
            array (
                'id' => 38,
                'team_id' => 19,
                'player_id' => 10,
            ),
            38 => 
            array (
                'id' => 39,
                'team_id' => 20,
                'player_id' => 4,
            ),
            39 => 
            array (
                'id' => 40,
                'team_id' => 20,
                'player_id' => 9,
            ),
            40 => 
            array (
                'id' => 41,
                'team_id' => 21,
                'player_id' => 4,
            ),
            41 => 
            array (
                'id' => 42,
                'team_id' => 21,
                'player_id' => 11,
            ),
            42 => 
            array (
                'id' => 43,
                'team_id' => 22,
                'player_id' => 4,
            ),
            43 => 
            array (
                'id' => 44,
                'team_id' => 22,
                'player_id' => 8,
            ),
            44 => 
            array (
                'id' => 45,
                'team_id' => 23,
                'player_id' => 4,
            ),
            45 => 
            array (
                'id' => 46,
                'team_id' => 23,
                'player_id' => 14,
            ),
            46 => 
            array (
                'id' => 47,
                'team_id' => 24,
                'player_id' => 4,
            ),
            47 => 
            array (
                'id' => 48,
                'team_id' => 24,
                'player_id' => 6,
            ),
            48 => 
            array (
                'id' => 49,
                'team_id' => 25,
                'player_id' => 4,
            ),
            49 => 
            array (
                'id' => 50,
                'team_id' => 25,
                'player_id' => 12,
            ),
            50 => 
            array (
                'id' => 51,
                'team_id' => 26,
                'player_id' => 3,
            ),
            51 => 
            array (
                'id' => 52,
                'team_id' => 26,
                'player_id' => 7,
            ),
            52 => 
            array (
                'id' => 53,
                'team_id' => 27,
                'player_id' => 3,
            ),
            53 => 
            array (
                'id' => 54,
                'team_id' => 27,
                'player_id' => 2,
            ),
            54 => 
            array (
                'id' => 55,
                'team_id' => 28,
                'player_id' => 3,
            ),
            55 => 
            array (
                'id' => 56,
                'team_id' => 28,
                'player_id' => 13,
            ),
            56 => 
            array (
                'id' => 57,
                'team_id' => 29,
                'player_id' => 3,
            ),
            57 => 
            array (
                'id' => 58,
                'team_id' => 29,
                'player_id' => 5,
            ),
            58 => 
            array (
                'id' => 59,
                'team_id' => 30,
                'player_id' => 3,
            ),
            59 => 
            array (
                'id' => 60,
                'team_id' => 30,
                'player_id' => 10,
            ),
            60 => 
            array (
                'id' => 61,
                'team_id' => 31,
                'player_id' => 3,
            ),
            61 => 
            array (
                'id' => 62,
                'team_id' => 31,
                'player_id' => 9,
            ),
            62 => 
            array (
                'id' => 63,
                'team_id' => 32,
                'player_id' => 3,
            ),
            63 => 
            array (
                'id' => 64,
                'team_id' => 32,
                'player_id' => 11,
            ),
            64 => 
            array (
                'id' => 65,
                'team_id' => 33,
                'player_id' => 3,
            ),
            65 => 
            array (
                'id' => 66,
                'team_id' => 33,
                'player_id' => 8,
            ),
            66 => 
            array (
                'id' => 67,
                'team_id' => 34,
                'player_id' => 3,
            ),
            67 => 
            array (
                'id' => 68,
                'team_id' => 34,
                'player_id' => 14,
            ),
            68 => 
            array (
                'id' => 69,
                'team_id' => 35,
                'player_id' => 3,
            ),
            69 => 
            array (
                'id' => 70,
                'team_id' => 35,
                'player_id' => 6,
            ),
            70 => 
            array (
                'id' => 71,
                'team_id' => 36,
                'player_id' => 3,
            ),
            71 => 
            array (
                'id' => 72,
                'team_id' => 36,
                'player_id' => 12,
            ),
            72 => 
            array (
                'id' => 73,
                'team_id' => 37,
                'player_id' => 7,
            ),
            73 => 
            array (
                'id' => 74,
                'team_id' => 37,
                'player_id' => 2,
            ),
            74 => 
            array (
                'id' => 75,
                'team_id' => 38,
                'player_id' => 7,
            ),
            75 => 
            array (
                'id' => 76,
                'team_id' => 38,
                'player_id' => 13,
            ),
            76 => 
            array (
                'id' => 77,
                'team_id' => 39,
                'player_id' => 7,
            ),
            77 => 
            array (
                'id' => 78,
                'team_id' => 39,
                'player_id' => 5,
            ),
            78 => 
            array (
                'id' => 79,
                'team_id' => 40,
                'player_id' => 7,
            ),
            79 => 
            array (
                'id' => 80,
                'team_id' => 40,
                'player_id' => 10,
            ),
            80 => 
            array (
                'id' => 81,
                'team_id' => 41,
                'player_id' => 7,
            ),
            81 => 
            array (
                'id' => 82,
                'team_id' => 41,
                'player_id' => 9,
            ),
            82 => 
            array (
                'id' => 83,
                'team_id' => 42,
                'player_id' => 7,
            ),
            83 => 
            array (
                'id' => 84,
                'team_id' => 42,
                'player_id' => 11,
            ),
            84 => 
            array (
                'id' => 85,
                'team_id' => 43,
                'player_id' => 7,
            ),
            85 => 
            array (
                'id' => 86,
                'team_id' => 43,
                'player_id' => 8,
            ),
            86 => 
            array (
                'id' => 87,
                'team_id' => 44,
                'player_id' => 7,
            ),
            87 => 
            array (
                'id' => 88,
                'team_id' => 44,
                'player_id' => 14,
            ),
            88 => 
            array (
                'id' => 89,
                'team_id' => 45,
                'player_id' => 7,
            ),
            89 => 
            array (
                'id' => 90,
                'team_id' => 45,
                'player_id' => 6,
            ),
            90 => 
            array (
                'id' => 91,
                'team_id' => 46,
                'player_id' => 7,
            ),
            91 => 
            array (
                'id' => 92,
                'team_id' => 46,
                'player_id' => 12,
            ),
            92 => 
            array (
                'id' => 93,
                'team_id' => 47,
                'player_id' => 2,
            ),
            93 => 
            array (
                'id' => 94,
                'team_id' => 47,
                'player_id' => 13,
            ),
            94 => 
            array (
                'id' => 95,
                'team_id' => 48,
                'player_id' => 2,
            ),
            95 => 
            array (
                'id' => 96,
                'team_id' => 48,
                'player_id' => 5,
            ),
            96 => 
            array (
                'id' => 97,
                'team_id' => 49,
                'player_id' => 2,
            ),
            97 => 
            array (
                'id' => 98,
                'team_id' => 49,
                'player_id' => 10,
            ),
            98 => 
            array (
                'id' => 99,
                'team_id' => 50,
                'player_id' => 2,
            ),
            99 => 
            array (
                'id' => 100,
                'team_id' => 50,
                'player_id' => 9,
            ),
            100 => 
            array (
                'id' => 101,
                'team_id' => 51,
                'player_id' => 2,
            ),
            101 => 
            array (
                'id' => 102,
                'team_id' => 51,
                'player_id' => 11,
            ),
            102 => 
            array (
                'id' => 103,
                'team_id' => 52,
                'player_id' => 2,
            ),
            103 => 
            array (
                'id' => 104,
                'team_id' => 52,
                'player_id' => 8,
            ),
            104 => 
            array (
                'id' => 105,
                'team_id' => 53,
                'player_id' => 2,
            ),
            105 => 
            array (
                'id' => 106,
                'team_id' => 53,
                'player_id' => 14,
            ),
            106 => 
            array (
                'id' => 107,
                'team_id' => 54,
                'player_id' => 2,
            ),
            107 => 
            array (
                'id' => 108,
                'team_id' => 54,
                'player_id' => 6,
            ),
            108 => 
            array (
                'id' => 109,
                'team_id' => 55,
                'player_id' => 2,
            ),
            109 => 
            array (
                'id' => 110,
                'team_id' => 55,
                'player_id' => 12,
            ),
            110 => 
            array (
                'id' => 111,
                'team_id' => 56,
                'player_id' => 13,
            ),
            111 => 
            array (
                'id' => 112,
                'team_id' => 56,
                'player_id' => 5,
            ),
            112 => 
            array (
                'id' => 113,
                'team_id' => 57,
                'player_id' => 13,
            ),
            113 => 
            array (
                'id' => 114,
                'team_id' => 57,
                'player_id' => 10,
            ),
            114 => 
            array (
                'id' => 115,
                'team_id' => 58,
                'player_id' => 13,
            ),
            115 => 
            array (
                'id' => 116,
                'team_id' => 58,
                'player_id' => 9,
            ),
            116 => 
            array (
                'id' => 117,
                'team_id' => 59,
                'player_id' => 13,
            ),
            117 => 
            array (
                'id' => 118,
                'team_id' => 59,
                'player_id' => 11,
            ),
            118 => 
            array (
                'id' => 119,
                'team_id' => 60,
                'player_id' => 13,
            ),
            119 => 
            array (
                'id' => 120,
                'team_id' => 60,
                'player_id' => 8,
            ),
            120 => 
            array (
                'id' => 121,
                'team_id' => 61,
                'player_id' => 13,
            ),
            121 => 
            array (
                'id' => 122,
                'team_id' => 61,
                'player_id' => 14,
            ),
            122 => 
            array (
                'id' => 123,
                'team_id' => 62,
                'player_id' => 13,
            ),
            123 => 
            array (
                'id' => 124,
                'team_id' => 62,
                'player_id' => 6,
            ),
            124 => 
            array (
                'id' => 125,
                'team_id' => 63,
                'player_id' => 13,
            ),
            125 => 
            array (
                'id' => 126,
                'team_id' => 63,
                'player_id' => 12,
            ),
            126 => 
            array (
                'id' => 127,
                'team_id' => 64,
                'player_id' => 5,
            ),
            127 => 
            array (
                'id' => 128,
                'team_id' => 64,
                'player_id' => 10,
            ),
            128 => 
            array (
                'id' => 129,
                'team_id' => 65,
                'player_id' => 5,
            ),
            129 => 
            array (
                'id' => 130,
                'team_id' => 65,
                'player_id' => 9,
            ),
            130 => 
            array (
                'id' => 131,
                'team_id' => 66,
                'player_id' => 5,
            ),
            131 => 
            array (
                'id' => 132,
                'team_id' => 66,
                'player_id' => 11,
            ),
            132 => 
            array (
                'id' => 133,
                'team_id' => 67,
                'player_id' => 5,
            ),
            133 => 
            array (
                'id' => 134,
                'team_id' => 67,
                'player_id' => 8,
            ),
            134 => 
            array (
                'id' => 135,
                'team_id' => 68,
                'player_id' => 5,
            ),
            135 => 
            array (
                'id' => 136,
                'team_id' => 68,
                'player_id' => 14,
            ),
            136 => 
            array (
                'id' => 137,
                'team_id' => 69,
                'player_id' => 5,
            ),
            137 => 
            array (
                'id' => 138,
                'team_id' => 69,
                'player_id' => 6,
            ),
            138 => 
            array (
                'id' => 139,
                'team_id' => 70,
                'player_id' => 5,
            ),
            139 => 
            array (
                'id' => 140,
                'team_id' => 70,
                'player_id' => 12,
            ),
            140 => 
            array (
                'id' => 141,
                'team_id' => 71,
                'player_id' => 10,
            ),
            141 => 
            array (
                'id' => 142,
                'team_id' => 71,
                'player_id' => 9,
            ),
            142 => 
            array (
                'id' => 143,
                'team_id' => 72,
                'player_id' => 10,
            ),
            143 => 
            array (
                'id' => 144,
                'team_id' => 72,
                'player_id' => 11,
            ),
            144 => 
            array (
                'id' => 145,
                'team_id' => 73,
                'player_id' => 10,
            ),
            145 => 
            array (
                'id' => 146,
                'team_id' => 73,
                'player_id' => 8,
            ),
            146 => 
            array (
                'id' => 147,
                'team_id' => 74,
                'player_id' => 10,
            ),
            147 => 
            array (
                'id' => 148,
                'team_id' => 74,
                'player_id' => 14,
            ),
            148 => 
            array (
                'id' => 149,
                'team_id' => 75,
                'player_id' => 10,
            ),
            149 => 
            array (
                'id' => 150,
                'team_id' => 75,
                'player_id' => 6,
            ),
            150 => 
            array (
                'id' => 151,
                'team_id' => 76,
                'player_id' => 10,
            ),
            151 => 
            array (
                'id' => 152,
                'team_id' => 76,
                'player_id' => 12,
            ),
            152 => 
            array (
                'id' => 153,
                'team_id' => 77,
                'player_id' => 9,
            ),
            153 => 
            array (
                'id' => 154,
                'team_id' => 77,
                'player_id' => 11,
            ),
            154 => 
            array (
                'id' => 155,
                'team_id' => 78,
                'player_id' => 9,
            ),
            155 => 
            array (
                'id' => 156,
                'team_id' => 78,
                'player_id' => 8,
            ),
            156 => 
            array (
                'id' => 157,
                'team_id' => 79,
                'player_id' => 9,
            ),
            157 => 
            array (
                'id' => 158,
                'team_id' => 79,
                'player_id' => 14,
            ),
            158 => 
            array (
                'id' => 159,
                'team_id' => 80,
                'player_id' => 9,
            ),
            159 => 
            array (
                'id' => 160,
                'team_id' => 80,
                'player_id' => 6,
            ),
            160 => 
            array (
                'id' => 161,
                'team_id' => 81,
                'player_id' => 9,
            ),
            161 => 
            array (
                'id' => 162,
                'team_id' => 81,
                'player_id' => 12,
            ),
            162 => 
            array (
                'id' => 163,
                'team_id' => 82,
                'player_id' => 11,
            ),
            163 => 
            array (
                'id' => 164,
                'team_id' => 82,
                'player_id' => 8,
            ),
            164 => 
            array (
                'id' => 165,
                'team_id' => 83,
                'player_id' => 11,
            ),
            165 => 
            array (
                'id' => 166,
                'team_id' => 83,
                'player_id' => 14,
            ),
            166 => 
            array (
                'id' => 167,
                'team_id' => 84,
                'player_id' => 11,
            ),
            167 => 
            array (
                'id' => 168,
                'team_id' => 84,
                'player_id' => 6,
            ),
            168 => 
            array (
                'id' => 169,
                'team_id' => 85,
                'player_id' => 11,
            ),
            169 => 
            array (
                'id' => 170,
                'team_id' => 85,
                'player_id' => 12,
            ),
            170 => 
            array (
                'id' => 171,
                'team_id' => 86,
                'player_id' => 8,
            ),
            171 => 
            array (
                'id' => 172,
                'team_id' => 86,
                'player_id' => 14,
            ),
            172 => 
            array (
                'id' => 173,
                'team_id' => 87,
                'player_id' => 8,
            ),
            173 => 
            array (
                'id' => 174,
                'team_id' => 87,
                'player_id' => 6,
            ),
            174 => 
            array (
                'id' => 175,
                'team_id' => 88,
                'player_id' => 8,
            ),
            175 => 
            array (
                'id' => 176,
                'team_id' => 88,
                'player_id' => 12,
            ),
            176 => 
            array (
                'id' => 177,
                'team_id' => 89,
                'player_id' => 14,
            ),
            177 => 
            array (
                'id' => 178,
                'team_id' => 89,
                'player_id' => 6,
            ),
            178 => 
            array (
                'id' => 179,
                'team_id' => 90,
                'player_id' => 14,
            ),
            179 => 
            array (
                'id' => 180,
                'team_id' => 90,
                'player_id' => 12,
            ),
            180 => 
            array (
                'id' => 181,
                'team_id' => 91,
                'player_id' => 6,
            ),
            181 => 
            array (
                'id' => 182,
                'team_id' => 91,
                'player_id' => 12,
            ),
        ));
        
        
    }
}