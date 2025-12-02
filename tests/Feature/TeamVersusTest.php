<?php

namespace Tests\Feature;

use App\Models\Game;
use App\Models\Team;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TeamVersusTest extends TestCase
{
    use RefreshDatabase;

    public function test_api_team_versus_filters_correctly()
    {
        // Create specific teams to match the user's request structure (though IDs might differ, logic is same)
        $team1 = Team::create(['id' => 4, 'name' => 'Team 4']);
        $team2 = Team::create(['id' => 43, 'name' => 'Team 43']);

        // 1. Match: Correct version, modality, date, and teams
        $matchingGame = Game::create([
            'team_home_id' => $team1->id,
            'team_away_id' => $team2->id,
            'team_home_score' => 2,
            'team_away_score' => 1,
            'result' => 'home',
            'version' => 'efootball_v5', // Matches EFOOTBALL_v5
            'type' => 'libertadores', // Matches one of the modalities
            'played_at' => '2020-01-01', // Inside range 2017-10-17 to 2025-12-03
        ]);

        // 2. No Match: Wrong Version
        Game::create([
            'team_home_id' => $team1->id,
            'team_away_id' => $team2->id,
            'team_home_score' => 1,
            'team_away_score' => 1,
            'result' => 'draw',
            'version' => 'efootball_v4', // Wrong version
            'type' => 'libertadores',
            'played_at' => '2020-01-01',
        ]);

        // 3. No Match: Wrong Modality
        // We will exclude 'amistoso' from the filter list in the URL, so this game should be filtered out.
        Game::create([
            'team_home_id' => $team1->id,
            'team_away_id' => $team2->id,
            'team_home_score' => 0,
            'team_away_score' => 0,
            'result' => 'draw',
            'version' => 'efootball_v5',
            'type' => 'amistoso', // Valid enum, but will be excluded by filter
            'played_at' => '2020-01-01',
        ]);

        // 4. No Match: Date out of range (before)
        Game::create([
            'team_home_id' => $team1->id,
            'team_away_id' => $team2->id,
            'team_home_score' => 3,
            'team_away_score' => 0,
            'result' => 'home',
            'version' => 'efootball_v5',
            'type' => 'libertadores',
            'played_at' => '2016-01-01', // Before 2017
        ]);

        // 5. No Match: Date out of range (after)
        Game::create([
            'team_home_id' => $team1->id,
            'team_away_id' => $team2->id,
            'team_home_score' => 0,
            'team_away_score' => 3,
            'result' => 'away',
            'version' => 'efootball_v5',
            'type' => 'libertadores',
            'played_at' => '2026-01-01', // After 2025
        ]);

        // Exclude AMISTOSO from the list
        $url = "/api/team_versus?versions=EFOOTBALL_v5&modality=LIBERTADORES,SUDAMERICANA,TORNEO,COPA&start_at=2017-10-17&end_at=2025-12-03&first_team_id={$team1->id}&second_team_id={$team2->id}";

        $response = $this->getJson($url);

        $response->assertStatus(200);
        
        // Assert we only got the matching game
        $response->assertJsonCount(1, 'data.games');
        $response->assertJsonFragment(['id' => $matchingGame->id]);

        // Assert totals are correct for the one matching game
        $response->assertJsonPath('data.totals.total', 1);
        $response->assertJsonPath('data.totals.first_team_win', 1); // Team 4 won 2-1
        $response->assertJsonPath('data.totals.draw', 0);
        $response->assertJsonPath('data.totals.first_team_lost', 0);
    }
}
