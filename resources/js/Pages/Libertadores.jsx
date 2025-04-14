import React from 'react'
import { Head } from '@inertiajs/inertia-react'
import Tournament from '@/Components/Tournament'
import GuestLayout from '@/Layouts/GuestLayout';
import { TrophyIcon } from '@heroicons/react/24/outline';

export default function Libertadores({tournaments}) {
    // Filter tournaments by game type 'libertadores'
    const libertadoresTournaments = tournaments.filter(tournament =>
        tournament.game_type === 'libertadores'
    );

    const champions = (libertadoresTournaments.reduce((acc, tournament) => {
        const champ = tournament.positions[0]
        const idx = acc.findIndex(item => item.team === champ.team)
        idx < 0 ? acc.push({team: champ.team, total: 1}) : acc[idx]['total'] += 1
        return acc
    }, [])).sort( (a, b) => a.total <= b.total ? 1 : -1)

    return (
        <GuestLayout>
            <Head title="Libertadores" />
            <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Libertadores Tournament</h1>
                        <p className="text-gray-600">History of champions and tournament results</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Champions Section */}
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-neutral-200">
                            <div className="flex items-center gap-2 mb-4">
                                <TrophyIcon className="h-6 w-6 text-amber-500" />
                                <h2 className="text-xl font-semibold text-gray-900">Champions</h2>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titles</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {champions.map((champion, index) => {
                                            const {team, total} = champion;
                                            return (
                                                <tr key={team} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{team}</td>
                                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{total}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Tournaments Section */}
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-neutral-200">
                            <div className="flex items-center gap-2 mb-4">
                                <TrophyIcon className="h-6 w-6 text-amber-500" />
                                <h2 className="text-xl font-semibold text-gray-900">Tournaments</h2>
                            </div>
                            <div className="space-y-4">
                                {libertadoresTournaments.map(tournament => (
                                    <div key={tournament.name} className="bg-gray-50 rounded-lg p-4">
                                        <div className="flex justify-between items-center mb-3">
                                            <h4 className="text-lg font-semibold text-gray-900">{tournament.name}</h4>
                                            <span className="text-sm text-gray-500">Played: {tournament.played_at}</span>
                                        </div>
                                        <Tournament tournament={tournament.positions} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
