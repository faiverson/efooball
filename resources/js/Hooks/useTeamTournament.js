import { useMemo } from 'react';
import { calculateStandings } from '@/lib/utils';

export function useTeamTournament(tournament) {
    return useMemo(() => {
      const positions = calculateStandings(tournament.games, tournament.drawResolution);
      const champion = positions[0];

      return {positions, champion};
    }, [tournament]);
}
