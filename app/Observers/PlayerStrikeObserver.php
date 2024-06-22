<?php

namespace App\Observers;

use App\Enums\StrikeType;
use App\Models\SingleGame;
use App\Models\PlayerStrike;

class PlayerStrikeObserver
{
    public function created(SingleGame $game): void
    {
        $home_strike = PlayerStrike::where('player_id', $game->home_id)->orderByDesc('id')->first();
        $away_strike = PlayerStrike::where('player_id', $game->away_id)->orderByDesc('id')->first();

        if (!$home_strike) {
            // If no record exists, create a new one.
            $home_strike = PlayerStrike::create(['player_id' => $game->home_id, 'start_at' => $game->played_at]);
        }

        if (!$away_strike) {
            // If no record exists, create a new one.
            $away_strike = PlayerStrike::create(['player_id' => $game->away_id, 'start_at' => $game->played_at]);
        }

        // now we need to find out wich is the current strike good or bad
        if($game->result === 'home') {
            $this->appendGameWin($home_strike, $game);
            $this->appendGameLost($away_strike, $game);
        }

        if($game->result === 'draw') {
            $this->appendGameDraw($home_strike, $game);
            $this->appendGameDraw($away_strike, $game);
        }

        if($game->result === 'away') {
            $this->appendGameWin($away_strike, $game);
            $this->appendGameLost($home_strike, $game);
        }
    }

    private function appendGameWin(PlayerStrike $strike, SingleGame $game)
    {
        if ($strike->strike_type == StrikeType::INIT) {
            $strike->strike_type = StrikeType::WIN;
        }

        if ($strike->strike_type == StrikeType::LOST_DRAW || $strike->strike_type === StrikeType::LOST) {
            if($strike->loosing_strike < $strike->strike) {
                $strike->loosing_strike = $strike->strike;
                $strike->loosing_strikes_games = $strike->games;
                $strike->save();
            }
            $strike = PlayerStrike::create(['player_id' => $strike->player_id, 'start_at' => $game->played_at]);
            $strike->strike_type = StrikeType::WIN;
        }

        $strike->strike += 1;
        $strike->end_at = $game->played_at;
        $played_games = $strike->games ?? [];
        $played_games[] = $game->toArray();
        $strike->games = $played_games;
        $strike->save();
    }

    private function appendGameLost(PlayerStrike $strike, SingleGame $game)
    {
        if ($strike->strike_type == StrikeType::INIT) {
            $strike->strike_type = StrikeType::LOST;
        }

        if ($strike->strike_type === StrikeType::WIN_DRAW || $strike->strike_type === StrikeType::WIN) {
            if($strike->winning_strike < $strike->strike) {
                $strike->winning_strike = $strike->strike;
                $strike->winning_strikes_games = $strike->games;
                $strike->save();
            }
            $strike = PlayerStrike::create(['player_id' => $strike->player_id, 'start_at' => $game->played_at]);
            $strike->strike_type = StrikeType::LOST;
        }

        $strike->strike += 1;
        $strike->end_at = $game->played_at;
        $played_games = $strike->games ?? [];
        $played_games[] = $game->toArray();
        $strike->games = $played_games;
        $strike->save();

    }

    private function appendGameDraw(PlayerStrike $strike, SingleGame $game)
    {
        if ($strike->strike_type == StrikeType::WIN) {
            $strike->strike_type = StrikeType::WIN_DRAW;
            $strike->winning_strike = $strike->strike;
            $strike->winning_strikes_games = $strike->games;
        }

        if ($strike->strike_type == StrikeType::LOST) {
            $strike->strike_type = StrikeType::LOST_DRAW;
            $strike->loosing_strike = $strike->strike;
            $strike->loosing_strikes_games = $strike->games;
        }

        $strike->strike += 1;
        $strike->end_at = $game->played_at;
        $played_games = $strike->games ?? [];
        $played_games[] = $game->toArray();
        $strike->games = $played_games;
        $strike->save();
    }
}
