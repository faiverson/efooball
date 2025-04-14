import React, { useState } from 'react'
import { Head } from '@inertiajs/react'
import StatsFilters from '@/Components/StatsFilters'
import GuestLayout from '@/Layouts/GuestLayout';
import { Accordion, AccordionHeader, AccordionBody, Chip, Tabs, TabsHeader, Tab } from "@material-tailwind/react";
import { useStatsFilterForm } from '@/Hooks/useStatsFilterForm';
import { TrophyIcon, CalendarIcon, ScaleIcon, TagIcon } from "@heroicons/react/24/outline";
import { parseTag, groupMatchesByVersion, groupMatchesByDate, formatDate } from '@/utils/index';
import SelectionSection from '@/Components/SelectionSection';
import Score from '@/Components/Score';

export default function PlayerVersus({ players, current_version, start_at, end_at, min_amount }) {
    const [first_player, setFirstPlayer] = useState('-1')
    const [second_player, setSecondPlayer] = useState('-1')
    const [showErrors, setShowErrors] = useState(false)
    const [openAccordion, setOpenAccordion] = useState(1);
    const [availablePlayers, setAvailablePlayers] = useState([]);
    const [activeTab, setActiveTab] = useState('team');

    // Format players data to match the expected structure
    const formattedPlayers = players.map(player => ({
        ...player,
        id: String(player.id)
    }));

    const {
        stats,
        versions,
        tournamentTypes,
        minGames,
        from_at,
        until_at,
        onChangeTag,
        onChangeModality,
        onChangeMinGames,
        handleChange,
        onSubmit
    } = useStatsFilterForm({
        baseUrl: 'player_versus',
        current_version,
        start_at,
        end_at,
        min_amount
    });

    const handleSubmit = (ev) => {
        ev.preventDefault();

        if (first_player === '-1' || second_player === '-1') {
            setShowErrors(true);
            return;
        }

        const playerFilters = `first_player_id=${first_player}&second_player_id=${second_player}`;
        onSubmit(ev, playerFilters);
    };

    const handleFirstPlayer = id => {
        setFirstPlayer(id)
        setSecondPlayer('-1')
        setShowErrors(false)
        // Filter out the selected first player from available players
        setAvailablePlayers(formattedPlayers.filter(player => player.id !== id))
    }

    const handleSecondPlayer = id => {
        setSecondPlayer(id)
        setShowErrors(false)
    }

    const handleAccordion = (value) => {
        setOpenAccordion(openAccordion === value ? 0 : value);
    };

    console.log('stats', stats)
    console.log('Single matches data:', stats?.single_stats?.games);

    return (
        <GuestLayout>
            <Head><title>Player Versus</title></Head>
            <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 py-2">
                <div className="flex">
                    {/* Sidebar with Filters */}
                    <div className="w-72 flex-shrink-0 sticky top-0 h-screen overflow-y-auto">
                        <StatsFilters
                            versions={versions}
                            minGames={minGames}
                            from_at={from_at}
                            until_at={until_at}
                            tournamentTypes={tournamentTypes}
                            onChangeTag={onChangeTag}
                            onChangeMinGames={onChangeMinGames}
                            handleChange={handleChange}
                            onChangeModality={onChangeModality}
                            onSubmit={handleSubmit}
                        />
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="flex flex-col items-center gap-4 p-4">
                            <SelectionSection
                                type="player"
                                local_teams={formattedPlayers}
                                away_teams={first_player === '-1' ? formattedPlayers : availablePlayers}
                                first_team={first_player}
                                second_team={second_player}
                                showErrors={showErrors}
                                handleLocalTeam={handleFirstPlayer}
                                handleAwayTeam={handleSecondPlayer}
                                handleSubmit={handleSubmit}
                            />

                            {/* Results Section */}
                            { stats?.first_player && stats?.second_player && (
                                <div className="w-full max-w-4xl bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg px-8 py-4 border border-neutral-200 mt-2 relative z-0">
                                    <div className="flex flex-col gap-6">
                                        {/* Head to Head Summary */}
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="flex items-center gap-2 text-teal-600">
                                                <TrophyIcon className="h-6 w-6" />
                                                <h4 className="text-xl font-semibold">Head to Head Summary</h4>
                                            </div>
                                            <div className="flex gap-24">
                                                <div className="flex flex-col items-center gap-2">
                                                    <div className="flex items-center gap-4 text-xl">
                                                        <span className="font-bold text-teal-700">{stats.first_player.name}</span>
                                                        <div className="flex items-center gap-2">
                                                            <span className="px-4 py-2 bg-teal-50 rounded-full text-teal-700 font-medium">
                                                                {`${stats.team_stats?.totals?.first_player_win || 0}-${stats.team_stats?.totals?.draw || 0}-${stats.team_stats?.totals?.first_player_lost || 0}`}
                                                            </span>
                                                        </div>
                                                        <span className="font-bold text-teal-700">{stats.second_player.name}</span>
                                                    </div>
                                                    <div className="text-sm text-neutral-500">Team Matches</div>
                                                </div>
                                                <div className="flex flex-col items-center gap-2">
                                                    <div className="flex items-center gap-4 text-xl">
                                                        <span className="font-bold text-purple-700">{stats.first_player.name}</span>
                                                        <div className="flex items-center gap-2">
                                                            <span className="px-4 py-2 bg-purple-50 rounded-full text-purple-700 font-medium">
                                                                {`${stats.single_stats?.totals?.first_player_win || 0}-${stats.single_stats?.totals?.draw || 0}-${stats.single_stats?.totals?.first_player_lost || 0}`}
                                                            </span>
                                                        </div>
                                                        <span className="font-bold text-purple-700">{stats.second_player.name}</span>
                                                    </div>
                                                    <div className="text-sm text-neutral-500">Single Matches</div>
                                                </div>
                                            </div>
                                            <div className="w-full flex items-center gap-2 text-neutral-600 text-sm">
                                                <TagIcon className="h-4 w-4 mt-0.5 text-teal-500" />
                                                <span>Versions:</span>
                                                <div className="flex flex-wrap gap-2">
                                                    {versions.filter(v => v.active).map((v, index) => (
                                                        <Chip
                                                            key={index}
                                                            value={parseTag(v.name)}
                                                            className="bg-teal-50 text-teal-600"
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Matches Tabs */}
                                        <div className="flex border-b border-neutral-200">
                                            <button
                                                onClick={() => setActiveTab('team')}
                                                className={`flex-1 py-4 px-6 text-center ${
                                                    activeTab === 'team'
                                                        ? 'border-b-2 border-blue-600 text-blue-600'
                                                        : 'text-neutral-600'
                                                }`}
                                            >
                                                <div className="flex items-center justify-center gap-2">
                                                    <CalendarIcon className="h-6 w-6" />
                                                    <h4 className="text-xl font-semibold">Team Matches</h4>
                                                    <span className="text-sm font-semibold">
                                                        ({stats.team_stats?.games?.length || 0} matches)
                                                    </span>
                                                </div>
                                            </button>
                                            <button
                                                onClick={() => setActiveTab('single')}
                                                className={`flex-1 py-4 px-6 text-center ${
                                                    activeTab === 'single'
                                                        ? 'border-b-2 border-purple-600 text-purple-600'
                                                        : 'text-neutral-600'
                                                }`}
                                            >
                                                <div className="flex items-center justify-center gap-2">
                                                    <CalendarIcon className="h-6 w-6" />
                                                    <h4 className="text-xl font-semibold">Single Matches</h4>
                                                    <span className="text-sm font-semibold">
                                                        ({stats.single_stats?.games?.length || 0} matches)
                                                    </span>
                                                </div>
                                            </button>
                                        </div>

                                        {/* Team Matches */}
                                        {activeTab === 'team' && (
                                            <div className="flex flex-col gap-4">
                                                {stats.team_stats?.games?.length > 0 ? (
                                                    <div className="flex flex-col gap-2">
                                                        {Object.entries(groupMatchesByVersion(stats.team_stats.games)).map(([version, matches], index) => (
                                                            <Accordion
                                                                key={`team-${version}`}
                                                                open={openAccordion === `team-${index + 1}`}
                                                                className="border border-neutral-200 rounded-lg overflow-hidden"
                                                            >
                                                                <AccordionHeader
                                                                    onClick={() => handleAccordion(`team-${index + 1}`)}
                                                                    className="bg-blue-50 px-4 py-3 hover:bg-blue-100"
                                                                >
                                                                    <div className="flex items-center gap-2 text-blue-700">
                                                                        <TagIcon className="h-5 w-5" />
                                                                        <span className="font-semibold uppercase">{parseTag(version)}</span>
                                                                        <span className="text-sm text-blue-500 font-semibold ml-2">
                                                                            ({matches.length} matches)
                                                                        </span>
                                                                    </div>
                                                                </AccordionHeader>
                                                                <AccordionBody className="px-0">
                                                                    <div className="grid gap-2 p-4">
                                                                        {Object.entries(groupMatchesByDate(matches)).map(([date, dateMatches]) => (
                                                                            <div key={date} className="flex flex-col gap-2">
                                                                                <div className="flex items-center justify-end gap-2 text-neutral-500 text-sm">
                                                                                    <span>{formatDate(date)}</span>
                                                                                    <CalendarIcon className="h-4 w-4" />
                                                                                    {dateMatches.length > 1 && (
                                                                                        <span className="text-xs bg-blue-50 text-blue-500 px-1.5 py-0.5 rounded-full">
                                                                                            {dateMatches.length} matches
                                                                                        </span>
                                                                                    )}
                                                                                </div>
                                                                                {dateMatches.map((match, i) => {
                                                                                    const {home_team_name, team_home_score, away_team_name, team_away_score} = match
                                                                                    const isFirstPlayerWin = team_home_score > team_away_score
                                                                                    const isDraw = team_home_score === team_away_score

                                                                                    return (
                                                                                        <div
                                                                                            key={i}
                                                                                            className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors"
                                                                                        >
                                                                                            <Score
                                                                                                homeName={home_team_name}
                                                                                                awayName={away_team_name}
                                                                                                homeScore={team_home_score}
                                                                                                awayScore={team_away_score}
                                                                                                isHomeWinner={isFirstPlayerWin}
                                                                                                isAwayWinner={!isFirstPlayerWin && !isDraw}
                                                                                                isDraw={isDraw}
                                                                                                homeColor="text-blue-600"
                                                                                                awayColor="text-blue-600"
                                                                                            />
                                                                                        </div>
                                                                                    )
                                                                                })}
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </AccordionBody>
                                                            </Accordion>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="text-center py-8">
                                                        <div className="flex flex-col items-center gap-2 text-neutral-600">
                                                            <ScaleIcon className="h-8 w-8" />
                                                            <p className="text-lg">No team matches between {stats.first_player.name} and {stats.second_player.name}</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* Single Matches */}
                                        {activeTab === 'single' && (
                                            <div className="flex flex-col gap-4">
                                                {stats.single_stats?.games?.length > 0 ? (
                                                    <div className="flex flex-col gap-2">
                                                        {Object.entries(groupMatchesByVersion(stats.single_stats.games)).map(([version, matches], index) => (
                                                            <Accordion
                                                                key={`single-${version}`}
                                                                open={openAccordion === `single-${index + 1}`}
                                                                className="border border-neutral-200 rounded-lg overflow-hidden"
                                                            >
                                                                <AccordionHeader
                                                                    onClick={() => handleAccordion(`single-${index + 1}`)}
                                                                    className="bg-purple-50 px-4 py-3 hover:bg-purple-100"
                                                                >
                                                                    <div className="flex items-center gap-2 text-purple-700">
                                                                        <TagIcon className="h-5 w-5" />
                                                                        <span className="font-semibold uppercase">{parseTag(version)}</span>
                                                                        <span className="text-sm text-purple-500 font-semibold ml-2">
                                                                            ({matches.length} matches)
                                                                        </span>
                                                                    </div>
                                                                </AccordionHeader>
                                                                <AccordionBody className="px-0">
                                                                    <div className="grid gap-2 p-2">
                                                                        {Object.entries(groupMatchesByDate(matches)).map(([date, dateMatches]) => (
                                                                            <div key={date} className="flex flex-col gap-2">
                                                                                <div className="flex items-center justify-end gap-2 text-neutral-500 text-sm">
                                                                                    <span>{formatDate(date)}</span>
                                                                                    <CalendarIcon className="h-4 w-4" />
                                                                                    {dateMatches.length > 1 && (
                                                                                        <span className="text-xs bg-purple-50 text-purple-500 px-1.5 py-0.5 rounded-full">
                                                                                            {dateMatches.length} matches
                                                                                        </span>
                                                                                    )}
                                                                                </div>
                                                                                {dateMatches.map((match, i) => {
                                                                                    const {home_score, away_score} = match
                                                                                    const isFirstPlayerWin = home_score > away_score
                                                                                    const isDraw = home_score === away_score

                                                                                    return (
                                                                                        <div
                                                                                            key={i}
                                                                                            className="flex items-center justify-between p-2 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors"
                                                                                        >
                                                                                            <Score
                                                                                                homeName={stats.first_player.name}
                                                                                                awayName={stats.second_player.name}
                                                                                                homeScore={home_score}
                                                                                                awayScore={away_score}
                                                                                                isHomeWinner={isFirstPlayerWin}
                                                                                                isAwayWinner={!isFirstPlayerWin && !isDraw}
                                                                                                isDraw={isDraw}
                                                                                                homeColor="text-purple-600"
                                                                                                awayColor="text-purple-600"
                                                                                            />
                                                                                        </div>
                                                                                    )
                                                                                })}
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </AccordionBody>
                                                            </Accordion>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="text-center py-8">
                                                        <div className="flex flex-col items-center gap-2 text-neutral-600">
                                                            <ScaleIcon className="h-8 w-8" />
                                                            <p className="text-lg">No single matches between {stats.first_player.name} and {stats.second_player.name}</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
