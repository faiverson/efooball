<?php

return [

    'current_version' => \App\Enums\GameVersion::EFOOTBALL_2023,

    'min_amount' => 5,

    'start_at' => \Carbon\Carbon::now()->subMonth()->format('Y-m-d'),

    'end_at' => \Carbon\Carbon::now()->format('Y-m-d')

];
