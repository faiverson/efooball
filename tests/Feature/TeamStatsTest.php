<?php

namespace Tests\Feature;

use App\Models\Game;
use App\Models\Team;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TeamStatsTest extends TestCase
{
    use RefreshDatabase;

    public function test_api_stats_returns_correct_structure()
    {
        $team1 = Team::create(['name' => 'Team A']);
        $team2 = Team::create(['name' => 'Team B']);

        Game::create([
            'team_home_id' => $team1->id,
            'team_away_id' => $team2->id,
            'team_home_score' => 2,
            'team_away_score' => 1,
            'version' => 'efootball_v4',
            'type' => 'copa',
            'played_at' => now(),
        ]);

        $response = $this->getJson('/api/team_stats?versions=EFOOTBALL_v4');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'name',
                        'total',
                        'win',
                        'draw',
                        'lost',
                        'average',
                    ]
                ]
            ]);
    }

    public function test_api_versus_returns_correct_structure()
    {
        $team1 = Team::create(['name' => 'Team A']);
        $team2 = Team::create(['name' => 'Team B']);

        Game::create([
            'team_home_id' => $team1->id,
            'team_away_id' => $team2->id,
            'team_home_score' => 2,
            'team_away_score' => 1,
            'version' => 'efootball_v4',
            'type' => 'copa',
            'played_at' => now(),
        ]);

        $response = $this->getJson("/api/team_versus?first_team_id={$team1->id}&second_team_id={$team2->id}&versions=EFOOTBALL_v4");

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    'first_team',
                    'second_team',
                    'games',
                    'totals' => [
                        'total',
                        'first_team_win',
                        'draw',
                        'first_team_lost',
                    ],
                ]
            ]);
    }

    public function test_api_stats_calculates_percentage_correctly()
    {
        $team1 = Team::create(['name' => 'Team A']);
        $team2 = Team::create(['name' => 'Team B']);

        // Game 1: Draw (1 point / 3 potential) -> 33.33%
        Game::create([
            'team_home_id' => $team1->id,
            'team_away_id' => $team2->id,
            'team_home_score' => 1,
            'team_away_score' => 1,
            'version' => 'efootball_v4',
            'type' => 'copa',
            'played_at' => now(),
        ]);

        $response = $this->getJson('/api/team_stats?versions=EFOOTBALL_v4');

        $response->assertStatus(200);
        $data = $response->json('data');
        
        // Find Team A stats
        $teamStats = collect($data)->firstWhere('name', 'Team A');
        
        $this->assertNotNull($teamStats);
        // Should be 33.33
        $this->assertEquals(33.33, $teamStats['average']);
    }
}
