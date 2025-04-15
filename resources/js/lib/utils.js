/**
 * Format a version tag by replacing underscores with spaces
 * @param {string} name - The version name to format
 * @returns {string} The formatted version name
 */
export const parseTag = (name) => {
  return name.replace(/_/g, ' ');
};

export const groupMatchesByVersion = (matches) => {
  return matches.reduce((acc, match) => {
    const version = match.version;
    if (!acc[version]) {
      acc[version] = [];
    }
    acc[version].push(match);
    return acc;
  }, {});
};

export const groupMatchesByDate = (matches) => {
  return matches.reduce((acc, match) => {
    const date = match.played_at.split('T')[0]; // Get just the date part (YYYY-MM-DD)
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(match);
    return acc;
  }, {});
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  });
};

export const calculateStandings = (games, sortByMatchAgainst = false) => {
    const teams = new Map();

    // Initialize teams
    games.forEach(game => {
        if (!teams.has(game.team_home.name)) {
            teams.set(game.team_home.name, {
                team: game.team_home.name,
                W: 0,
                D: 0,
                L: 0,
                POINTS: 0,
                GP: 0,
                GF: 0,
                GC: 0,
                DIF: 0,
                headToHead: new Map()
            });
        }
        if (!teams.has(game.team_away.name)) {
            teams.set(game.team_away.name, {
                team: game.team_away.name,
                W: 0,
                D: 0,
                L: 0,
                POINTS: 0,
                GP: 0,
                GF: 0,
                GC: 0,
                DIF: 0,
                headToHead: new Map()
            });
        }
    });

    // Process games
    games.forEach(game => {
        const homeTeam = teams.get(game.team_home.name);
        const awayTeam = teams.get(game.team_away.name);

        // Update games played
        homeTeam.GP++;
        awayTeam.GP++;

        // Update goals
        homeTeam.GF += game.team_home_score;
        homeTeam.GC += game.team_away_score;
        awayTeam.GF += game.team_away_score;
        awayTeam.GC += game.team_home_score;

        // Update goal difference
        homeTeam.DIF = homeTeam.GF - homeTeam.GC;
        awayTeam.DIF = awayTeam.GF - awayTeam.GC;

        // Initialize head-to-head if not exists
        if (!homeTeam.headToHead.has(game.team_away.name)) {
            homeTeam.headToHead.set(game.team_away.name, { GF: 0, GC: 0, points: 0 });
        }
        if (!awayTeam.headToHead.has(game.team_home.name)) {
            awayTeam.headToHead.set(game.team_home.name, { GF: 0, GC: 0, points: 0 });
        }

        const homeH2H = homeTeam.headToHead.get(game.team_away.name);
        const awayH2H = awayTeam.headToHead.get(game.team_home.name);

        // Update head-to-head goals
        homeH2H.GF += game.team_home_score;
        homeH2H.GC += game.team_away_score;
        awayH2H.GF += game.team_away_score;
        awayH2H.GC += game.team_home_score;

        // Update results
        if (game.team_home_score > game.team_away_score) {
            homeTeam.W++;
            homeTeam.POINTS += 3;
            awayTeam.L++;
            homeH2H.points += 3;
        } else if (game.team_home_score < game.team_away_score) {
            awayTeam.W++;
            awayTeam.POINTS += 3;
            homeTeam.L++;
            awayH2H.points += 3;
        } else {
            homeTeam.D++;
            awayTeam.D++;
            homeTeam.POINTS += 1;
            awayTeam.POINTS += 1;
            homeH2H.points += 1;
            awayH2H.points += 1;
        }
    });

    return Array.from(teams.values())
        .sort((a, b) => {
            if (b.POINTS !== a.POINTS) return b.POINTS - a.POINTS;

            if (sortByMatchAgainst) {
                // Skip goal difference and go straight to head-to-head
                const aH2H = a.headToHead.get(b.team);
                const bH2H = b.headToHead.get(a.team);

                if (aH2H && bH2H) {
                    if (aH2H.points !== bH2H.points) return bH2H.points - aH2H.points;
                    const aH2HDiff = aH2H.GF - aH2H.GC;
                    const bH2HDiff = bH2H.GF - bH2H.GC;
                    if (aH2HDiff !== bH2HDiff) return bH2HDiff - aH2HDiff;
                }
            } else {
                // Use goal difference, then head-to-head if equal
                if (b.DIF !== a.DIF) return b.DIF - a.DIF;

                const aH2H = a.headToHead.get(b.team);
                const bH2H = b.headToHead.get(a.team);

                if (aH2H && bH2H) {
                    if (aH2H.points !== bH2H.points) return bH2H.points - aH2H.points;
                    const aH2HDiff = aH2H.GF - aH2H.GC;
                    const bH2HDiff = bH2H.GF - bH2H.GC;
                    if (aH2HDiff !== bH2HDiff) return bH2HDiff - aH2HDiff;
                }
            }

            return 0;
        })
        .map(({ headToHead, ...rest }) => rest);
};

