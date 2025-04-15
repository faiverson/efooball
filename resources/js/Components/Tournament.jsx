import React from 'react';
import { formatDate } from '@/lib/utils';

export default function Tournament({ positions }) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-2xl">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gradient-to-r from-blue-600 to-blue-700">
                        <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider">Team</th>
                            <th className="px-4 py-2 text-center text-xs font-medium text-white uppercase tracking-wider">Points</th>
                            <th className="px-4 py-2 text-center text-xs font-medium text-white uppercase tracking-wider">Games</th>
                            <th className="px-4 py-2 text-center text-xs font-medium text-white uppercase tracking-wider">Win</th>
                            <th className="px-4 py-2 text-center text-xs font-medium text-white uppercase tracking-wider">Draw</th>
                            <th className="px-4 py-2 text-center text-xs font-medium text-white uppercase tracking-wider">Lost</th>
                            <th className="px-4 py-2 text-center text-xs font-medium text-white uppercase tracking-wider">GF</th>
                            <th className="px-4 py-2 text-center text-xs font-medium text-white uppercase tracking-wider">GC</th>
                            <th className="px-4 py-2 text-center text-xs font-medium text-white uppercase tracking-wider">DIFF</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {positions.map((item, index) => {
                            const { team, W: win, D: draw, L: lost, POINTS: points, GP, GF, GC, DIF: diff } = item;
                            const isFirst = index === 0;
                            const isLast = index === positions.length - 1;
                            const rowColor = isFirst ? 'bg-amber-100' : isLast ? 'bg-red-100' : index % 2 === 0 ? 'bg-white' : 'bg-gray-50';

                            return (
                                <tr key={`team-${team}`} className={rowColor}>
                                    <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-700">{team}</td>
                                    <td className="px-3 py-2 whitespace-nowrap text-sm text-center font-bold text-black">{points}</td>
                                    <td className="px-3 py-2 whitespace-nowrap text-sm text-center text-gray-700">{GP}</td>
                                    <td className="px-3 py-2 whitespace-nowrap text-sm text-center text-gray-700">{win}</td>
                                    <td className="px-3 py-2 whitespace-nowrap text-sm text-center text-gray-700">{draw}</td>
                                    <td className="px-3 py-2 whitespace-nowrap text-sm text-center text-gray-700">{lost}</td>
                                    <td className="px-3 py-2 whitespace-nowrap text-sm text-center text-gray-700">{GF}</td>
                                    <td className="px-3 py-2 whitespace-nowrap text-sm text-center text-gray-700">{GC}</td>
                                    <td className="px-3 py-2 whitespace-nowrap text-sm text-center text-gray-700">{diff > 0 ? `+${diff}` : diff}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
