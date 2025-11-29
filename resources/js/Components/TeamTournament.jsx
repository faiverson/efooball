import React from 'react';
import { formatDate } from '@/lib/utils';
import { CalendarIcon, TrophyIcon, FaceFrownIcon } from '@heroicons/react/24/outline';
import { useTeamTournament } from '@/Hooks/useTeamTournament';
import Tournament from './Tournament';

export default function TeamTournament({ tournament }) {
    const {positions, champion} = useTeamTournament(tournament);

    return (
        <div className="space-y-8">
            <div className='flex gap-8'>
                <div className="w-2/3">

                    <Tournament positions={positions} />
                </div>
                    <div className="flex flex-col gap-6 w-1/3">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
                            <div className="p-2 bg-amber-500">
                                <h2 className="text-xl font-bold text-white">Champion</h2>
                            </div>
                            <div className="p-4 text-2xl font-bold text-amber-600 flex-1 flex items-center justify-center gap-2">
                                <TrophyIcon className="h-8 w-8" />
                                {champion?.team}
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    );
}
