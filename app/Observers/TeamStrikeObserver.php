<?php

namespace App\Observers;

use App\Enums\StrikeType;
use App\Models\Game;
use App\Models\TeamStrike;

class TeamStrikeObserver
{
    public function created(Game $game): void
    {
        $home_team_strike = TeamStrike::where('team_id', $game->team_home_id)->orderByDesc('id')->first();
        $away_team_strike = TeamStrike::where('team_id', $game->team_away_id)->orderByDesc('id')->first();

        if (!$home_team_strike) {
            // If no record exists, create a new one.
            $home_team_strike = TeamStrike::create(['team_id' => $game->team_home_id, 'start_at' => $game->played_at]);
        }

        if (!$away_team_strike) {
            // If no record exists, create a new one.
            $away_team_strike = TeamStrike::create(['team_id' => $game->team_away_id, 'start_at' => $game->played_at]);
        }

        // now we need to find out wich is the current strike good or bad
        if($game->result === 'home') {
            $this->appendGameWin($home_team_strike, $game);
            $this->appendGameLost($away_team_strike, $game);
        }

        if($game->result === 'draw') {
            $this->appendGameDraw($home_team_strike, $game);
            $this->appendGameDraw($away_team_strike, $game);
        }

        if($game->result === 'away') {
            $this->appendGameWin($away_team_strike, $game);
            $this->appendGameLost($home_team_strike, $game);
        }
    }

    private function appendGameWin(TeamStrike $team_strike, Game $game)
    {
        if ($team_strike->strike_type == StrikeType::INIT) {
            $team_strike->strike_type = StrikeType::WIN;
        }

        if ($team_strike->strike_type == StrikeType::LOST_DRAW || $team_strike->strike_type === StrikeType::LOST) {
            if($team_strike->loosing_strike < $team_strike->strike) {
                $team_strike->loosing_strike = $team_strike->strike;
                $team_strike->loosing_strikes_games = $team_strike->games;
                $team_strike->save();
            }
            $team_strike = TeamStrike::create(['team_id' => $team_strike->team_id, 'start_at' => $game->played_at]);
            $team_strike->strike_type = StrikeType::WIN;
        }

        $team_strike->strike += 1;
        $team_strike->end_at = $game->played_at;
        $played_games = $team_strike->games ?? [];
        $played_games[] = $game->toArray();
        $team_strike->games = $played_games;
        $team_strike->save();
    }

    private function appendGameLost(TeamStrike $team_strike, Game $game)
    {
        if ($team_strike->strike_type == StrikeType::INIT) {
            $team_strike->strike_type = StrikeType::LOST;
        }

        if ($team_strike->strike_type === StrikeType::WIN_DRAW || $team_strike->strike_type === StrikeType::WIN) {
            if($team_strike->winning_strike < $team_strike->strike) {
                $team_strike->winning_strike = $team_strike->strike;
                $team_strike->winning_strikes_games = $team_strike->games;
                $team_strike->save();
            }
            $team_strike = TeamStrike::create(['team_id' => $team_strike->team_id, 'start_at' => $game->played_at]);
            $team_strike->strike_type = StrikeType::LOST;
        }

        $team_strike->strike += 1;
        $team_strike->end_at = $game->played_at;
        $played_games = $team_strike->games ?? [];
        $played_games[] = $game->toArray();
        $team_strike->games = $played_games;
        $team_strike->save();

    }

    private function appendGameDraw(TeamStrike $team_strike, Game $game)
    {
        if ($team_strike->strike_type == StrikeType::WIN) {
            $team_strike->strike_type = StrikeType::WIN_DRAW;
            $team_strike->winning_strike = $team_strike->strike;
            $team_strike->winning_strikes_games = $team_strike->games;
        }

        if ($team_strike->strike_type == StrikeType::LOST) {
            $team_strike->strike_type = StrikeType::LOST_DRAW;
            $team_strike->loosing_strike = $team_strike->strike;
            $team_strike->loosing_strikes_games = $team_strike->games;
        }

        $team_strike->strike += 1;
        $team_strike->end_at = $game->played_at;
        $played_games = $team_strike->games ?? [];
        $played_games[] = $game->toArray();
        $team_strike->games = $played_games;
        $team_strike->save();
    }
}
