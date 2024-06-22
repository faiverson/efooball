<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

final class TournamentType extends Enum
{
    public const AMISTOSO = 'amistoso';
    public const LIBERTADORES = 'libertadores';
    public const SUDAMERICANA = 'sudamericana';
    public const TORNEO = 'torneo';
    public const COPA = 'copa';
}
