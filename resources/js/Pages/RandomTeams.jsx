import React, { useState } from 'react';
import axios from '@/lib/axios'
import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react'
import { Button, Chip } from '@material-tailwind/react';
import PlayerChip, { PlayerChipType } from '@/Components/PlayerChip';
import { UserGroupIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

export default function RandomTeams({ players }) {
    const [data, setData] = useState([])
    const [headSelected, setHeadSelected] = useState(new Set())
    const [tailSelected, setTailSelected] = useState(new Set())

    const onChange = (type, player) => {
        const selPlayers = new Set(type === PlayerChipType.head ? headSelected : tailSelected)
        selPlayers.has(player) ? selPlayers.delete(player) : selPlayers.add(player);
        type === PlayerChipType.head ? setHeadSelected(selPlayers) : setTailSelected(selPlayers)
        setData([])
    }

    const onSubmit = async ev => {
        ev.preventDefault();
        const response = await axios.post(`/random`, {
            head: [...headSelected].map(item => item.id),
            tail: [...tailSelected].map(item => item.id)
        })
            .then(res => res.data)
            .catch(error => console.log(error));

        setData(response.data.teams)
        setHeadSelected(new Set())
        setTailSelected(new Set())
    }

    const head_players = Array.from(headSelected)
    const tail_players = Array.from(tailSelected)

    return (
        <GuestLayout>
            <Head><title>Random Teams</title></Head>
            <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Random Team Generator</h1>
                        <p className="text-gray-600">Select players for head and tail teams to create random matchups</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Head Players Section */}
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-neutral-200">
                            <div className="flex items-center gap-2 mb-4">
                                <UserGroupIcon className="h-6 w-6 text-amber-500" />
                                <h3 className="text-xl font-semibold text-gray-900">Head Players</h3>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                {players.filter(item => !tailSelected.has(item)).map(item => (
                                    <div key={item.name} className="min-w-0">
                                        <PlayerChip
                                            type={PlayerChipType.head}
                                            player={item}
                                            onChange={onChange}
                                            selected={headSelected.has(item)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Tail Players Section */}
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-neutral-200">
                            <div className="flex items-center gap-2 mb-4">
                                <UserGroupIcon className="h-6 w-6 text-purple-500" />
                                <h3 className="text-xl font-semibold text-gray-900">Tail Players</h3>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                {players.filter(item => !headSelected.has(item)).map(item => (
                                    <div key={item.name} className="min-w-0">
                                        <PlayerChip
                                            type={PlayerChipType.tail}
                                            player={item}
                                            onChange={onChange}
                                            selected={tailSelected.has(item)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Selection Summary */}
                    {data.length <= 0 && (head_players.length > 0 || tail_players.length > 0) && (
                        <div className="mt-8 bg-white rounded-xl shadow-sm p-6 border border-neutral-200">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <h4 className="text-lg font-semibold text-blue-600 flex items-center gap-2">
                                        <UserGroupIcon className="h-5 w-5" />
                                        Head Selection
                                    </h4>
                                    <ul className="space-y-2">
                                        {head_players.map(player => (
                                            <li key={player.id} className="text-blue-600 bg-blue-50 px-4 py-2 rounded-lg">
                                                {player.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="text-lg font-semibold text-blue-600 flex items-center gap-2">
                                        <UserGroupIcon className="h-5 w-5" />
                                        Tail Selection
                                    </h4>
                                    <ul className="space-y-2">
                                        {tail_players.map(player => (
                                            <li key={player.id} className="text-blue-600 bg-blue-50 px-4 py-2 rounded-lg">
                                                {player.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-center">
                                <Button
                                    onClick={onSubmit}
                                    disabled={head_players.length < 2 || head_players.length !== tail_players.length}
                                    variant="filled"
                                    color="amber"
                                    className="flex items-center gap-2"
                                >
                                    <ArrowPathIcon className="h-5 w-5" />
                                    Generate Teams
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Results Section */}
                    {data.length > 0 && (
                        <div className="mt-8 bg-white rounded-xl shadow-sm p-6 border border-neutral-200">
                            <h4 className="text-xl font-semibold text-blue-600 mb-4 flex items-center gap-2">
                                <UserGroupIcon className="h-6 w-6" />
                                Generated Teams
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {data.map((team, index) => (
                                    <div key={team.id} className="bg-blue-50 rounded-lg p-4">
                                        <h5 className="text-lg font-medium text-blue-600 mb-2">Team {index + 1}</h5>
                                        <p className="text-blue-600">{team.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </GuestLayout>
    );
}
