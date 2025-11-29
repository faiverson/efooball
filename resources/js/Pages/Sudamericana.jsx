import React, { useState } from 'react'
import { Head } from '@inertiajs/react'
import GuestLayout from '@/Layouts/GuestLayout';
import { TrophyIcon, ChevronDownIcon, CalendarIcon } from '@heroicons/react/24/outline'
import { formatDate } from '@/lib/utils';
import { useTeamTournamentChampions } from '@/Hooks/useTeamTournamentChampions'
import Champions from '@/Components/Champions'
import TeamTournament from '@/Components/TeamTournament'
import TeamPositionsGrid from '@/Components/TeamPositionsGrid';

export default function Sudamericana({tournaments}) {
    const [expandedTournaments, setExpandedTournaments] = useState(new Set());

    // we need to sort by match against for these tournaments, we are doing this by tournament name and manually adding the tournaments that need to be sorted by match against
    const sortByMatchAgainst = [];

    // Add drawResolution field to tournaments
    tournaments = tournaments.map(tournament => ({
      ...tournament,
      drawResolution: sortByMatchAgainst.includes(tournament.name)
    }));

    const champions = useTeamTournamentChampions(tournaments);

    const toggleTournament = (tournamentId) => {
        const newExpanded = new Set(expandedTournaments);
        if (newExpanded.has(tournamentId)) {
            newExpanded.delete(tournamentId);
        } else {
            newExpanded.add(tournamentId);
        }
        setExpandedTournaments(newExpanded);
    };

    return (
        <GuestLayout>
            <Head title="Sudamericana" />
            <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 py-3">
                <div className="flex">
                    {/* Champions Sidebar */}
                    <div className="w-60 flex-shrink-0 sticky top-0 h-screen overflow-y-auto pl-6">
                        <Champions champions={champions} />
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-3">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <TrophyIcon className="w-8 h-8 text-gray-900" />
                                    <h1 className="text-3xl font-bold text-gray-900">Sudamericana</h1>
                                </div>
                                <p className="text-gray-600">History of champions and tournament results</p>
                            </div>

                            <TeamPositionsGrid tournaments={tournaments} />

                            <div className="space-y-2">
                                {tournaments.map(tournament => {
                                    const isExpanded = expandedTournaments.has(tournament.id);
                                    return (
                                        <div key={tournament.id} className="w-full">
                                            <button
                                                onClick={() => toggleTournament(tournament.id)}
                                                className="w-full bg-white rounded-lg shadow-md overflow-hidden"
                                            >
                                                <div className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-between">
                                                    <div className="text-left">
                                                        <h2 className="text-2xl font-bold text-white">{tournament.name}</h2>
                                                        <div className="flex items-center gap-1 text-sm text-indigo-100">
                                                            <CalendarIcon className="w-4 h-4" />
                                                            <span>{formatDate(tournament.played_at)}</span>
                                                        </div>
                                                    </div>
                                                    <ChevronDownIcon
                                                        className={`w-6 h-6 text-white transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                                                    />
                                                </div>
                                            </button>
                                            {isExpanded && (
                                                <div className="mt-2 bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-lg p-6">
                                                    <TeamTournament tournament={tournament} />
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
