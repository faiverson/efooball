<?php

namespace App\Models;

use App\Enums\GameVersion;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Game extends Model
{
    use HasFactory;

    protected $table = 'games';

    protected $with = ['teamHome', 'teamAway'];

    protected $casts = [
      'version' => GameVersion::class,
    ];

    protected $guarded = [];

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
      $latestDate = static::query()->max('created_at');
      return static::query()->where('created_at', $latestDate);
    }
}
