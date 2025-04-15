import { calculateStandings } from '@/lib/utils';

export const TOURNAMENT_CONFIGS = {
    7: {
        leagueGames: 21,
        description: '7-team tournament'
    },
    8: {
        leagueGames: 28,
        description: '8-team tournament'
    }
};

const getWinnerByPenalty = (game) => {
    if (game.team_home_score !== game.team_away_score) {
        return game.team_home_score > game.team_away_score ? 'home' : 'away';
    }

    if(game.penalty_score) {
      const [homePenalty, awayPenalty] = game.penalty_score.split('-').map(Number);
      return homePenalty > awayPenalty ? 'home' : 'away';
    }
    return null;
};

const handle7Team4PlayoffGames = (playoffGames, teamPositions) => {
    const winnersBracket = [];
    const losersBracket = [];

    // Winners Bracket
    const winnersSemiFinals = [];
    const winnersFinal = [];
    const winnersSemiFinalIds = new Set();

    // Semi Finals (position 2 vs 3)
    playoffGames.forEach(game => {
        const homePosition = teamPositions.get(game.team_home.name);
        const awayPosition = teamPositions.get(game.team_away.name);

        if ((homePosition === 2 && awayPosition === 3) || (homePosition === 3 && awayPosition === 2)) {
            winnersSemiFinals.push({ ...game, round: "Semifinal" });
            winnersSemiFinalIds.add(game.id);
        }
    });

    // Final (position 1 vs winner of semi-finals)
    playoffGames.forEach(game => {
        if (winnersSemiFinalIds.has(game.id)) return;

        const homePosition = teamPositions.get(game.team_home.name);
        const awayPosition = teamPositions.get(game.team_away.name);

        if (homePosition === 1 || awayPosition === 1) {
            winnersFinal.push({ ...game, round: "Final" });
        }
    });

    // Losers Bracket
    const losersSemiFinals = [];
    const losersFinal = [];
    const losersSemiFinalIds = new Set();

    // Semi Finals (position 5 vs 6)
    playoffGames.forEach(game => {
        if (winnersSemiFinalIds.has(game.id)) return;

        const homePosition = teamPositions.get(game.team_home.name);
        const awayPosition = teamPositions.get(game.team_away.name);

        if ((homePosition === 5 && awayPosition === 6) || (homePosition === 6 && awayPosition === 5)) {
            losersSemiFinals.push({ ...game, round: "Semi Final" });
            losersSemiFinalIds.add(game.id);
        }
    });

    // Final (position 7 vs winner of semi-finals)
    playoffGames.forEach(game => {
        if (winnersSemiFinalIds.has(game.id) || losersSemiFinalIds.has(game.id)) return;

        const homePosition = teamPositions.get(game.team_home.name);
        const awayPosition = teamPositions.get(game.team_away.name);

        if (homePosition === 7 || awayPosition === 7) {
            losersFinal.push({ ...game, round: "Descent" });
        }
    });

    // Combine all games in order
    winnersBracket.push(...winnersSemiFinals, ...winnersFinal);
    losersBracket.push(...losersSemiFinals, ...losersFinal);

    return { winnersBracket, losersBracket };
};

const handle7Team5PlayoffGames = (playoffGames, teamPositions) => {
    const winnersBracket = [];
    const losersBracket = [];
    const firstRoundTeams = new Set();

    // First pass: Identify first round and promotion games
    playoffGames.forEach(game => {
        const homePosition = teamPositions.get(game.team_home.name);
        const awayPosition = teamPositions.get(game.team_away.name);

        // First round: 1v4, 2v3
        if ((homePosition === 1 && awayPosition === 4) || (homePosition === 4 && awayPosition === 1) ||
            (homePosition === 2 && awayPosition === 3) || (homePosition === 3 && awayPosition === 2)) {
            winnersBracket.push({ ...game, round: "First Round" });
            firstRoundTeams.add(game.team_home.name);
            firstRoundTeams.add(game.team_away.name);
        }
        // Promotion game: 5v6
        else if ((homePosition === 5 && awayPosition === 6) || (homePosition === 6 && awayPosition === 5)) {
            losersBracket.push({ ...game, round: "Promotion" });
        }
    });

    // Second pass: Identify final and descent games
    playoffGames.forEach(game => {
        // Skip games already assigned
        if (winnersBracket.some(wb => wb.id === game.id) || losersBracket.some(lb => lb.id === game.id)) {
            return;
        }

        const homePosition = teamPositions.get(game.team_home.name);
        const awayPosition = teamPositions.get(game.team_away.name);

        // If this game involves both teams from first round, it's the final
        if (firstRoundTeams.has(game.team_home.name) && firstRoundTeams.has(game.team_away.name)) {
            winnersBracket.push({ ...game, round: "Final" });
        }
        // If this game involves position 7, it's the descent game
        else if (homePosition === 7 || awayPosition === 7) {
            losersBracket.push({ ...game, round: "Descent" });
        }
    });

    return { winnersBracket, losersBracket };
};

export const splitTournamentGames = (games, {total_teams, drawResolution}) => {
    const sortedGames = [...games].sort((a, b) => a.id - b.id);

    const leagueGames = sortedGames.slice(0, TOURNAMENT_CONFIGS[total_teams].leagueGames);
    const playoffGames = sortedGames.slice(TOURNAMENT_CONFIGS[total_teams].leagueGames);

    const standings = calculateStandings(leagueGames, drawResolution);
    const teamPositions = new Map();
    standings.forEach((team, index) => teamPositions.set(team.team, index + 1));

    let winnersBracket = [];
    let losersBracket = [];

    if (total_teams === 8) {
        // Quarter Finals
        const quarterFinals = [];
        const quarterFinalIds = new Set();
        playoffGames.forEach(game => {
            const homePosition = teamPositions.get(game.team_home.name);
            const awayPosition = teamPositions.get(game.team_away.name);

            // Check for specific quarter-final matchups
            if ((homePosition === 3 && awayPosition === 6) || (homePosition === 6 && awayPosition === 3) ||
                (homePosition === 4 && awayPosition === 5) || (homePosition === 5 && awayPosition === 4)) {
                quarterFinals.push({ ...game, round: "Quarter Finals" });
                quarterFinalIds.add(game.id);
            }
        });

        // Semi Finals
        const semiFinals = [];
        const semiFinalIds = new Set();
        playoffGames.forEach(game => {
            if (quarterFinalIds.has(game.id)) return;

            const homePosition = teamPositions.get(game.team_home.name);
            const awayPosition = teamPositions.get(game.team_away.name);

            // Check for specific semi-final matchups
            if ((homePosition === 1 && awayPosition === 4) || (homePosition === 4 && awayPosition === 1) ||
                (homePosition === 2 && awayPosition === 3) || (homePosition === 3 && awayPosition === 2)) {
                semiFinals.push({ ...game, round: "Semi Finals" });
                semiFinalIds.add(game.id);
            }
        });

        // Final is the remaining game
        const final = [];
        playoffGames.forEach(game => {
            if (!quarterFinalIds.has(game.id) && !semiFinalIds.has(game.id)) {
                final.push({ ...game, round: "Final" });
            }
        });

        // Combine all playoff games in order
        winnersBracket.push(...quarterFinals, ...semiFinals, ...final);
    } else if (total_teams === 7) {
        if (playoffGames.length === 5) {
            ({ winnersBracket, losersBracket } = handle7Team5PlayoffGames(playoffGames, teamPositions));
        } else {
            ({ winnersBracket, losersBracket } = handle7Team4PlayoffGames(playoffGames, teamPositions));
        }
    }

    winnersBracket.sort((a, b) => a.id - b.id);
    losersBracket.sort((a, b) => a.id - b.id);

    return { leagueGames, winnersBracket, losersBracket, standings };
};

export const getFinalResults = (winnersBracket, losersBracket, total_teams) => {
    if (total_teams === 8) {
        if (!winnersBracket?.length) return null;
        const final = winnersBracket[winnersBracket.length - 1];
        const winner = getWinnerByPenalty(final);
        const champion = winner === 'home' ? final.team_home : final.team_away;
        return { champion };
    }

    // For 7-team tournaments
    if (winnersBracket.length === 0 || losersBracket.length === 0) return null;

    const winnersFinal = winnersBracket[winnersBracket.length - 1];
    const losersFinal = losersBracket[losersBracket.length - 1];

    const winner = getWinnerByPenalty(winnersFinal);
    const champion = winner === 'home' ? winnersFinal.team_home : winnersFinal.team_away;

    const descentWinner = getWinnerByPenalty(losersFinal);
    const descent = descentWinner === 'home' ? losersFinal.team_away : losersFinal.team_home;

    return { champion, descent };
};
