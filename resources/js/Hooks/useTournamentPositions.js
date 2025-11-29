import { useMemo } from 'react';
import { splitTournamentGames, getFinalResults } from '@/lib/tournamentUtils';

const normalizeGame = (game) => ({
    id: game.id,
    team_home_id: game.home_id,
    team_away_id: game.away_id,
    team_home_score: game.home_score,
    team_away_score: game.away_score,
    team_home: game.home,
    team_away: game.away,
    penalty_score: game.penalty_score,
});

const updatePosition = (positionsByTeam, team, position) => {
    if (!positionsByTeam[team]) {
        positionsByTeam[team] = {};
    }
    if (!positionsByTeam[team][position]) {
        positionsByTeam[team][position] = 0;
    }
    positionsByTeam[team][position]++;
};

const resolveGameResult = (game, teamPositions = null) => {
    if (game.team_home_score !== game.team_away_score) {
        return game.team_home_score > game.team_away_score ? 'home' : 'away';
    }

    // For draws, use standings position if available
    if (teamPositions) {
        const homePosition = teamPositions.get(game.team_home.name);
        const awayPosition = teamPositions.get(game.team_away.name);
        return homePosition < awayPosition ? 'home' : 'away';
    }

    // If no standings available, use penalties
    if (game.penalty_score) {
        const [homePenalty, awayPenalty] = game.penalty_score.split('-').map(Number);
        return homePenalty > awayPenalty ? 'home' : 'away';
    }

    return null;
};

const calculatePositions4Games = (winnersBracket, losersBracket, teamPositions) => {
    const positions = {};
    const positionedTeams = new Set();

    // Get champion and runner-up from final (last game in winners bracket)
    const final = winnersBracket[winnersBracket.length - 1];
    if (final) {
        const winner = resolveGameResult(final);
        const champion = winner === 'home' ? final.team_home : final.team_away;
        const runnerUp = winner === 'home' ? final.team_away : final.team_home;

        positions[champion.name] = 1;
        positions[runnerUp.name] = 2;
        positionedTeams.add(champion.name);
        positionedTeams.add(runnerUp.name);
    }

    // Get third place from semi-final (first game in winners bracket)
    const semiFinal = winnersBracket[0];
    if (semiFinal) {
        // Find the team that didn't play in the final
        const finalTeams = new Set([final.team_home.name, final.team_away.name]);
        const thirdPlace = !finalTeams.has(semiFinal.team_home.name) ? semiFinal.team_home : semiFinal.team_away;
        positions[thirdPlace.name] = 3;
        positionedTeams.add(thirdPlace.name);
    }

    // Get fourth place from teamPositions
    const fourthPlace = Array.from(teamPositions.entries())
        .find(([team, position]) => position === 4 && !positionedTeams.has(team));
    if (fourthPlace) {
        positions[fourthPlace[0]] = 4;
        positionedTeams.add(fourthPlace[0]);
    }

    // Get fifth place from losers semi-final (first game in losers bracket)
    const losersSemi = losersBracket[0];
    if (losersSemi) {
        const winner = resolveGameResult(losersSemi, teamPositions);
        const fifthPlace = winner === 'home' ? losersSemi.team_home : losersSemi.team_away;
        positions[fifthPlace.name] = 5;
        positionedTeams.add(fifthPlace.name);
    }

    // Get seventh place from descent game (last game in losers bracket)
    const descentGame = losersBracket[losersBracket.length - 1];
    if (descentGame) {
        const winner = resolveGameResult(descentGame, teamPositions);
        const sixthPlace = winner === 'home' ? descentGame.team_home : descentGame.team_away;
        positions[sixthPlace.name] = 6;
        const seventhPlace = winner === 'home' ? descentGame.team_away : descentGame.team_home;
        positions[seventhPlace.name] = 7;
        positionedTeams.add(seventhPlace.name);
    }

    return positions;
};

const calculatePositions5Games = (winnersBracket, losersBracket, teamPositions) => {
    const positions = {};
    const positionedTeams = new Set();

    // Get champion and runner-up from final
    const final = winnersBracket[winnersBracket.length - 1];
    if (final) {
        const winner = resolveGameResult(final);
        const champion = winner === 'home' ? final.team_home : final.team_away;
        const runnerUp = winner === 'home' ? final.team_away : final.team_home;

        positions[champion.name] = 1;
        positions[runnerUp.name] = 2;
        positionedTeams.add(champion.name);
        positionedTeams.add(runnerUp.name);
    }

    // Get third and fourth place from semifinals
    const semifinals = winnersBracket.slice(0, 2); // Get both semifinals
    const semifinalLosers = [];

    semifinals.forEach(semi => {
        const winner = resolveGameResult(semi);
        const loser = winner === 'home' ? semi.team_away : semi.team_home;
        semifinalLosers.push({
            team: loser,
            position: teamPositions.get(loser.name)
        });
    });

    // Sort losers by standings position
    semifinalLosers.sort((a, b) => a.position - b.position);

    // Assign positions 3 and 4 based on standings
    positions[semifinalLosers[0].team.name] = 3;
    positions[semifinalLosers[1].team.name] = 4;
    positionedTeams.add(semifinalLosers[0].team.name);
    positionedTeams.add(semifinalLosers[1].team.name);

    // Get fifth place from losers semi-final
    const losersSemi = losersBracket[0];
    if (losersSemi) {
        const winner = resolveGameResult(losersSemi, teamPositions);
        const fifthPlace = winner === 'home' ? losersSemi.team_home : losersSemi.team_away;
        positions[fifthPlace.name] = 5;
        positionedTeams.add(fifthPlace.name);
    }

    // Get sixth and seventh place from losers final
    const losersFinal = losersBracket[1];
    if (losersFinal) {
        const winner = resolveGameResult(losersFinal, teamPositions);
        const sixthPlace = winner === 'home' ? losersFinal.team_home : losersFinal.team_away;
        const seventhPlace = winner === 'home' ? losersFinal.team_away : losersFinal.team_home;
        positions[sixthPlace.name] = 6;
        positions[seventhPlace.name] = 7;
        positionedTeams.add(sixthPlace.name);
        positionedTeams.add(seventhPlace.name);
    }

    return positions;
};

export function useTournamentPositions(tournaments) {
    return useMemo(() => {
        const positionsByTeam = {};

        tournaments.forEach((tournament, i) => {
            if (!tournament.games?.length) return;

            const games = [...tournament.games].map(normalizeGame).sort((a, b) => a.id - b.id);
            const { winnersBracket, losersBracket, standings } = splitTournamentGames(games, {
                total_teams: tournament.total_teams,
                drawResolution: tournament.drawResolution
            });

            // Create a Map of team names to their positions from standings
            const teamPositions = new Map();
            standings.forEach((standing, index) => {
                teamPositions.set(standing.team, index + 1);
            });

            if (tournament.total_teams === 8) {
                const positionedTeams = new Set();
                const final = winnersBracket[winnersBracket.length - 1];
                if (!final) return;

                const winner = resolveGameResult(final);
                const champion = winner === 'home' ? final.team_home : final.team_away;
                const runnerUp = winner === 'home' ? final.team_away : final.team_home;

                updatePosition(positionsByTeam, champion.name, 1);
                updatePosition(positionsByTeam, runnerUp.name, 2);
                positionedTeams.add(champion.name);
                positionedTeams.add(runnerUp.name);

                // Get semi-final teams
                const semiFinals = winnersBracket.filter(g => g.round === "Semi Finals");
                const semiTeams = new Set();
                semiFinals.forEach(game => {
                    semiTeams.add(game.team_home.name);
                    semiTeams.add(game.team_away.name);
                });
                semiTeams.delete(champion.name);
                semiTeams.delete(runnerUp.name);

                // Assign positions 3-4 to semi-final losers
                Array.from(semiTeams)
                    .map(team => ({ team, position: teamPositions.get(team) }))
                    .sort((a, b) => a.position - b.position)
                    .forEach(({ team }, index) => {
                        updatePosition(positionsByTeam, team, 3 + index);
                        positionedTeams.add(team);
                    });

                // Get quarter-final teams
                const quarterFinals = winnersBracket.filter(g => g.round === "Quarter Finals");
                const quarterTeams = new Set();
                quarterFinals.forEach(game => {
                    quarterTeams.add(game.team_home.name);
                    quarterTeams.add(game.team_away.name);
                });
                quarterTeams.forEach(team => {
                    if (positionedTeams.has(team)) quarterTeams.delete(team);
                });

                // Assign positions 5-6 to quarter-final losers
                Array.from(quarterTeams)
                    .map(team => ({ team, position: teamPositions.get(team) }))
                    .sort((a, b) => a.position - b.position)
                    .forEach(({ team }, index) => {
                        updatePosition(positionsByTeam, team, 5 + index);
                        positionedTeams.add(team);
                    });

                // Assign positions 7-8 to remaining teams
                standings
                    .filter(team => !positionedTeams.has(team.team))
                    .forEach((team, index) => {
                        updatePosition(positionsByTeam, team.team, 7 + index);
                    });
            } else if (tournament.total_teams === 7) {
                const totalPlayoffGames = winnersBracket.length + losersBracket.length;
                let positions;

                if (totalPlayoffGames === 4) {
                    positions = calculatePositions4Games(winnersBracket, losersBracket, teamPositions);
                } else if (totalPlayoffGames === 5) {
                    positions = calculatePositions5Games(winnersBracket, losersBracket, teamPositions);
                }

                // Update positionsByTeam with the calculated positions
                if (positions) {
                    Object.entries(positions).forEach(([team, position]) => {
                        updatePosition(positionsByTeam, team, position);
                    });
                }
            }
        });

        return positionsByTeam;
    }, [tournaments]);
}
