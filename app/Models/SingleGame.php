<?php

namespace App\Models;

use App\Enums\GameVersion;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class SingleGame extends Model
{
    protected $with = ['home', 'away'];

    protected $casts = [
      'version' => GameVersion::class,
      'played_at' => 'date:Y-m-d'
    ];

    protected $guarded = [];

    public $timestamps = false;

    public function home(): HasOne
    {
        return $this->hasOne(Player::class, 'id', 'home_id');
    }

    public function away(): HasOne
    {
        return $this->hasOne(Player::class, 'id', 'away_id');
    }

    public static function latestGames(): \Illuminate\Database\Eloquent\Builder
    {
      $latestDate = static::query()->max('played_at');
      return static::query()->where('played_at', $latestDate)->orderByDesc('id');
    }
}
