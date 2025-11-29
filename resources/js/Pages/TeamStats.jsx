import React from 'react'
import { Head } from '@inertiajs/react'
import GuestLayout from '@/Layouts/GuestLayout';
import StatsFilters from "@/Components/StatsFilters";
import { TrophyIcon, UserGroupIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { useStatsFilterForm } from '@/Hooks/useStatsFilterForm';

export default function TeamStats({ data, current_version, start_at, end_at, min_amount }) {
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
        onSubmit,
    } = useStatsFilterForm({ baseUrl: 'team_stats', data, current_version, start_at, end_at, min_amount });

    return (
        <GuestLayout>
            <Head><title>Team Stats</title></Head>
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
                            filterType="team"
                        />
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="flex justify-center">
                            {Array.isArray(stats) && stats.length > 0 ? (
                                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-neutral-200 w-fit">
                                    <h3 className="text-3xl font-bold text-center mb-8 text-primary-700">
                                        Team Statistics
                                    </h3>

                                    <div className="overflow-x-auto">
                                        <table className="w-fit mx-auto">
                                            <thead>
                                                <tr className="border-b border-neutral-200">
                                                    <th className="py-4 px-6 text-left text-sm font-semibold text-neutral-600">
                                                        <div className="flex items-center gap-2">
                                                            <UserGroupIcon className="h-5 w-5 text-primary-600" />
                                                            <span>Team</span>
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
                                                {stats.map((item, i) => {
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
                                                                    <div className="bg-primary-50 rounded-full px-4 py-1 shadow-sm border border-primary-200">
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
                            ) : (
                                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-neutral-200">
                                    <div className="text-center py-12">
                                        <h3 className="text-primary-700 text-2xl font-semibold mb-4">
                                            No team statistics available
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
