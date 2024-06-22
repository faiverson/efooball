<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlayerStrike extends Model
{
    use HasFactory;
    protected $table = 'single_strikes';


    public $timestamps = false;

    protected $casts = [
        'strike' => 'integer',
        'winning_strikes' => 'integer',
        'loosing_strikes' => 'integer',
        'games' => 'array',
        'winning_strikes_games' => 'array',
        'loosing_strikes_games' => 'array',
        'start_at' => 'datetime:Y-m-d',
        'end_at' => 'datetime:Y-m-d',
    ];
}
