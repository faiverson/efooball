import React from 'react';
import { useColor } from '@/Hooks/useColor';

export default function HeadSummary({
    homeTeam,
    awayTeam,
    homeColor = 'teal',
    awayColor = 'teal',
    homeScore,
    awayScore,
    draw
}) {
    const { getColor } = useColor();

    return (
        <div className="flex items-center gap-4 text-xl">
            <span className={`font-bold ${getColor(homeColor, ['text'])}`}>
                {homeTeam}
            </span>
            <div className="flex items-center gap-2">
                <span className={`px-4 py-2 ${getColor(homeColor, ['bg', 'text'])} rounded-full font-medium`}>
                    {`${homeScore}-${draw}-${awayScore}`}
                </span>
            </div>
            <span className={`font-bold ${getColor(awayColor, ['text'])}`}>
                {awayTeam}
            </span>
        </div>
    );
}
