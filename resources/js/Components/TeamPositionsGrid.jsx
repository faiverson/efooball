import React, { useState } from 'react';
import { calculateStandings } from '@/lib/utils';

export default function TeamPositionsGrid({ tournaments }) {
    const [showAllTeams, setShowAllTeams] = useState(false);

    // Calculate positions for each tournament
    const positions = tournaments.reduce((acc, tournament) => {
        if (!tournament.games?.length) return acc;

        const standings = calculateStandings(tournament.games, tournament.drawResolution);

        standings.forEach((team, index) => {
            if (!acc[team.team]) {
                acc[team.team] = { 1: 0, 2: 0, 3: 0, 4: 0 };
            }
            if (index < 4) {
                acc[team.team][index + 1] = (acc[team.team][index + 1] || 0) + 1;
            }
        });

        return acc;
    }, {});

    const teams = Object.keys(positions).sort((a, b) => {
        const aWins = positions[a][1] || 0;
        const bWins = positions[b][1] || 0;
        return bWins - aWins;
    });

    // Filter teams based on checkbox state
    const displayedTeams = showAllTeams ? teams : teams.slice(0, 4);
    const positionsList = [1, 2, 3, 4];

    if (!teams.length) return null;

    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Positions by Team</h2>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="showAllTeams"
                        checked={showAllTeams}
                        onChange={(e) => setShowAllTeams(e.target.checked)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="showAllTeams" className="ml-2 block text-sm text-gray-900">
                        Show all teams
                    </label>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
                            {positionsList.map(pos => (
                                <th key={pos} className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {pos}º
                                </th>
                            ))}
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Missing
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Total
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {displayedTeams.map(team => {
                            const teamPositions = positions[team];
                            const totalTournaments = Object.values(teamPositions).reduce((sum, count) => sum + count, 0);
                            const missingTournaments = tournaments.length - totalTournaments;
                            return (
                                <tr key={team}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{team}</td>
                                    {positionsList.map(pos => (
                                        <td key={pos} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                            {teamPositions[pos] || '-'}
                                        </td>
                                    ))}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500 text-center">
                                        {missingTournaments}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                                        {totalTournaments}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
