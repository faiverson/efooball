import React from 'react';
import Tournament from './Tournament';
import LeagueGames from './IndividualTournament/LeagueGames';
import TournamentRound from './IndividualTournament/TournamentRound';
import { TrophyIcon, FaceFrownIcon } from '@heroicons/react/24/outline';
import { useTournament } from '@/Hooks/useTournament';

export default function SingleTournament({ tournament }) {
    const {
        expandedRounds,
        toggleRound,
        leagueGames,
        winnersBracket,
        losersBracket,
        positions,
        finalResults
    } = useTournament(tournament);

    return (
        <div className="space-y-8">
            <div className='flex gap-8'>
                <div className="w-2/3">
                    <Tournament positions={positions} />
                </div>
                {finalResults && (
                    <div className="flex flex-col gap-6 w-1/3">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
                            <div className="p-2 bg-amber-500">
                                <h2 className="text-xl font-bold text-white">Champion</h2>
                            </div>
                            <div className="p-4 text-2xl font-bold text-amber-600 flex-1 flex items-center justify-center gap-2">
                                <TrophyIcon className="h-8 w-8" />
                                {finalResults.champion.name}
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
                            <div className="p-3 bg-red-600">
                                <h2 className="text-2xl font-bold text-white">Descent</h2>
                            </div>
                            <div className="p-4 text-3xl font-bold text-red-600 flex-1 flex items-center justify-center gap-2">
                                <FaceFrownIcon className="h-8 w-8" />
                                {finalResults.descent.name}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {finalResults && (
                <div className="flex gap-8 mt-8">
                    <div className="w-1/3">
                        <TournamentRound
                            games={winnersBracket}
                            round="Winners Bracket"
                            color="amber"
                            isExpanded={expandedRounds.has('Winners Bracket')}
                            onToggle={toggleRound}
                        />
                    </div>
                    <div className="w-1/3">
                        <TournamentRound
                            games={losersBracket}
                            round="Losers Bracket"
                            color="red"
                            isExpanded={expandedRounds.has('Losers Bracket')}
                            onToggle={toggleRound}
                        />
                    </div>
                    <div className="w-1/3">
                        <LeagueGames leagueGames={leagueGames} total_teams={7} />
                    </div>
                </div>
            )}
        </div>
    );
}
