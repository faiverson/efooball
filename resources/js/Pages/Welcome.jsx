import React, { useState } from 'react'
import axios from '@/lib/axios'
import { Link, Head } from '@inertiajs/inertia-react'
import { Button, Input } from '@material-tailwind/react'
import {GameVersion} from '@/lib/enums'
import ApplicationLogo from '@/Components/ApplicationLogo'
import GameVersionTags from '@/Components/GameVersionTags'
import GuestLayout from '@/Layouts/GuestLayout';

export default function Welcome(props) {
    const [stats, setStats] = useState({teams: [], players: []})
    const [versions, setVersions] = useState(Object.keys(GameVersion).map(item => ({active: false, name: item})))
    const [minGames, setMinGames] = useState('')
    const [from_at, setFromAt] = useState()
    const [until_at, setUntilAt] = useState()

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

    const handleChange = (ev, field) => {
        ev.preventDefault()
        const date = DateTime.fromFormat(ev.target.value, 'yyyy-MM-dd');
        if(field === 'from_at') {
            setFromAt(date)
        } else if(field === 'until_at') {
            setUntilAt(date)
        }
    }

    const onSubmit = async ev => {
        ev.preventDefault()
        let filters = `?versions=${versions.filter(item => item.active).map(item => item.name).join(',')}`;
        if(!!minGames) {
            filters += `&min_amount=${minGames}`;
        }

        if(!!from_at) {
            filters += `&start_at=${from_at.toFormat('yyyy-MM-dd')}`;
        }

        if(!!until_at) {
            filters += `&end_at=${until_at.toFormat('yyyy-MM-dd')}`;
        }

        const response_teams = await axios.get(`/team_stats${filters}`)
            .then(res => res.data)
            .catch(error => console.log(error));

        const response_players = await axios.get(`/player_stats${filters}`)
            .then(res => res.data)
            .catch(error => console.log(error));

        setStats({teams: response_teams?.data, players: response_players?.data})
    }

    return (
        <GuestLayout>
            <div className="flex flex-col justify-start gap-2 md:flex-col p-2 md:w-80 md:p-8">
                    <div className="text-sm text-main-yellow">Filters</div>
                    <GameVersionTags versions={versions} onChange={onChangeTag} />
                    <Input type="number" color="yellow" variant="outlined" label="Played games" value={minGames} onChange={ev => onChangeMinGames(ev)} />
                    <Input type="date" color="yellow" variant="outlined" label="Since" value={from_at ? from_at.toFormat('yyyy-MM-dd') : ''} onChange={ev => handleChange(ev, 'from_at')} />
                    <Input type="date" color="yellow" variant="outlined" label="Until" value={until_at ? until_at.toFormat('yyyy-MM-dd') : ''} onChange={ev => handleChange(ev, 'until_at')} />
                    <Button onClick={onSubmit} variant="filled" color="yellow">Apply Filter</Button>
                </div>
                <div className="flex flex-row items-start">
                    <table className="pes-table">
                        <thead>
                        <tr>
                        <th>Team</th>
                        <th>Percentage</th>
                        <th>Record</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            stats?.teams.map((item, i) => {
                                const {name, win, draw, lost, average} = item
                                const record = `${win}-${draw}-${lost}`
                                return (
                                <tr key={i}>
                                    <td>{name}</td>
                                    <td>{average}%</td>
                                    <td>{record}</td>
                                </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                    <table className="ml-4 pes-table">
                        <thead>
                        <tr>
                        <th>Player</th>
                        <th>Percentage</th>
                        <th>Record</th>
                        </tr>
                        </thead>
                        <tbody>
                        { stats?.players.map((item, i) => {
                                const {name, win, draw, lost, average} = item
                                const record = `${win}-${draw}-${lost}`
                                return (
                                <tr key={i}>
                                    <td>{name}</td>
                                    <td>{average}%</td>
                                    <td>{record}</td>
                                </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </GuestLayout>
    );
}
