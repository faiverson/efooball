<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Enums\GameVersion;
use App\Enums\TournamentType;
use Illuminate\Database\Eloquent\Casts\AsCollection;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Tournament extends Model
{
    protected $table = 'tournaments';

    const CREATED_AT = 'played_at';

    const UPDATED_AT = null;

    public $timestamps = ['played_at'];

    protected $casts = [
      'type' => TournamentType::class,
      'version' => GameVersion::class,
      'games' => AsCollection::class,
      'played_at' => 'datetime:Y-m-d',
    ];

    protected $guarded = [];

    public function scopeAmistoso(Builder $query): Builder
    {
        return $query->where('type', TournamentType::AMISTOSO);
    }

    public function scopeLibertadores(Builder $query): Builder
    {
        return $query->where('type', TournamentType::LIBERTADORES);
    }

    public function scopeSudamericana(Builder $query): Builder
    {
        return $query->where('type', TournamentType::SUDAMERICANA);
    }


    public function scopeTorneo(Builder $query): Builder
    {
        return $query->where('type', TournamentType::TORNEO);
    }

    public function scopeCopa(Builder $query): Builder
    {
        return $query->where('type', TournamentType::COPA);
    }

    protected function positions(): Attribute
    {
        return Attribute::make(
            get: function ($value, $attributes) {
                $positions = (array) json_decode($attributes['positions'], false);
                $positions = array_values($positions);
                usort($positions, function (object $a, object $b) {
                    if ($a->POINTS === $b->POINTS) {
                        if ($a->DIF === $b->DIF) {
                            return $a->GF <= $b->GF ? 1 : -1;
                        }
                        return $a->DIF < $b->DIF ? 1 : -1;
                    }
                    return $a->POINTS < $b->POINTS ? 1 : -1;
                });
                return $positions;
            },
        );
    }
}
