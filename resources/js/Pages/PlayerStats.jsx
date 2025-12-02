import React, { useState } from 'react'
import axios from '@/lib/axios'
import { DateTime } from 'luxon'
import { Head } from '@inertiajs/react'
import { GameVersion, TournamentType } from '@/lib/enums'
import StatsFilters from '@/Components/StatsFilters'
import GuestLayout from '@/Layouts/GuestLayout';
import { TrophyIcon, UserGroupIcon, ChartBarIcon } from '@heroicons/react/24/outline';

export default function PlayerStats({data, current_version, start_at, end_at, min_amount}) {
    const [singleStats, setSingleStats] = useState(data.single_stats ?? [])
    const [teamStats, setTeamStats] = useState(data.team_stats ?? [])
    const [versions, setVersions] = useState(Object.keys(GameVersion).map(item => ({active: current_version === item.toLowerCase(), name: item})))
    const [tournamentTypes, setTournamentsTypes] = useState(Object.keys(TournamentType).map(item => ({active: true, name: item})))
    const [minGames, setMinGames] = useState(min_amount)
    const [from_at, setFromAt] = useState(DateTime.fromFormat(start_at, 'yyyy-MM-dd'))
    const [until_at, setUntilAt] = useState(DateTime.fromFormat(end_at, 'yyyy-MM-dd'))

    const onChangeTag = tag => {
        const newVersions = [...versions]
        const idx = newVersions.findIndex(item => item.name === tag)
        newVersions[idx].active = !newVersions[idx].active
        setVersions(newVersions)
    }

    const onChangeMinGames = ev => {
        ev.preventDefault()
        setMinGames(ev.target.value)
    }

    const handleChange = (value, field) => {
        let date = null;
        if (value && value.target) {
            // Handle event object
            value.preventDefault();
            date = value.target.value ? DateTime.fromFormat(value.target.value, 'yyyy-MM-dd') : null;
        } else {
            // Handle direct date value (including null for clearing)
            date = value;
        }

        if(field === 'from_at') {
            setFromAt(date)
        } else if(field === 'until_at') {
            setUntilAt(date)
        }
    }

    const onChangeModality = tag => {
      const newTournamentType = [...tournamentTypes]
      const idx = newTournamentType.findIndex(item => item.name === tag)
      newTournamentType[idx].active = !newTournamentType[idx].active
      setTournamentsTypes(newTournamentType)
    }

    const onSubmit = async ev => {
        ev.preventDefault()
        let filters = `?versions=${versions.filter(item => item.active).map(item => item.name).join(',')}`;
        filters += `&modality=${tournamentTypes.filter(item => item.active).map(item => item.name).join(',')}`;
        if(!!minGames) {
            filters += `&min_amount=${minGames}`;
        }

        if(!!from_at) {
            filters += `&start_at=${from_at.toFormat('yyyy-MM-dd')}`;
        }

        if(!!until_at) {
            filters += `&end_at=${until_at.toFormat('yyyy-MM-dd')}`;
        }

        const response_players = await axios.get(`/player_stats${filters}`)
            .then(res => res.data)
            .catch(error => console.log(error));

        setSingleStats(response_players?.data.single_stats);
        setTeamStats(response_players?.data.team_stats);
    }

    return (
        <GuestLayout>
            <Head><title>Player Stats</title></Head>
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
                            {/* Stats Grids Container */}
                            <div className="w-full flex flex-col lg:flex-row gap-8">
                                {/* Team Stats Section */}
                                {teamStats.length > 0 && (
                                    <div className="w-full lg:w-1/2 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-neutral-200">
                                        <h3 className="text-3xl font-bold text-center mb-8 text-primary-700">
                                            Team Statistics
                                        </h3>
                                        <div className="overflow-x-auto">
                                            <table className="w-full">
                                                <thead>
                                                    <tr className="border-b border-neutral-200">
                                                        <th className="py-4 px-6 text-left text-sm font-semibold text-neutral-600">
                                                            <div className="flex items-center gap-2">
                                                                <UserGroupIcon className="h-5 w-5 text-primary-600" />
                                                                <span>Player</span>
                                                            </div>
                                                        </th>
                                                        <th className="py-4 px-6 text-center text-sm font-semibold text-neutral-600">
                                                            <div className="flex items-center justify-center gap-2">
                                                                <TrophyIcon className="h-5 w-5 text-primary-600" />
                                                                <span>Games</span>
                                                            </div>
                                                        </th>
                                                        <th className="py-4 px-6 text-center text-sm font-semibold text-neutral-600">
                                                            <div className="flex items-center justify-center gap-2">
                                                                <ChartBarIcon className="h-5 w-5 text-primary-600" />
                                                                <span>Record</span>
                                                            </div>
                                                        </th>
                                                        <th className="py-4 px-6 text-center text-sm font-semibold text-neutral-600">
                                                            <div className="flex items-center justify-center gap-2">
                                                                <span>Win %</span>
                                                            </div>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-neutral-200">
                                                    {teamStats.map((item, i) => {
                                                        const {name, win, draw, lost, average, total} = item
                                                        const record = `${win}-${draw}-${lost}`
                                                        const winPercentage = average ?? 0

                                                        return (
                                                            <tr
                                                                key={i}
                                                                className="group hover:bg-primary-50/50 transition-colors duration-200"
                                                            >
                                                                <td className="py-4 px-6">
                                                                    <span className="font-medium text-neutral-800">{name}</span>
                                                                </td>
                                                                <td className="py-4 px-6 text-center">
                                                                    <span className="font-medium text-primary-700">{total}</span>
                                                                </td>
                                                                <td className="py-4 px-6 text-center">
                                                                    <div className="inline-flex items-center justify-center">
                                                                        <div className="bg-primary-50 rounded-full px-4 py-1 shadow-sm border border-primary-200 whitespace-nowrap">
                                                                            <span className="text-sm font-medium text-primary-700">
                                                                                {record}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="py-4 px-6 text-center">
                                                                    <span className={`font-medium ${winPercentage >= 50 ? 'text-accent-600' : 'text-neutral-600'}`}>
                                                                        {winPercentage}%
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}

                                {/* Single Stats Section */}
                                {singleStats.length > 0 && (
                                    <div className="w-full lg:w-1/2 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-neutral-200">
                                        <h3 className="text-3xl font-bold text-center mb-8 text-primary-700">
                                            Single Statistics
                                        </h3>
                                        <div className="overflow-x-auto">
                                            <table className="w-full">
                                                <thead>
                                                    <tr className="border-b border-neutral-200">
                                                        <th className="py-4 px-6 text-left text-sm font-semibold text-neutral-600">
                                                            <div className="flex items-center gap-2">
                                                                <UserGroupIcon className="h-5 w-5 text-primary-600" />
                                                                <span>Player</span>
                                                            </div>
                                                        </th>
                                                        <th className="py-4 px-6 text-center text-sm font-semibold text-neutral-600">
                                                            <div className="flex items-center justify-center gap-2">
                                                                <TrophyIcon className="h-5 w-5 text-primary-600" />
                                                                <span>Games</span>
                                                            </div>
                                                        </th>
                                                        <th className="py-4 px-6 text-center text-sm font-semibold text-neutral-600">
                                                            <div className="flex items-center justify-center gap-2">
                                                                <ChartBarIcon className="h-5 w-5 text-primary-600" />
                                                                <span>Record</span>
                                                            </div>
                                                        </th>
                                                        <th className="py-4 px-6 text-center text-sm font-semibold text-neutral-600">
                                                            <div className="flex items-center justify-center gap-2">
                                                                <span>Win %</span>
                                                            </div>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-neutral-200">
                                                    {singleStats.map((item, i) => {
                                                        const {name, win, draw, lost, average, total} = item
                                                        const record = `${win}-${draw}-${lost}`
                                                        const winPercentage = average ?? 0

                                                        return (
                                                            <tr
                                                                key={i}
                                                                className="group hover:bg-primary-50/50 transition-colors duration-200"
                                                            >
                                                                <td className="py-4 px-6">
                                                                    <span className="font-medium text-neutral-800">{name}</span>
                                                                </td>
                                                                <td className="py-4 px-6 text-center">
                                                                    <span className="font-medium text-primary-700">{total}</span>
                                                                </td>
                                                                <td className="py-4 px-6 text-center">
                                                                    <div className="inline-flex items-center justify-center">
                                                                        <div className="bg-primary-50 rounded-full px-4 py-1 shadow-sm border border-primary-200 whitespace-nowrap">
                                                                            <span className="text-sm font-medium text-primary-700">
                                                                                {record}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="py-4 px-6 text-center">
                                                                    <span className={`font-medium ${winPercentage >= 50 ? 'text-accent-600' : 'text-neutral-600'}`}>
                                                                        {winPercentage}%
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {(!teamStats.length && !singleStats.length) && (
                                <div className="w-full max-w-4xl bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-neutral-200">
                                    <div className="text-center py-12">
                                        <h3 className="text-primary-700 text-2xl font-semibold mb-4">
                                            No player statistics available
                                        </h3>
                                        <p className="text-neutral-600">
                                            Try adjusting your filters or check back later
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="w-72" />
                </div>
            </div>
        </GuestLayout>
    );
}
