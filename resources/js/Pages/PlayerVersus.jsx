import React, { useState } from 'react'
import axios from '@/lib/axios'
import { DateTime } from 'luxon'
import { Head } from '@inertiajs/react'
import { GameVersion, TournamentType } from '@/lib/enums'
import StatsFilters from '@/Components/StatsFilters'
import TeamDropdown from '@/Components/TeamDropdown'
import GuestLayout from '@/Layouts/GuestLayout';
import { Button, Accordion, AccordionHeader, AccordionBody, Chip } from "@material-tailwind/react";
import { TrophyIcon, CalendarIcon, ScaleIcon, TagIcon } from "@heroicons/react/24/outline";
import { parseTag } from '@/utils';

export default function PlayerVersus({ players, current_version, start_at, end_at, min_amount }) {
    const [data, setData] = useState()
    const [first_player, setFirstPlayer] = useState('-1')
    const [second_player, setSecondPlayer] = useState('-1')
    const [showErrors, setShowErrors] = useState(false)
    const [openAccordion, setOpenAccordion] = useState(1);

    const [versions, setVersions] = useState(Object.keys(GameVersion).map(item => ({active: current_version === item.toLowerCase(), name: item})))
    const [tournamentTypes, setTournamentsTypes] = useState(Object.keys(TournamentType).map(item => ({active: true, name: item})))
    const [from_at, setFromAt] = useState(DateTime.fromFormat(start_at, 'yyyy-MM-dd'))
    const [until_at, setUntilAt] = useState(DateTime.fromFormat(end_at, 'yyyy-MM-dd'))
    const [minGames, setMinGames] = useState(min_amount || 0)

    const onChangeTag = tag => {
        const newVersions = [...versions]
        const idx = newVersions.findIndex(item => item.name === tag)
        newVersions[idx].active = !newVersions[idx].active
        setVersions(newVersions)
    }

    const onChangeModality = tag => {
        const newTournamentType = [...tournamentTypes]
        const idx = newTournamentType.findIndex(item => item.name === tag)
        newTournamentType[idx].active = !newTournamentType[idx].active
        setTournamentsTypes(newTournamentType)
    }

    const onChangeMinGames = (value) => {
        setMinGames(value)
    }

    const handleChange = (ev, field) => {
      ev.preventDefault()
      let value = ev.target.value;
      const date = value ? DateTime.fromFormat(value, 'yyyy-MM-dd') : null
      if(field === 'from_at') {
        setFromAt(date)
      } else if(field === 'until_at') {
        setUntilAt(date)
      }
    }

    const onSubmit = async ev => {
        ev.preventDefault()

        if (first_player === '-1' || second_player === '-1') {
            setShowErrors(true)
            return
        }

        let filters = {
            first_player_id: first_player,
            second_player_id: second_player,
        }
        const selected_versions = versions.filter(item => item.active).map(item => item.name).join(',');
        const selected_modalities = tournamentTypes.filter(item => item.active).map(item => item.name).join(',');

        if(!!versions) {
            filters.versions = selected_versions;
        }

        if(!!tournamentTypes) {
            filters.modality = selected_modalities;
        }

        if(!!from_at) {
            filters.start_at = from_at.toFormat('yyyy-MM-dd');
        }

        if(!!until_at) {
          filters.until_at = until_at.toFormat('yyyy-MM-dd');
        }

        if(!!minGames) {
            filters.min_amount = minGames;
        }

        const response = await axios.post(`/player_versus`, filters)
            .then(res => res.data)
            .catch(error => console.log(error));

        setData(response?.data)
    }

    const handleFirstPlayer = id => {
        setFirstPlayer(id)
        setSecondPlayer('-1')
        setShowErrors(false)
    }

    const handleSecondPlayer = id => {
        setSecondPlayer(id)
        setShowErrors(false)
    }

    const handleAccordion = (value) => {
        setOpenAccordion(openAccordion === value ? 0 : value);
    };

    const groupMatchesByVersion = (matches) => {
        return matches.reduce((acc, match) => {
            const version = match.version;
            if (!acc[version]) {
                acc[version] = [];
            }
            acc[version].push(match);
            return acc;
        }, {});
    };

    const groupMatchesByDate = (matches) => {
        return matches.reduce((acc, match) => {
            const date = new Date(match.played_at).toLocaleDateString();
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(match);
            return acc;
        }, {});
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <GuestLayout>
            <Head><title>Player Head to Head</title></Head>
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
                            onSubmit={onSubmit}
                        />
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="flex flex-col items-center gap-8 p-8">
                            {/* Player Selection Section */}
                            <div className="w-full max-w-4xl bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg px-8 border border-neutral-200 relative z-10">
                                <h3 className="text-2xl font-bold text-center mb-8 text-primary-700">
                                    Select Players to Compare
                                </h3>
                                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                                    <div className="w-full md:w-1/3">
                                        <TeamDropdown
                                            name="first_player"
                                            teams={players}
                                            selected={first_player}
                                            onChange={handleFirstPlayer}
                                            label="First Player"
                                            error={showErrors && first_player === '-1'}
                                            placeholder="Select a Player"
                                        />
                                    </div>
                                    <div className="w-full md:w-1/3">
                                        <TeamDropdown
                                            name="second_player"
                                            teams={players}
                                            selected={second_player}
                                            onChange={handleSecondPlayer}
                                            label="Second Player"
                                            error={showErrors && second_player === '-1'}
                                            disabled={first_player === '-1'}
                                            placeholder="Select a Player"
                                        />
                                    </div>
                                    <div className="w-full md:w-1/4">
                                        <Button
                                            onClick={onSubmit}
                                            variant="filled"
                                            color="blue"
                                            className="w-full whitespace-nowrap"
                                            disabled={first_player === '-1' || second_player === '-1'}
                                        >
                                            Compare Players
                                        </Button>
                                    </div>
            </div>
              </div>

                            {/* Results Section */}
              {!!data &&
                                <div className="w-full max-w-4xl bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-neutral-200 mt-8 relative z-0">
                                    <div className="flex flex-col gap-6">
                                        {/* Head to Head Summary */}
                                        {data.games.length > 0 && (
                                            <div className="flex flex-col items-center gap-4">
                                                <div className="flex items-center gap-2 text-teal-600">
                                                    <TrophyIcon className="h-6 w-6" />
                                                    <h4 className="text-xl font-semibold">Head to Head Summary</h4>
                                                </div>
                                                <div className="flex items-center gap-4 text-xl">
                                                    <span className="font-bold text-teal-700">{data.first_player.name}</span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="px-4 py-2 bg-teal-50 rounded-full text-teal-700 font-medium">
                                                            {`${data.totals.first_player_win}-${data.totals.draw}-${data.totals.first_player_lost}`}
                                                        </span>
                                                        <span className="text-neutral-500 text-sm">(W-D-L)</span>
                                                    </div>
                                                    <span className="font-bold text-teal-700">{data.second_player.name}</span>
                                                </div>
                                                <div className="w-full flex flex-col items-start text-neutral-600 text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <TagIcon className="h-4 w-4 mt-0.5 text-teal-500" />
                                                        <span>Versions:</span>
                                                    </div>
                                                    <div className="flex flex-wrap gap-2 mt-2">
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
                                        )}

                                        {/* Match History */}
                                        {data.games.length > 0 && (
                                            <div className="flex items-center gap-2 text-blue-600">
                                                <CalendarIcon className="h-6 w-6" />
                                                <h4 className="text-xl font-semibold">Match History</h4>
                                                <span className="text-sm text-blue-500 font-semibold">
                                                    ({data.games.length} matches)
                                                </span>
                                            </div>
                                        )}
                                        {data.games.length > 0 ? (
                                            <div className="flex flex-col gap-4">
                                                <div className="flex flex-col gap-2">
                                                    {Object.entries(groupMatchesByVersion(data.games)).map(([version, matches], index) => (
                                                        <Accordion
                                                            key={version}
                                                            open={openAccordion === index + 1}
                                                            className="border border-neutral-200 rounded-lg overflow-hidden"
                                                        >
                                                            <AccordionHeader
                                                                onClick={() => handleAccordion(index + 1)}
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
                                                                                const {player_home_score, player_away_score, played_at} = match
                                                                                const isFirstPlayerWin = player_home_score > player_away_score
                                                                                const isDraw = player_home_score === player_away_score

                      return (
                                                                                    <div
                                                                                        key={i}
                                                                                        className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors"
                                                                                    >
                                                                                        <div className="flex items-center gap-4">
                                                                                            <div className="flex items-center gap-2">
                                                                                                <span className={`font-semibold ${isFirstPlayerWin ? 'text-blue-600' : 'text-neutral-700'}`}>
                                                                                                    {data.first_player.name}
                                                                                                </span>
                                                                                                <span className="text-neutral-500">{player_home_score}</span>
                                                                                            </div>
                                                                                            <ScaleIcon className="h-4 w-4 text-neutral-400" />
                                                                                            <div className="flex items-center gap-2">
                                                                                                <span className="text-neutral-500">{player_away_score}</span>
                                                                                                <span className={`font-semibold ${!isFirstPlayerWin && !isDraw ? 'text-blue-600' : 'text-neutral-700'}`}>
                                                                                                    {data.second_player.name}
                                                                                                </span>
                                                                                            </div>
                                                                                        </div>
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
                                            </div>
                                        ) : (
                                            <div className="text-center py-8">
                                                <div className="flex flex-col items-center gap-2 text-neutral-600">
                                                    <ScaleIcon className="h-8 w-8" />
                                                    <p className="text-lg">No matches between {data.first_player.name} and {data.second_player.name}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                    }
                  </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
