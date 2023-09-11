import React, { useState } from 'react'
import axios from '@/lib/axios'
import { DateTime } from 'luxon'
import { Head } from '@inertiajs/react'
import { Button, Input } from '@material-tailwind/react'
import {GameVersion} from '@/lib/enums'
import GameVersionTags from '@/Components/GameVersionTags'
import GuestLayout from '@/Layouts/GuestLayout';
import Filters from "@/Components/Filters";

export default function TeamStats({ data, current_version, start_at, end_at, min_amount }) {
    const [stats, setStats] = useState(data ?? [])
    const [versions, setVersions] = useState(Object.keys(GameVersion).map(item => ({active: current_version === item.toLowerCase(), name: item})))
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

        const response_players = await axios.get(`/team_stats${filters}`)
            .then(res => res.data)
            .catch(error => console.log(error));

        setStats(response_players?.data)
    }

    return (
        <GuestLayout>
            <Head><title>Team Stats</title></Head>
            <Filters inputs={{versions, minGames, from_at, until_at }}
                   methods={{onChangeTag, onChangeMinGames, handleChange, onSubmit}} />
            <div className="flex flex-row items-start">
                <table className="pes-table">
                    <thead>
                    <tr>
                    <th>Team</th>
                    <th>Games</th>
                    <th>Record</th>
                    <th>Percentage</th>
                    </tr>
                    </thead>
                    <tbody>
                    { stats.map((item, i) => {
                            const {name, win, draw, lost, average, total} = item
                            const record = `${win}-${draw}-${lost}`
                            return (
                            <tr key={i} className="text-center">
                                <td>{name}</td>
                                <td>{total}</td>
                                <td>{record}</td>
                                <td>{average ?? 0}%</td>
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
