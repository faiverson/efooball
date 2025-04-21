import { useState, useCallback, useMemo } from 'react';
import { getFinalResults, splitTournamentGames } from '@/lib/tournamentUtils';

export function useTournament(tournament) {
    const [expandedRounds, setExpandedRounds] = useState(new Set());

    const toggleRound = useCallback((round) => {
        const newExpanded = new Set(expandedRounds);
        if (newExpanded.has(round)) {
            newExpanded.delete(round);
        } else {
            newExpanded.add(round);
        }
        setExpandedRounds(newExpanded);
    }, [expandedRounds]);

    const normalizeGame = useCallback((game) => {
        if(tournament.total_teams >= 7) {
            return {
                id: game.id,
                team_home_id: game.home_id,
                team_away_id: game.away_id,
                team_home_score: game.home_score,
                team_away_score: game.away_score,
                team_home: game.home,
                team_away: game.away,
                penalty_score: game.penalty_score,
            }
        }
        return game;
    }, [tournament.total_teams]);

    const normalizedGames = useMemo(() => tournament.games.map(normalizeGame), [tournament.games, normalizeGame]);

    const { leagueGames, winnersBracket, losersBracket, standings } = splitTournamentGames(normalizedGames, {
        total_teams: tournament.total_teams,
        drawResolution: tournament.drawResolution,
    });

    const finalResults = getFinalResults(winnersBracket, losersBracket, tournament.total_teams);

    return {
        expandedRounds,
        toggleRound,
        leagueGames,
        winnersBracket,
        losersBracket,
        standings,
        positions: standings,
        finalResults
    };
}
