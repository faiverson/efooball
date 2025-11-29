import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Score from '@/Components/Score';
import { useColor } from '@/Hooks/useColor';

export default function TournamentRound({ games, round, color, isExpanded, onToggle }) {
    const { getColor } = useColor();
    if (games.length === 0) return null;

    const groupedGames = groupGamesByRound(games);

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <button
                onClick={() => onToggle(round)}
                className={`w-full p-3 text-left flex items-center justify-between ${getColor(color, ['bg'])} text-white rounded-t-lg`}
            >
                <span className="font-bold truncate">{round}</span>
                <ChevronDownIcon className={`h-5 w-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </button>
            {isExpanded && (
                <div className="p-4 space-y-4">
                    {Object.entries(groupedGames).map(([roundName, roundGames]) => (
                        <div key={roundName} className="flex flex-col gap-2">
                            <div className="flex items-center justify-end gap-2 text-neutral-500 text-sm">
                                <span>{roundName}</span>
                            </div>
                            <div className="bg-neutral-100 rounded-lg px-2 py-1 hover:bg-neutral-200">
                                {roundGames.map((game) => (
                                    <div key={game.id} className="flex items-center justify-between w-full">
                                            <Score

                                                homeName={game.team_home.name}
                                                awayName={game.team_away.name}
                                                homeScore={game.team_home_score}
                                                awayScore={game.team_away_score}
                                                penalty={game.penalty_score}
                                            />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function groupGamesByRound(games) {
    const rounds = {};
    games.forEach(game => {
        if (!rounds[game.round]) {
            rounds[game.round] = [];
        }
        rounds[game.round].push(game);
    });
    return rounds;
}
