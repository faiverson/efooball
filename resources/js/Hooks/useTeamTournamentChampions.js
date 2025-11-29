import { useMemo } from 'react';
import { calculateStandings } from '@/lib/utils';

export function useTeamTournamentChampions(tournaments) {
    return useMemo(() => {
        const champions = tournaments.reduce((acc, tournament) => {
            if (!tournament.games?.length) return acc;

            const standings = calculateStandings(tournament.games, tournament.drawResolution);
            if (standings.length > 0) {
                const champion = standings[0].team;
                if (!acc[champion]) {
                    acc[champion] = {
                        total: 0,
                        lastWin: null,
                        name: champion
                    };
                }
                acc[champion].total++;
                if (!acc[champion].lastWin || new Date(tournament.played_at) > new Date(acc[champion].lastWin)) {
                    acc[champion].lastWin = tournament.played_at;
                }
            }

            return acc;
        }, {});

        return Object.entries(champions)
            .map(([team, data]) => ({
                team,
                name: data.name,
                total: data.total,
                lastWin: data.lastWin
            }))
            .sort((a, b) => b.total - a.total)
            .slice(0, 4);
    }, [tournaments]);
}
