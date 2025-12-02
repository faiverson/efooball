<?php

return [

    'current_version' => \App\Enums\GameVersion::EFOOTBALL_v5,

    'min_amount' => 5,

    'start_at' => '2017-10-17', // this is when the game started

    'end_at' => \Carbon\Carbon::now()->format('Y-m-d'),

    'modality' => [],
];
