<?php

namespace App\Models;

use App\Enums\GameVersion;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Game extends Model
{
    protected $with = ['teamHome', 'teamAway'];

    protected $casts = [
      'version' => GameVersion::class,
      'played_at' => 'date:Y-m-d'
    ];

    protected $guarded = [];

    public $timestamps = false;

    public function teamHome(): HasOne
    {
        return $this->hasOne(Team::class, 'id', 'team_home_id');
    }

    public function teamAway(): HasOne
    {
        return $this->hasOne(Team::class, 'id', 'team_away_id');
    }

    public static function latestGames(): \Illuminate\Database\Eloquent\Builder
    {
      $latestDate = static::query()->max('played_at');
      return static::query()->where('played_at', $latestDate)->orderByDesc('id');
    }
}
