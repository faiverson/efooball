import React, { useState } from 'react'
import axios from '@/lib/axios'
import { DateTime } from 'luxon'
import { Head } from '@inertiajs/react'
import { GameVersion } from '@/lib/enums'
import TeamFilters from '@/Components/TeamFilters'
import TeamDropdown from '@/Components/TeamDropdown'
import GuestLayout from '@/Layouts/GuestLayout';
import { Button } from "@material-tailwind/react";

export default function TeamVersus({ teams, current_version, start_at, end_at}) {
  const local_teams = teams.map(team => ({...team, id: String(team.id), players: team.players.map(p => p.id)}));

    const [data, setData] = useState()
    const [first_team, setFirstTeam] = useState('-1')
    const [second_team, setSecondTeam] = useState('-1')
    const [away_teams, setAwayTeams] = useState([])
    const [versions, setVersions] = useState(Object.keys(GameVersion).map(item => ({active: current_version === item.toLowerCase(), name: item})))
    const [from_at, setFromAt] = useState(DateTime.fromFormat(start_at, 'yyyy-MM-dd'))
    const [until_at, setUntilAt] = useState(DateTime.fromFormat(end_at, 'yyyy-MM-dd'))

    const onChangeTag = tag => {
        const newVersions = [...versions]
        const idx = newVersions.findIndex(item => item.name === tag)
        newVersions[idx].active = !newVersions[idx].active
        setVersions(newVersions)
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
        let filters = {
          first_team_id: first_team,
          second_team_id: second_team,
        }
        const selected_versions = versions.filter(item => item.active).map(item => item.name).join(',');

        if(!!versions) {
            filters.versions = selected_versions;
        }

        if(!!from_at) {
            filters.start_at = from_at.toFormat('yyyy-MM-dd');
        }

        if(!!until_at) {
          filters.until_at = until_at.toFormat('yyyy-MM-dd');
        }

        const response = await axios.post(`/team_versus`, filters)
            .then(res => res.data)
            .catch(error => console.log(error));

        setData(response?.data)
    }

    const handleLocalTeam = id => {
      setFirstTeam(id)
      const idx = local_teams.findIndex(item => item.id === id);
      const away = local_teams.filter(team => !team.players.some(player_id => local_teams[idx].players.includes(player_id)))
      setSecondTeam('-1')
      setAwayTeams(away);
    }

    const handleAwayTeam = id => setSecondTeam(id);

    return (
        <GuestLayout>
            <Head><title>Team Head to Head</title></Head>
            <div className="flex flex-col justify-start gap-2 md:flex-col p-2 md:w-80 md:p-8">
              <TeamFilters inputs={{versions, from_at, until_at }} methods={{onChangeTag, handleChange}} />
            </div>
            <div className="flex flex-col w-full">
              <div className="flex flex-row items-start gap-4 justify-center">
                <div className="w-3/12"><TeamDropdown name="local_team" teams={local_teams} selected={first_team} onChange={handleLocalTeam} /></div>
                <div className="w-3/12"><TeamDropdown name="away_team" teams={away_teams} selected={second_team} onChange={handleAwayTeam} /></div>
                <div className="w-2/12"><Button onClick={onSubmit} variant="filled" color="yellow">Okay</Button></div>
              </div>
              {!!data &&
                <section className="flex flex-col gap-4 w-full mt-8">
                  <div className="flex flex-row text-main-yellow gap-2 text-xl w-full justify-center">
                    {
                      data.totals.total > 0
                      ? <>
                          <div>{data.first_team.name}</div>
                          <div>{`${data.totals.first_team_win}-${data.totals.draw}-${data.totals.first_team_lost}`}</div>
                          <div>{data.second_team.name}</div>
                          </>
                      : <div className="orange text-lg">No matches between {data.first_team.name} and {data.second_team.name}</div>
                    }

                  </div>
                  <div className="flex flex-col text-main-yellow row-gap-2">
                    { data.games.map((item, i) => {
                      const {team_home_score, team_away_score, played_at} = item
                      return (
                          <div key={i} className="text-center">{data.first_team.name} {team_home_score}-{team_away_score} {data.second_team.name} ({played_at})</div>
                      )
                    })
                    }
                  </div>
                </section>
              }
            </div>
        </GuestLayout>
    );
}
