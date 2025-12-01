<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeamStrike extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = ['team_id', 'start_at'];

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
