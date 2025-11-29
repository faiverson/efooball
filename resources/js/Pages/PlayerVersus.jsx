import React, { useState } from 'react'
import { Head } from '@inertiajs/react'
import StatsFilters from '@/Components/StatsFilters'
import GuestLayout from '@/Layouts/GuestLayout';
import { Accordion, AccordionHeader, AccordionBody, Chip, Tabs, TabsHeader, Tab } from "@material-tailwind/react";
import { useStatsFilterForm } from '@/Hooks/useStatsFilterForm';
import { TrophyIcon, CalendarIcon, ScaleIcon, TagIcon } from "@heroicons/react/24/outline";
import { parseTag, groupMatchesByVersion, groupMatchesByDate, formatDate } from '@/lib/utils';
import SelectionSection from '@/Components/SelectionSection';
import Score from '@/Components/Score';
import HeadSummary from '@/Components/HeadSummary';
import TagSummary from '@/Components/TagSummary';

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
                                                <HeadSummary
                            homeTeam={stats.first_player.name}
                            awayTeam={stats.second_player.name}
                            homeColor="teal"
                            awayColor="teal"
                            homeScore={stats.team_stats?.totals.first_player_win}
                            awayScore={stats.team_stats?.totals.first_player_lost}
                            draw={stats.team_stats?.totals.draw}
                        />
                                                    <div className="text-sm text-neutral-500">Team Matches</div>
                                                </div>
                                                <div className="flex flex-col items-center gap-2">
                                                <HeadSummary
                            homeTeam={stats.first_player.name}
                            awayTeam={stats.second_player.name}
                            homeColor="purple"
                            awayColor="purple"
                            homeScore={stats.single_stats?.totals.first_player_win}
                            awayScore={stats.single_stats?.totals.first_player_lost}
                            draw={stats.single_stats?.totals.draw}
                        />
                                                    <div className="text-sm text-neutral-500">Single Matches</div>
                                                </div>
                                            </div>
                                            <TagSummary
                            versions={versions}
                            color="blue"
                            label="Versions"
                            icon={true}
                          />

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
                                                                                <div className="bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors">
                                                                                {dateMatches.map((match, i) => {
                                                                                    const {id, home_id, away_id, home_team_name, team_home_score, away_team_name, team_away_score, type} = match
                                                                                    const team_home = home_id === stats.first_player.id ? home_team_name : away_team_name;
                                                                                    const team_away = away_id === stats.first_player.id ? away_team_name : home_team_name;

                                                                                    return (
                                                                                        <div
                                                                                            key={id}
                                                                                            className="flex items-center justify-between px-3 py-0.5"
                                                                                        >
                                                                                            <Score
                                                                                                homeName={team_home}
                                                                                                awayName={team_away}
                                                                                                homeScore={team_home_score}
                                                                                                awayScore={team_away_score}
                                                                                                tournamentType={type}
                                                                                            />
                                                                                        </div>
                                                                                    )
                                                                                  })}
                                                                                  </div>
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

                                                                                <div className="bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors">
                                                                                {dateMatches.map((match, i) => {
                                                                                    const {id, home_id, away_id, home_score, away_score, type, penalty_score} = match
                                                                                    const team_home = home_id === stats.first_player.id ? stats.first_player.name : stats.second_player.name;
                                                                                    const team_away = away_id === stats.first_player.id ? stats.first_player.name : stats.second_player.name;

                                                                                    return (
                                                                                        <div
                                                                                            key={id}
                                                                                            className="flex items-center justify-between px-3 py-0.5"
                                                                                        >
                                                                                            <Score
                                                                                                homeName={team_home}
                                                                                                awayName={team_away}
                                                                                                homeScore={home_score}
                                                                                                awayScore={away_score}
                                                                                                homeColor="purple"
                                                                                                awayColor="purple"
                                                                                                tournamentType={type}
                                                                                                penalty={penalty_score}
                                                                                            />
                                                                                        </div>
                                                                                    )
                                                                                })}
                                                                                </div>
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
