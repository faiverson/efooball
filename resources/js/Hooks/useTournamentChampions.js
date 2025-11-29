import { useMemo } from 'react';
import { splitTournamentGames, getFinalResults } from '@/lib/tournamentUtils';

const normalizeGame = (game) => ({
    id: game.id,
    team_home_id: game.home_id,
    team_away_id: game.away_id,
    team_home_score: game.home_score,
    team_away_score: game.away_score,
    team_home: game.home,
    team_away: game.away,
    penalty_score: game.penalty_score,
});

export function useTournamentChampions(tournaments) {
    return useMemo(() => {
        return tournaments
            .map(tournament => {
                const games = [...tournament.games].map(normalizeGame).sort((a, b) => a.id - b.id);
                const { winnersBracket, losersBracket } = splitTournamentGames(games, {total_teams: tournament.total_teams, drawResolution: tournament.drawResolution});
                const finalResults = getFinalResults(winnersBracket, losersBracket, tournament.total_teams);
                return {
                    tournament,
                    finalResults
                };
            })
            .filter(({ finalResults }) => finalResults?.champion)
            .reduce((acc, { tournament, finalResults }) => {
                const champion = finalResults.champion;
                const idx = acc.findIndex(item => item.team === champion.name);
                const tournamentDate = new Date(tournament.played_at);

                if (idx < 0) {
                    acc.push({
                        team: champion.name,
                        total: 1,
                        lastWin: tournamentDate
                    });
                } else {
                    acc[idx].total += 1;
                    if (tournamentDate > new Date(acc[idx].lastWin)) {
                        acc[idx].lastWin = tournamentDate;
                    }
                }
                return acc;
            }, [])
            .sort((a, b) => b.total - a.total);
    }, [tournaments]);
}
