import React from 'react';
import { useTournamentPositions } from '@/Hooks/useTournamentPositions';

export default function PositionsGrid({ tournaments }) {
    const positions = useTournamentPositions(tournaments);
    const teams = Object.keys(positions).sort((a, b) => {
        const aWins = positions[a][1] || 0;
        const bWins = positions[b][1] || 0;
        return bWins - aWins;
    });
    const positionsList = [1, 2, 3, 4, 5, 6, 7, 8];

    if (!teams.length) return null;

    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h2 className="text-xl font-bold mb-4">Positions by Team</h2>
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
                        {teams.map(team => {
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
