import React from 'react';

export default function Score({
    homeName,
    awayName,
    homeScore,
    awayScore,
    isHomeWinner = false,
    isAwayWinner = false,
    isDraw = false,
    homeColor = 'text-blue-600',
    awayColor = 'text-blue-600'
}) {
    return (
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
                <span className={`font-semibold ${isHomeWinner ? homeColor : 'text-neutral-700'}`}>
                    {homeName}
                </span>
            </div>
            <span className="font-medium text-neutral-500">
                {homeScore}-{awayScore}
            </span>
            <div className="flex items-center gap-2">
                <span className={`font-semibold ${isAwayWinner ? awayColor : 'text-neutral-700'}`}>
                    {awayName}
                </span>
            </div>
        </div>
    );
}
