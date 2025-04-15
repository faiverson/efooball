import React from 'react';
import { TrophyIcon } from '@heroicons/react/24/outline';
import { formatDate } from '@/lib/utils';

export default function Champions({ champions }) {
    if (!champions?.length) return null;

    return (
        <div className="mb-4">
            <div className="text-center mb-2">
                <div className="flex items-center justify-center gap-1">
                    <TrophyIcon className="w-5 h-5 text-amber-500" />
                    <h2 className="text-xl font-bold text-gray-900">Champions</h2>
                </div>
            </div>
            <div className="space-y-2">
                {champions.map((champion, index) => (
                    <div key={champion.team} className="bg-white rounded-lg shadow-sm p-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                                <TrophyIcon className={`h-4 w-4 ${index === 0 ? 'text-amber-500' : 'text-blue-500'}`} />
                                <span className="text-sm font-semibold">{champion.team}</span>
                            </div>
                            <div className="text-2xl font-bold text-neutral-700">
                                {champion.total}
                            </div>
                        </div>
                        <div className="text-xs text-neutral-500">
                            Last: {formatDate(new Date(champion.lastWin).toISOString())}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
