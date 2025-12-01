<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class TournamentsTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('tournaments')->delete();
        
        \DB::table('tournaments')->insert(array (
            0 => 
            array (
                'id' => 1,
                'name' => 'Libertadores 1st',
                'games' => '[299, 300, 301, 302, 303, 304, 305, 306, 307, 308]',
                'game_type' => 'team',
                'type' => 'libertadores',
                'version' => 'pes_2019',
                'played_at' => '2018-10-23',
            ),
            1 => 
            array (
                'id' => 2,
                'name' => 'Sudamericana 1st',
                'games' => '[309, 310, 311, 312, 313, 314]',
                'game_type' => 'team',
                'type' => 'sudamericana',
                'version' => 'pes_2019',
                'played_at' => '2018-10-23',
            ),
            2 => 
            array (
                'id' => 3,
                'name' => 'Libertadores 2nd',
                'games' => '[406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417]',
                'game_type' => 'team',
                'type' => 'libertadores',
                'version' => 'pes_2019',
                'played_at' => '2019-01-01',
            ),
            3 => 
            array (
                'id' => 4,
                'name' => 'Libertadores 3rd',
                'games' => '[427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 438]',
                'game_type' => 'team',
                'type' => 'libertadores',
                'version' => 'pes_2019',
                'played_at' => '2019-01-11',
            ),
            4 => 
            array (
                'id' => 5,
                'name' => 'Libertadores 4th',
                'games' => '[439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 450]',
                'game_type' => 'team',
                'type' => 'libertadores',
                'version' => 'pes_2019',
                'played_at' => '2019-01-12',
            ),
            5 => 
            array (
                'id' => 6,
                'name' => 'Libertadores 5th',
                'games' => '[532, 533, 534, 535, 536, 537, 538, 539, 540, 541, 542, 543]',
                'game_type' => 'team',
                'type' => 'libertadores',
                'version' => 'pes_2019',
                'played_at' => '2019-03-26',
            ),
            6 => 
            array (
                'id' => 7,
                'name' => 'Libertadores 6th',
                'games' => '[564, 565, 566, 567, 568, 569, 570, 571, 572, 573, 574, 575]',
                'game_type' => 'team',
                'type' => 'libertadores',
                'version' => 'pes_2019',
                'played_at' => '2019-04-16',
            ),
            7 => 
            array (
                'id' => 8,
                'name' => 'Libertadores 7th',
                'games' => '[670, 671, 672, 673, 674, 675, 676, 677, 678, 679, 680, 681]',
                'game_type' => 'team',
                'type' => 'libertadores',
                'version' => 'pes_2019',
                'played_at' => '2019-06-11',
            ),
            8 => 
            array (
                'id' => 9,
                'name' => 'Libertadores 8th',
                'games' => '[744, 745, 746, 747, 748, 749, 750, 751, 752, 753, 754, 755]',
                'game_type' => 'team',
                'type' => 'libertadores',
                'version' => 'pes_2019',
                'played_at' => '2019-07-23',
            ),
            9 => 
            array (
                'id' => 10,
                'name' => 'Libertadores 9th',
                'games' => '[760, 761, 762, 763, 764, 765, 766, 767, 768, 769, 770, 771]',
                'game_type' => 'team',
                'type' => 'libertadores',
                'version' => 'pes_2019',
                'played_at' => '2019-07-30',
            ),
            10 => 
            array (
                'id' => 11,
                'name' => 'Libertadores 10th',
                'games' => '[802, 803, 804, 805, 806, 807, 808, 809, 810, 811]',
                'game_type' => 'team',
                'type' => 'libertadores',
                'version' => 'pes_2019',
                'played_at' => '2019-08-27',
            ),
            11 => 
            array (
                'id' => 12,
                'name' => 'Libertadores 11th',
                'games' => '[812, 813, 814, 815, 816, 817, 818, 819, 820, 821, 822, 823]',
                'game_type' => 'team',
                'type' => 'libertadores',
                'version' => 'pes_2019',
                'played_at' => '2019-08-28',
            ),
            12 => 
            array (
                'id' => 13,
                'name' => 'Libertadores 12th',
                'games' => '[845, 846, 847, 848, 849, 850, 851, 852, 853, 854, 855, 856]',
                'game_type' => 'team',
                'type' => 'libertadores',
                'version' => 'pes_2020',
                'played_at' => '2019-09-13',
            ),
            13 => 
            array (
                'id' => 14,
                'name' => 'Libertadores 13th',
                'games' => '[857, 858, 859, 860, 861, 862, 863, 864, 865, 866, 867, 868]',
                'game_type' => 'team',
                'type' => 'libertadores',
                'version' => 'pes_2020',
                'played_at' => '2019-09-14',
            ),
            14 => 
            array (
                'id' => 15,
                'name' => 'Sudamericana 2nd',
                'games' => '[869, 870, 871, 872, 873, 874]',
                'game_type' => 'team',
                'type' => 'sudamericana',
                'version' => 'pes_2020',
                'played_at' => '2019-09-14',
            ),
            15 => 
            array (
                'id' => 16,
                'name' => 'Libertadores 14th',
                'games' => '[907, 908, 909, 910, 911, 912, 913, 914, 915, 916, 917, 918]',
                'game_type' => 'team',
                'type' => 'libertadores',
                'version' => 'pes_2020',
                'played_at' => '2019-10-09',
            ),
            16 => 
            array (
                'id' => 17,
                'name' => 'Libertadores 15th',
                'games' => '[1052, 1053, 1054, 1055, 1056, 1057, 1058, 1059, 1060, 1061, 1062, 1063]',
                'game_type' => 'team',
                'type' => 'libertadores',
                'version' => 'pes_2020',
                'played_at' => '2020-01-14',
            ),
            17 => 
            array (
                'id' => 18,
                'name' => 'Libertadores 16th',
                'games' => '[1185, 1186, 1187, 1188, 1189, 1190, 1191, 1192, 1193, 1194, 1195, 1196]',
                'game_type' => 'team',
                'type' => 'libertadores',
                'version' => 'pes_2020',
                'played_at' => '2020-06-30',
            ),
            18 => 
            array (
                'id' => 19,
                'name' => 'Libertadores 17th',
                'games' => '[1285, 1286, 1287, 1288, 1289, 1290, 1291, 1292, 1293, 1294, 1295, 1296]',
                'game_type' => 'team',
                'type' => 'libertadores',
                'version' => 'pes_2020',
                'played_at' => '2020-09-02',
            ),
            19 => 
            array (
                'id' => 20,
                'name' => 'Sudamericana 3rd',
                'games' => '[1297, 1298, 1299, 1300, 1301, 1302]',
                'game_type' => 'team',
                'type' => 'sudamericana',
                'version' => 'pes_2020',
                'played_at' => '2020-09-02',
            ),
            20 => 
            array (
                'id' => 21,
                'name' => 'Libertadores 18th',
                'games' => '[1348, 1349, 1350, 1351, 1352, 1353, 1354, 1355]',
                'game_type' => 'team',
                'type' => 'libertadores',
                'version' => 'pes_2021',
                'played_at' => '2020-12-02',
            ),
            21 => 
            array (
                'id' => 22,
                'name' => 'Sudamericana 4th',
                'games' => '[1356, 1357, 1358, 1359, 1360, 1361]',
                'game_type' => 'team',
                'type' => 'sudamericana',
                'version' => 'pes_2021',
                'played_at' => '2020-12-02',
            ),
            22 => 
            array (
                'id' => 23,
                'name' => 'Libertadores 19th',
                'games' => '[1373, 1374, 1375, 1376, 1377, 1378, 1379, 1380, 1381, 1382]',
                'game_type' => 'team',
                'type' => 'libertadores',
                'version' => 'pes_2021',
                'played_at' => '2020-12-08',
            ),
            23 => 
            array (
                'id' => 24,
                'name' => 'Sudamericana 5th',
                'games' => '[1383, 1384, 1385, 1386, 1387, 1388]',
                'game_type' => 'team',
                'type' => 'sudamericana',
                'version' => 'pes_2021',
                'played_at' => '2020-12-08',
            ),
            24 => 
            array (
                'id' => 25,
                'name' => 'Libertadores 20th',
                'games' => '[1442, 1443, 1444, 1445, 1446, 1447, 1448, 1449, 1450, 1451, 1452, 1453]',
                'game_type' => 'team',
                'type' => 'libertadores',
                'version' => 'pes_2021',
                'played_at' => '2021-01-26',
            ),
            25 => 
            array (
                'id' => 26,
                'name' => 'Sudamericana 6th',
                'games' => '[1454, 1455, 1456, 1457, 1458, 1459]',
                'game_type' => 'team',
                'type' => 'sudamericana',
                'version' => 'pes_2021',
                'played_at' => '2021-01-26',
            ),
            26 => 
            array (
                'id' => 27,
                'name' => 'Libertadores 21st',
                'games' => '[1477, 1478, 1479, 1480, 1481, 1482, 1483, 1484, 1485, 1486, 1487, 1488]',
                'game_type' => 'team',
                'type' => 'libertadores',
                'version' => 'pes_2021',
                'played_at' => '2021-02-09',
            ),
            27 => 
            array (
                'id' => 28,
                'name' => 'Sudamericana 7th',
                'games' => '[1489, 1490, 1491, 1492, 1493, 1494]',
                'game_type' => 'team',
                'type' => 'sudamericana',
                'version' => 'pes_2021',
                'played_at' => '2021-02-09',
            ),
            28 => 
            array (
                'id' => 29,
                'name' => 'Libertadores 22nd',
                'games' => '[1522, 1523, 1524, 1525, 1526, 1527, 1528, 1529, 1530, 1531]',
                'game_type' => 'team',
                'type' => 'libertadores',
                'version' => 'pes_2021',
                'played_at' => '2021-03-02',
            ),
            29 => 
            array (
                'id' => 30,
                'name' => 'Sudamericana 8th',
                'games' => '[1532, 1533, 1534, 1535, 1536, 1537]',
                'game_type' => 'team',
                'type' => 'sudamericana',
                'version' => 'pes_2021',
                'played_at' => '2021-03-02',
            ),
            30 => 
            array (
                'id' => 31,
                'name' => 'Libertadores 23rd',
                'games' => '[1639, 1640, 1641, 1642, 1643, 1644, 1645, 1646]',
                'game_type' => 'team',
                'type' => 'libertadores',
                'version' => 'pes_2021',
                'played_at' => '2021-05-11',
            ),
            31 => 
            array (
                'id' => 32,
                'name' => 'Sudamericana 9th',
                'games' => '[1647, 1648, 1649, 1650, 1651, 1652]',
                'game_type' => 'team',
                'type' => 'sudamericana',
                'version' => 'pes_2021',
                'played_at' => '2021-05-11',
            ),
            32 => 
            array (
                'id' => 33,
                'name' => 'Libertadores 24th',
                'games' => '[1653, 1654, 1655, 1656, 1657, 1658, 1659, 1660, 1661, 1662, 1663, 1664]',
                'game_type' => 'team',
                'type' => 'libertadores',
                'version' => 'pes_2021',
                'played_at' => '2021-05-15',
            ),
            33 => 
            array (
                'id' => 34,
                'name' => 'Libertadores 25th',
                'games' => '[1668, 1669, 1670, 1671, 1672, 1673, 1674, 1675, 1676, 1677, 1678, 1679]',
                'game_type' => 'team',
                'type' => 'libertadores',
                'version' => 'pes_2021',
                'played_at' => '2021-05-18',
            ),
            34 => 
            array (
                'id' => 35,
                'name' => 'Sudamericana 10th',
                'games' => '[1680, 1681, 1682, 1683, 1684, 1685]',
                'game_type' => 'team',
                'type' => 'sudamericana',
                'version' => 'pes_2021',
                'played_at' => '2021-05-18',
            ),
            35 => 
            array (
                'id' => 36,
                'name' => 'Libertadores 26th',
                'games' => '[1790, 1791, 1792, 1793, 1794, 1795, 1796, 1797]',
                'game_type' => 'team',
                'type' => 'libertadores',
                'version' => 'pes_2021',
                'played_at' => '2021-08-24',
            ),
            36 => 
            array (
                'id' => 37,
                'name' => 'Sudamericana 11th',
                'games' => '[1798, 1799, 1800, 1801, 1802, 1803]',
                'game_type' => 'team',
                'type' => 'sudamericana',
                'version' => 'pes_2021',
                'played_at' => '2021-08-24',
            ),
            37 => 
            array (
                'id' => 38,
                'name' => 'Libertadores 27th',
                'games' => '[2033, 2034, 2035, 2036, 2037, 2038, 2039, 2040, 2041, 2042, 2043, 2044]',
                'game_type' => 'team',
                'type' => 'libertadores',
                'version' => 'fifa_2022',
                'played_at' => '2022-04-19',
            ),
            38 => 
            array (
                'id' => 39,
                'name' => 'Libertadores 28th',
                'games' => '[2083, 2084, 2085, 2086, 2087, 2088, 2089, 2090]',
                'game_type' => 'team',
                'type' => 'libertadores',
                'version' => 'efootball_2022',
                'played_at' => '2022-06-07',
            ),
            39 => 
            array (
                'id' => 40,
                'name' => 'Sudamericana 12th',
                'games' => '[2091, 2092, 2093, 2094, 2095, 2096]',
                'game_type' => 'team',
                'type' => 'sudamericana',
                'version' => 'efootball_2022',
                'played_at' => '2022-06-07',
            ),
            40 => 
            array (
                'id' => 41,
                'name' => 'Libertadores 29th',
                'games' => '[2142, 2143, 2144, 2145, 2146, 2147, 2148, 2149, 2150, 2151, 2152, 2153]',
                'game_type' => 'team',
                'type' => 'libertadores',
                'version' => 'efootball_2022',
                'played_at' => '2022-07-26',
            ),
            41 => 
            array (
                'id' => 42,
                'name' => 'Libertadores 30th',
                'games' => '[2173, 2174, 2175, 2176, 2177, 2178, 2179, 2180, 2181, 2182, 2183, 2184]',
                'game_type' => 'team',
                'type' => 'libertadores',
                'version' => 'efootball_2022',
                'played_at' => '2022-08-16',
            ),
            42 => 
            array (
                'id' => 43,
                'name' => 'Libertadores 31st',
                'games' => '[2186, 2187, 2188, 2189, 2190, 2191, 2192, 2193, 2194, 2195, 2196, 2197]',
                'game_type' => 'team',
                'type' => 'libertadores',
                'version' => 'efootball_2022',
                'played_at' => '2022-08-23',
            ),
            43 => 
            array (
                'id' => 44,
                'name' => 'Libertadores 32nd',
                'games' => '[2359, 2360, 2361, 2362, 2363, 2364, 2365, 2366, 2367, 2368, 2369, 2370]',
                'game_type' => 'team',
                'type' => 'libertadores',
                'version' => 'efootball_2023',
                'played_at' => '2023-01-10',
            ),
            44 => 
            array (
                'id' => 45,
                'name' => 'Sudamericana 13th',
                'games' => '[2371, 2372, 2373, 2374, 2375, 2376]',
                'game_type' => 'team',
                'type' => 'sudamericana',
                'version' => 'efootball_2023',
                'played_at' => '2023-01-10',
            ),
            45 => 
            array (
                'id' => 46,
                'name' => 'Libertadores 33rd',
                'games' => '[2414, 2415, 2416, 2417, 2418, 2419, 2420, 2421, 2422, 2423, 2424, 2425]',
                'game_type' => 'team',
                'type' => 'libertadores',
                'version' => 'efootball_2023',
                'played_at' => '2023-04-11',
            ),
            46 => 
            array (
                'id' => 47,
                'name' => 'Libertadores 34th',
                'games' => '[2522, 2523, 2524, 2525, 2526, 2527, 2528, 2529, 2530, 2531, 2532, 2533]',
                'game_type' => 'team',
                'type' => 'libertadores',
                'version' => 'efootball_2023',
                'played_at' => '2023-08-22',
            ),
            47 => 
            array (
                'id' => 48,
                'name' => 'Libertadores 35th',
                'games' => '[2555, 2556, 2557, 2558, 2559, 2560, 2561, 2562, 2563, 2564, 2565, 2566]',
                'game_type' => 'team',
                'type' => 'libertadores',
                'version' => 'efootball_2024',
                'played_at' => '2023-09-12',
            ),
            48 => 
            array (
                'id' => 49,
                'name' => 'Sudamericana 14th',
                'games' => '[2567, 2568, 2569, 2570, 2571, 2572]',
                'game_type' => 'team',
                'type' => 'sudamericana',
                'version' => 'efootball_2024',
                'played_at' => '2023-09-19',
            ),
            49 => 
            array (
                'id' => 50,
                'name' => 'Libertadores 36th',
                'games' => '[2583, 2584, 2585, 2586, 2587, 2588, 2589, 2590, 2591, 2592, 2593, 2594]',
                'game_type' => 'team',
                'type' => 'libertadores',
                'version' => 'efootball_2024',
                'played_at' => '2023-10-03',
            ),
            50 => 
            array (
                'id' => 51,
                'name' => 'Sudamericana 15th',
                'games' => '[2595, 2596, 2597, 2598, 2599, 2600]',
                'game_type' => 'team',
                'type' => 'sudamericana',
                'version' => 'efootball_2024',
                'played_at' => '2023-10-03',
            ),
            51 => 
            array (
                'id' => 52,
                'name' => 'Libertadores 37th',
                'games' => '[2729, 2730, 2731, 2732, 2733, 2734, 2735, 2736, 2737, 2738, 2739, 2740]',
                'game_type' => 'team',
                'type' => 'libertadores',
                'version' => 'efootball_2024',
                'played_at' => '2024-02-20',
            ),
            52 => 
            array (
                'id' => 53,
                'name' => 'Sudamericana 16th',
                'games' => '[2741, 2742, 2743, 2744, 2745]',
                'game_type' => 'team',
                'type' => 'sudamericana',
                'version' => 'efootball_2024',
                'played_at' => '2024-02-20',
            ),
            53 => 
            array (
                'id' => 54,
                'name' => 'Libertadores 38th',
                'games' => '[2746, 2747, 2748, 2749, 2750, 2751, 2752, 2753, 2754, 2755, 2756, 2757]',
                'game_type' => 'team',
                'type' => 'libertadores',
                'version' => 'efootball_2024',
                'played_at' => '2024-02-27',
            ),
            54 => 
            array (
                'id' => 55,
                'name' => 'Sudamericana 17th',
                'games' => '[2758, 2759, 2760, 2761, 2762, 2763]',
                'game_type' => 'team',
                'type' => 'sudamericana',
                'version' => 'efootball_2024',
                'played_at' => '2024-02-27',
            ),
            55 => 
            array (
                'id' => 56,
                'name' => 'Libertadores 39th',
                'games' => '[2782, 2783, 2784, 2785, 2786, 2787, 2788, 2789, 2790, 2791, 2792, 2793]',
                'game_type' => 'team',
                'type' => 'libertadores',
                'version' => 'efootball_2024',
                'played_at' => '2024-03-19',
            ),
            56 => 
            array (
                'id' => 57,
                'name' => 'Sudamericana 18th',
                'games' => '[2794, 2795, 2796, 2797, 2798, 2799]',
                'game_type' => 'team',
                'type' => 'sudamericana',
                'version' => 'efootball_2024',
                'played_at' => '2024-03-19',
            ),
            57 => 
            array (
                'id' => 58,
                'name' => 'Libertadores 40th',
                'games' => '[2800, 2801, 2802, 2803, 2804, 2805, 2806, 2807, 2808, 2809, 2810, 2811]',
                'game_type' => 'team',
                'type' => 'libertadores',
                'version' => 'efootball_2024',
                'played_at' => '2024-03-26',
            ),
            58 => 
            array (
                'id' => 59,
                'name' => 'Sudamericana 19th',
                'games' => '[2812, 2813, 2814, 2815, 2816, 2817]',
                'game_type' => 'team',
                'type' => 'sudamericana',
                'version' => 'efootball_2024',
                'played_at' => '2024-03-26',
            ),
            59 => 
            array (
                'id' => 60,
                'name' => 'Libertadores 41st',
                'games' => '[2872, 2873, 2874, 2875, 2876, 2877, 2878, 2879, 2880, 2881, 2882, 2883]',
                'game_type' => 'team',
                'type' => 'libertadores',
                'version' => 'efootball_2024',
                'played_at' => '2024-05-07',
            ),
            60 => 
            array (
                'id' => 61,
                'name' => 'Sudamericana 20th',
                'games' => '[2884, 2885, 2886, 2887, 2888, 2889]',
                'game_type' => 'team',
                'type' => 'sudamericana',
                'version' => 'efootball_2024',
                'played_at' => '2024-05-07',
            ),
            61 => 
            array (
                'id' => 62,
                'name' => 'Libertadores 42nd',
                'games' => '[2890, 2891, 2892, 2893, 2894, 2895, 2896, 2897]',
                'game_type' => 'team',
                'type' => 'libertadores',
                'version' => 'fifa_2024',
                'played_at' => '2024-05-14',
            ),
            62 => 
            array (
                'id' => 63,
                'name' => 'Libertadores 42nd',
                'games' => '[2898, 2899, 2900, 2901, 2902, 2903]',
                'game_type' => 'team',
                'type' => 'libertadores',
                'version' => 'efootball_2024',
                'played_at' => '2024-05-14',
            ),
            63 => 
            array (
                'id' => 64,
                'name' => 'Libertadores 44th',
                'games' => '[3003, 3004, 3005, 3006, 3007, 3008, 3009, 3010, 3011, 3012, 3013, 3014]',
                'game_type' => 'team',
                'type' => 'libertadores',
                'version' => 'efootball_2024',
                'played_at' => '2024-08-27',
            ),
            64 => 
            array (
                'id' => 65,
                'name' => 'Sudamericana 21st',
                'games' => '[3015, 3016, 3017, 3018, 3019, 3020]',
                'game_type' => 'team',
                'type' => 'sudamericana',
                'version' => 'efootball_2024',
                'played_at' => '2024-08-27',
            ),
            65 => 
            array (
                'id' => 66,
                'name' => 'Libertadores 45th',
                'games' => '[3038, 3039, 3040, 3041, 3042, 3043, 3044, 3045, 3046, 3047, 3048, 3049]',
                'game_type' => 'team',
                'type' => 'libertadores',
                'version' => 'efootball_v4',
                'played_at' => '2024-09-24',
            ),
            66 => 
            array (
                'id' => 67,
                'name' => 'Libertadores 46th',
                'games' => '[3073, 3074, 3075, 3076, 3077, 3078, 3079, 3080, 3081, 3082, 3083, 3084, 3085]',
                'game_type' => 'team',
                'type' => 'libertadores',
                'version' => 'efootball_v4',
                'played_at' => '2024-11-05',
            ),
            67 => 
            array (
                'id' => 68,
                'name' => 'Libertadores 47th',
                'games' => '[3086, 3087, 3088, 3089, 3090, 3091, 3092, 3093]',
                'game_type' => 'team',
                'type' => 'libertadores',
                'version' => 'efootball_v4',
                'played_at' => '2024-11-12',
            ),
            68 => 
            array (
                'id' => 69,
                'name' => 'Sudamericana 22nd',
                'games' => '[3094, 3095, 3096, 3097, 3098, 3099]',
                'game_type' => 'team',
                'type' => 'sudamericana',
                'version' => 'efootball_v4',
                'played_at' => '2024-11-12',
            ),
            69 => 
            array (
                'id' => 70,
                'name' => 'Libertadores 48th',
                'games' => '[3107, 3108, 3109, 3110, 3111, 3112, 3113, 3114, 3115, 3116, 3117, 3118]',
                'game_type' => 'team',
                'type' => 'libertadores',
                'version' => 'efootball_v4',
                'played_at' => '2024-11-26',
            ),
            70 => 
            array (
                'id' => 71,
                'name' => 'Sudamericana 23rd',
                'games' => '[3119, 3120, 3121, 3122, 3123, 3124]',
                'game_type' => 'team',
                'type' => 'sudamericana',
                'version' => 'efootball_v4',
                'played_at' => '2024-11-26',
            ),
            71 => 
            array (
                'id' => 72,
                'name' => 'Libertadores 49th',
                'games' => '[3128, 3129, 3130, 3131, 3132, 3133, 3134, 3135, 3136, 3137]',
                'game_type' => 'team',
                'type' => 'libertadores',
                'version' => 'efootball_v4',
                'played_at' => '2025-01-14',
            ),
            72 => 
            array (
                'id' => 73,
                'name' => 'Libertadores 50th',
                'games' => '[3194, 3195, 3196, 3197, 3198, 3199, 3200, 3201, 3202, 3203]',
                'game_type' => 'team',
                'type' => 'libertadores',
                'version' => 'efootball_v4',
                'played_at' => '2025-04-22',
            ),
            73 => 
            array (
                'id' => 74,
                'name' => 'Libertadores 51st',
                'games' => '[3245, 3246, 3247, 3248, 3249, 3250, 3251, 3252, 3253, 3254, 3255, 3256]',
                'game_type' => 'team',
                'type' => 'libertadores',
                'version' => 'efootball_v4',
                'played_at' => '2025-06-24',
            ),
            74 => 
            array (
                'id' => 75,
                'name' => 'Libertadores 52nd',
                'games' => '[3261, 3262, 3263, 3264, 3265, 3266, 3267, 3268, 3269, 3270]',
                'game_type' => 'team',
                'type' => 'libertadores',
                'version' => 'efootball_v4',
                'played_at' => '2025-07-01',
            ),
            75 => 
            array (
                'id' => 76,
                'name' => 'Libertadores 53rd',
                'games' => '[3295, 3296, 3297, 3298, 3299, 3300, 3301, 3302, 3303, 3304, 3305, 3306]',
                'game_type' => 'team',
                'type' => 'libertadores',
                'version' => 'efootball_v4',
                'played_at' => '2025-08-19',
            ),
            76 => 
            array (
                'id' => 77,
                'name' => 'Libertadores 54th',
                'games' => '[3330, 3331, 3332, 3333, 3334, 3335, 3336, 3337, 3338, 3339, 3340, 3341]',
                'game_type' => 'team',
                'type' => 'libertadores',
                'version' => 'efootball_v4',
                'played_at' => '2025-09-23',
            ),
            77 => 
            array (
                'id' => 78,
                'name' => 'Libertadores 55th',
                'games' => '[3342, 3343, 3344, 3345, 3346, 3347, 3348, 3349, 3350, 3351, 3352, 3353]',
                'game_type' => 'team',
                'type' => 'libertadores',
                'version' => 'efootball_v4',
                'played_at' => '2025-09-30',
            ),
            78 => 
            array (
                'id' => 79,
                'name' => 'Sudamericana 24th',
                'games' => '[3354, 3355, 3356, 3357, 3358, 3359]',
                'game_type' => 'team',
                'type' => 'sudamericana',
                'version' => 'efootball_v4',
                'played_at' => '2025-09-30',
            ),
            79 => 
            array (
                'id' => 80,
                'name' => 'Libertadores 56th',
                'games' => '[3366, 3367, 3368, 3369, 3370, 3371, 3372, 3373, 3374, 3375, 3376, 3377]',
                'game_type' => 'team',
                'type' => 'libertadores',
                'version' => 'efootball_v4',
                'played_at' => '2025-10-21',
            ),
            80 => 
            array (
                'id' => 81,
                'name' => 'Libertadores 57th',
                'games' => '[3379, 3380, 3381, 3382, 3383, 3384, 3385, 3386, 3387, 3388, 3389, 3390]',
                'game_type' => 'team',
                'type' => 'libertadores',
                'version' => 'efootball_v4',
                'played_at' => '2025-11-04',
            ),
            81 => 
            array (
                'id' => 82,
                'name' => 'Libertadores 58th',
                'games' => '[3395, 3396, 3397, 3398, 3399, 3400, 3401, 3402, 3403, 3404, 3405, 3406]',
                'game_type' => 'team',
                'type' => 'libertadores',
                'version' => 'efootball_v4',
                'played_at' => '2025-11-18',
            ),
            82 => 
            array (
                'id' => 83,
                'name' => 'Libertadores 59th',
                'games' => '[3409, 3410, 3411, 3412, 3413, 3414, 3415, 3416, 3417, 3418, 3419, 3420]',
                'game_type' => 'team',
                'type' => 'libertadores',
                'version' => 'efootball_v4',
                'played_at' => '2025-11-25',
            ),
            83 => 
            array (
                'id' => 84,
                'name' => 'Torneo 1st',
                'games' => '[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33]',
                'game_type' => 'single',
                'type' => 'torneo',
                'version' => 'pes_2021',
                'played_at' => '2021-11-15',
            ),
            84 => 
            array (
                'id' => 85,
                'name' => 'Torneo 2nd',
                'games' => '[34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58]',
                'game_type' => 'single',
                'type' => 'torneo',
                'version' => 'efootball_2023',
                'played_at' => '2023-01-17',
            ),
            85 => 
            array (
                'id' => 86,
                'name' => 'Copa 1st',
                'games' => '[66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78]',
                'game_type' => 'single',
                'type' => 'copa',
                'version' => 'efootball_2023',
                'played_at' => '2023-01-31',
            ),
            86 => 
            array (
                'id' => 87,
                'name' => 'Torneo 3rd',
                'games' => '[84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109]',
                'game_type' => 'single',
                'type' => 'torneo',
                'version' => 'efootball_2023',
                'played_at' => '2023-02-21',
            ),
            87 => 
            array (
                'id' => 88,
                'name' => 'Torneo 4th',
                'games' => '[110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134]',
                'game_type' => 'single',
                'type' => 'torneo',
                'version' => 'efootball_2023',
                'played_at' => '2023-03-07',
            ),
            88 => 
            array (
                'id' => 89,
                'name' => 'Torneo 5th',
                'games' => '[135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159]',
                'game_type' => 'single',
                'type' => 'torneo',
                'version' => 'efootball_2023',
                'played_at' => '2023-03-21',
            ),
            89 => 
            array (
                'id' => 90,
                'name' => 'Torneo 6th',
                'games' => '[160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184]',
                'game_type' => 'single',
                'type' => 'torneo',
                'version' => 'efootball_2023',
                'played_at' => '2023-03-28',
            ),
            90 => 
            array (
                'id' => 91,
                'name' => 'Torneo 7th',
                'games' => '[185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209]',
                'game_type' => 'single',
                'type' => 'torneo',
                'version' => 'efootball_2023',
                'played_at' => '2023-05-23',
            ),
            91 => 
            array (
                'id' => 92,
                'name' => 'Torneo 8th',
                'games' => '[210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234]',
                'game_type' => 'single',
                'type' => 'torneo',
                'version' => 'efootball_2023',
                'played_at' => '2022-05-30',
            ),
            92 => 
            array (
                'id' => 93,
                'name' => 'Copa 2nd',
                'games' => '[256, 257, 258, 259, 260, 261]',
                'game_type' => 'single',
                'type' => 'copa',
                'version' => 'efootball_2024',
                'played_at' => '2024-12-05',
            ),
            93 => 
            array (
                'id' => 94,
                'name' => 'Torneo 9th',
                'games' => '[263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287]',
                'game_type' => 'single',
                'type' => 'torneo',
                'version' => 'efootball_2024',
                'played_at' => '2024-01-09',
            ),
            94 => 
            array (
                'id' => 95,
                'name' => 'Copa 3rd',
                'games' => '[289, 290, 291, 292, 293, 294]',
                'game_type' => 'single',
                'type' => 'copa',
                'version' => 'efootball_2024',
                'played_at' => '2024-03-05',
            ),
            95 => 
            array (
                'id' => 96,
                'name' => 'Torneo 10th',
                'games' => '[296, 297, 298, 299, 300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320]',
                'game_type' => 'single',
                'type' => 'torneo',
                'version' => 'efootball_2024',
                'played_at' => '2024-05-28',
            ),
            96 => 
            array (
                'id' => 97,
                'name' => 'Torneo 11th',
                'games' => '[321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345]',
                'game_type' => 'single',
                'type' => 'torneo',
                'version' => 'efootball_2024',
                'played_at' => '2024-06-04',
            ),
            97 => 
            array (
                'id' => 98,
                'name' => 'Torneo 12th',
                'games' => '[348, 349, 350, 351, 352, 353, 354, 355, 356, 357, 358, 359, 360, 361, 362, 363, 364, 365, 366, 367, 368, 369, 370, 371, 372]',
                'game_type' => 'single',
                'type' => 'torneo',
                'version' => 'efootball_v4',
                'played_at' => '2024-10-08',
            ),
            98 => 
            array (
                'id' => 99,
                'name' => 'Torneo 13th',
                'games' => '[373, 374, 375, 376, 377, 378, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397]',
                'game_type' => 'single',
                'type' => 'torneo',
                'version' => 'efootball_v4',
                'played_at' => '2024-10-15',
            ),
            99 => 
            array (
                'id' => 100,
                'name' => 'Torneo 14th',
                'games' => '[398, 399, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422]',
                'game_type' => 'single',
                'type' => 'torneo',
                'version' => 'efootball_v4',
                'played_at' => '2024-10-29',
            ),
            100 => 
            array (
                'id' => 101,
                'name' => 'Torneo 15th',
                'games' => '[424, 425, 426, 427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448]',
                'game_type' => 'single',
                'type' => 'torneo',
                'version' => 'efootball_v4',
                'played_at' => '2024-12-03',
            ),
            101 => 
            array (
                'id' => 102,
                'name' => 'Torneo 16th',
                'games' => '[449, 450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467, 468, 469, 470, 471, 472, 473]',
                'game_type' => 'single',
                'type' => 'torneo',
                'version' => 'efootball_v4',
                'played_at' => '2024-12-10',
            ),
            102 => 
            array (
                'id' => 103,
                'name' => 'Torneo 17th',
                'games' => '[474, 475, 476, 477, 478, 479, 480, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 495, 496, 497, 498]',
                'game_type' => 'single',
                'type' => 'torneo',
                'version' => 'efootball_v4',
                'played_at' => '2025-04-08',
            ),
            103 => 
            array (
                'id' => 104,
                'name' => 'Torneo 18th',
                'games' => '[499, 500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511, 512, 513, 514, 515, 516, 517, 518, 519, 520, 521, 522, 523]',
                'game_type' => 'single',
                'type' => 'torneo',
                'version' => 'efootball_v4',
                'played_at' => '2025-05-20',
            ),
            104 => 
            array (
                'id' => 105,
                'name' => 'Torneo 19th',
                'games' => '[524, 525, 526, 527, 528, 529, 530, 531, 532, 533, 534, 535, 536, 537, 538, 539, 540, 541, 542, 543, 544, 545, 546, 547, 548]',
                'game_type' => 'single',
                'type' => 'torneo',
                'version' => 'efootball_v4',
                'played_at' => '2025-07-22',
            ),
            105 => 
            array (
                'id' => 106,
                'name' => 'Torneo 20th',
                'games' => '[549, 550, 551, 552, 553, 554, 555, 556, 557, 558, 559, 560, 561, 562, 563, 564, 565, 566, 567, 568, 569, 570, 571, 572, 573]',
                'game_type' => 'single',
                'type' => 'torneo',
                'version' => 'efootball_v4',
                'played_at' => '2025-08-26',
            ),
        ));
        
        
    }
}