<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

final class StrikeType extends Enum
{
    public const INIT = 'init';
    public const WIN = 'win';
    public const WIN_DRAW = 'win_draw';
    public const LOST_DRAW = 'lost_draw';
    public const LOST = 'lost';
}
