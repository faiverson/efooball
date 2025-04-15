import React from 'react';

export default function Score({
    homeName,
    awayName,
    homeScore,
    awayScore,
    homeColor = 'blue',
    awayColor = 'blue',
    penalty,
    tournamentType
}) {
    let isHomeWinner = homeScore > awayScore;
    let isAwayWinner = awayScore > homeScore;
    if(penalty) {
      const [homePenalty, awayPenalty] = penalty.split('-').map(Number);
      if(homePenalty > awayPenalty) {
        isHomeWinner = true;
      } else {
        isAwayWinner = true;
      }
    }

    return (
        <div className="flex flex-col w-full py-0.5">
            <div className="flex items-center justify-between">
                <div className="flex-1 text-right">
                    <span className={`font-semibold ${isHomeWinner ? `text-${homeColor}-500` : 'text-neutral-700'}`}>
                        {homeName}
                    </span>
                </div>
                <div className="px-2 py-0.5">
                    <span className="px-3 py-0.5 bg-neutral-300 rounded-lg text-black font-bold">
                        {homeScore}-{awayScore}
                    </span>
                </div>
                <div className="flex-1">
                    <span className={`font-semibold ${isAwayWinner ? `text-${awayColor}-500` : 'text-neutral-700'}`}>
                        {awayName}
                    </span>
                </div>
            </div>
            {penalty && (
                <span className="text-xs text-neutral-500 text-center">
                    ({penalty})
                </span>
            )}
            {tournamentType && (
              <>
                {penalty && <br />}
                <span className="text-xs text-neutral-500 text-center">
                    {tournamentType}
                </span>
              </>
            )}
        </div>
    );
}
