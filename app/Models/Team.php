<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Team extends Model
{
    use HasFactory;

    protected $table = 'teams';

    public $timestamps = false;

    protected $fillable = [
        'name',
    ];

    public function players(): BelongsToMany
    {
        return $this->belongsToMany(Player::class, 'players_teams', 'team_id', 'player_id');
    }

    public function matches()
    {
        return $this->homeGames()->unionAll($this->awayGames());
    }

    public function homeGames(): hasMany
    {
        return $this->hasMany(Game::class, 'team_home_id');
    }

    public function awayGames(): hasMany
    {
        return $this->hasMany(Game::class, 'team_away_id');
    }

    public function strikes(): hasMany
    {
        return $this->hasMany(TeamStrike::class, 'team_id');
    }

    public function dates(string $start_at = null, string $end_at = null)
    {
      if($start_at) {
        $this->whereDate('created_at', '>=', $start_at);
      }
      if($end_at) {
        $this->whereDate('created_at', '<=', $end_at);
      }
      return $this;
    }

    public function version(string $version = null)
    {
      if($version) {
        $this->where('version', $version);
      }
      return $this;
    }
}
