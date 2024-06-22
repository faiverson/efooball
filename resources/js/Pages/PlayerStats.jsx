import React, { useState } from 'react'
import axios from '@/lib/axios'
import { DateTime } from 'luxon'
import { Head } from '@inertiajs/react'
import { Button } from '@material-tailwind/react'
import { GameVersion, TournamentType } from '@/lib/enums'
import TeamFilters from '@/Components/TeamFilters'
import SingleFilters from '@/Components/SingleFilters'
import GuestLayout from '@/Layouts/GuestLayout';

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

            <div className="flex flex-col justify-start gap-2 md:flex-col p-2 md:w-80 md:p-8">
              <TeamFilters inputs={{versions, minGames, from_at, until_at, tournamentTypes }}
                            methods={{onChangeTag, onChangeMinGames, handleChange}} />
              <SingleFilters inputs={{tournamentTypes }}
                            methods={{onChangeModality}} />
              <Button onClick={onSubmit} variant="filled" color="yellow">Apply Filter</Button>
            </div>
            <div className="flex flex-row items-start">
                <table className="pes-table">
                    <thead>
                    <tr>
                    <th>Player</th>
                    <th>Games</th>
                    <th>Record</th>
                    <th>Percentage</th>
                    </tr>
                    </thead>
                    <tbody>
                    { teamStats.map((item, i) => {
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
                <table className="pes-table">
                    <thead>
                    <tr>
                    <th>Player</th>
                    <th>Games</th>
                    <th>Record</th>
                    <th>Percentage</th>
                    </tr>
                    </thead>
                    <tbody>
                    { singleStats.map((item, i) => {
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
