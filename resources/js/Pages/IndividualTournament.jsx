import React, { useState } from 'react'
import { Head } from '@inertiajs/react'
import SingleTournament from '@/Components/SingleTournament'
import SingleEightTournament from '@/Components/IndividualTournament/SingleEightTournament'
import GuestLayout from '@/Layouts/GuestLayout';
import { TrophyIcon, ChevronDownIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { formatDate } from '@/lib/utils';
import { useTournamentChampions } from '@/Hooks/useTournamentChampions';
import Champions from '@/Components/Champions';
import PositionsGrid from '@/Components/PositionsGrid';

export default function IndividualTournament({tournaments}) {
    const [expandedTournaments, setExpandedTournaments] = useState(new Set());
    const [selectedVersions, setSelectedVersions] = useState([]);

    const toggleTournament = (tournamentId) => {
        const newExpanded = new Set(expandedTournaments);
        if (newExpanded.has(tournamentId)) {
            newExpanded.delete(tournamentId);
        } else {
            newExpanded.add(tournamentId);
        }
        setExpandedTournaments(newExpanded);
    };

    // we need to sort by match against for these tournaments, we are doing this by tournament name and manually adding the tournaments that need to be sorted by match against
    const sortByMatchAgainst = ['Torneo 6th'];

    // Add drawResolution field to tournaments
    const processedTournaments = tournaments.map(tournament => ({
      ...tournament,
      drawResolution: sortByMatchAgainst.includes(tournament.name)
    }));

    // Extract unique versions
    const versions = [...new Set(processedTournaments.map(t => t.version).filter(Boolean))];

    // Filter tournaments based on selection
    const filteredTournaments = selectedVersions.length === 0 
        ? processedTournaments 
        : processedTournaments.filter(t => selectedVersions.includes(t.version));

    const champions = useTournamentChampions(filteredTournaments);

    const toggleVersion = (version) => {
        if (selectedVersions.includes(version)) {
            setSelectedVersions(selectedVersions.filter(v => v !== version));
        } else {
            setSelectedVersions([...selectedVersions, version]);
        }
    };

    return (
        <GuestLayout>
            <Head title="Individual Tournament" />
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
                                    <h1 className="text-3xl font-bold text-gray-900">Individual Tournament</h1>
                                </div>
                                <p className="text-gray-600">History of champions and tournament results</p>
                            </div>

                            <PositionsGrid tournaments={filteredTournaments} />

                            <div className="space-y-2">
                                {filteredTournaments.map(tournament => {
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
                                                            {tournament.version && (
                                                                <>
                                                                    <span className="mx-1">•</span>
                                                                    <span className="uppercase">{tournament.version.replace('_', ' ')}</span>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <ChevronDownIcon
                                                        className={`w-6 h-6 text-white transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                                                    />
                                                </div>
                                            </button>
                                            {isExpanded && (
                                                <div className="mt-2 bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-lg p-6">
                                                    {tournament.total_teams === 8 ? (
                                                        <SingleEightTournament tournament={tournament} />
                                                    ) : (
                                                        <SingleTournament tournament={tournament} />
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Filters Sidebar */}
                    <div className="w-60 flex-shrink-0 sticky top-0 h-screen overflow-y-auto pr-6 pt-6">
                        <div className="bg-white rounded-lg shadow p-4">
                            <h3 className="font-bold text-gray-900 mb-3">Versions</h3>
                            <div className="flex flex-col gap-2">
                                <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded border-b border-gray-100 pb-3 mb-1">
                                    <input
                                        type="checkbox"
                                        checked={selectedVersions.length === versions.length && versions.length > 0}
                                        onChange={() => {
                                            if (selectedVersions.length === versions.length) {
                                                setSelectedVersions([]);
                                            } else {
                                                setSelectedVersions(versions);
                                            }
                                        }}
                                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    />
                                    <span className="text-sm font-bold text-gray-900">
                                        SELECT ALL
                                    </span>
                                </label>
                                {versions.map(version => (
                                    <label key={version} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                                        <input
                                            type="checkbox"
                                            checked={selectedVersions.includes(version)}
                                            onChange={() => toggleVersion(version)}
                                            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        />
                                        <span className="text-sm font-medium text-gray-700 uppercase">
                                            {version.replace('_', ' ')}
                                        </span>
                                    </label>
                                ))}
                                {versions.length === 0 && (
                                    <p className="text-sm text-gray-500 italic">No versions available</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
