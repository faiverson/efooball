import { useState } from 'react';
import { Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Score from '@/Components/Score';

export default function LeagueGames({ leagueGames, total_teams }) {
    const [isOpen, setIsOpen] = useState(false);
    const groupedGames = groupMatchesByRound(leagueGames, total_teams);

    return (
        <Accordion
            open={isOpen}
            className="border border-neutral-200 rounded-lg overflow-hidden"
        >
            <AccordionHeader
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 bg-blue-600"
            >
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold text-white">Games</h2>
                        <span className="text-xs bg-blue-50 text-blue-500 px-1.5 py-0.5 rounded-full">
                            {leagueGames.length} matches
                        </span>
                    </div>
                    <ChevronDownIcon
                        className={`w-6 h-6 text-white transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                </div>
            </AccordionHeader>
            <AccordionBody>
                <div className="flex flex-col gap-4 px-4">
                    {Object.entries(groupedGames).map(([round, games]) => (
                        <div key={round} className="flex flex-col gap-2">
                            <div className="flex items-center justify-end gap-2 text-blue-600 text-sm italic">
                                <span>Round {round}</span>
                            </div>
                            <div className="bg-blue-50 rounded-lg px-2 py-1 hover:bg-blue-100">
                                {games.map((game) =>  (
                                                <Score
                                                    key={game.id}
                                                    homeName={game.team_home.name}
                                                    awayName={game.team_away.name}
                                                    homeScore={game.team_home_score}
                                                    awayScore={game.team_away_score}
                                                />
                                    )
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </AccordionBody>
        </Accordion>
    );
}

function groupMatchesByRound(games, total_teams) {
    const rounds = {};
    const gamesPerRound = Math.floor(total_teams / 2);
    const totalRounds = total_teams === 7 ? total_teams : total_teams - 1;

    // Initialize all rounds
    for (let i = 1; i <= totalRounds; i++) {
        rounds[i] = [];
    }

    // Sort games by ID to ensure correct order
    const sortedGames = [...games].sort((a, b) => a.id - b.id);

    // Distribute games into rounds
    sortedGames.forEach((game, index) => {
        const round = Math.floor(index / gamesPerRound) + 1;
        if (round <= totalRounds) { // Ensure we don't exceed total rounds
            rounds[round].push(game);
        }
    });

    return rounds;
}
