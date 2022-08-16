<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Player extends Model
{
    use HasFactory;

    protected $table = 'players';

    protected $fillable = [
        'name',
    ];

    public $timestamps = false;

    public function teams(): BelongsToMany
    {
        return $this->belongsToMany(Team::class, 'players_teams', 'player_id');
    }
}
