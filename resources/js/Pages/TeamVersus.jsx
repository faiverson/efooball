import React, { useState } from 'react'
import axios from '@/lib/axios'
import { DateTime } from 'luxon'
import { Head } from '@inertiajs/react'
import { GameVersion } from '@/lib/enums'
import Filters from '@/Components/Filters'
import TeamDropdown from '@/Components/TeamDropdown'
import GuestLayout from '@/Layouts/GuestLayout';
import {Button} from "@material-tailwind/react";

export default function TeamVersus({ teams, current_version, start_at, end_at}) {
    const [data, setData] = useState()
    const [first_team, setFirstTeam] = useState(-1)
    const [second_team, setSecondTeam] = useState(-1)
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

    console.log(data, first_team, second_team)

    return (
        <GuestLayout>
            <Head><title>Team Head to Head</title></Head>
            <Filters inputs={{versions, from_at, until_at }} methods={{onChangeTag, handleChange, onSubmit}} />
            <div className="flex flex-col w-full">
              <div className="flex flex-row items-start gap-4 justify-center">
                <div className="w-3/12"><TeamDropdown teams={teams} selected={{first_team}} onChange={val => setFirstTeam(val)} /></div>
                <div className="w-3/12"><TeamDropdown teams={teams} selected={{second_team}} onChange={val => setSecondTeam(val)} /></div>
                <div className="w-2/12"><Button onClick={onSubmit} variant="filled" color="orange">Okay</Button></div>
              </div>
              {!!data && data.totals.total > 0 &&
                <section className="flex flex-col gap-4 w-full mt-8">
                  <div className="flex flex-row text-main-violet gap-2 text-xl w-full justify-center">
                    <div>{data.first_team.name}</div>
                    <div>{`${data.totals.first_team_win}-${data.totals.draw}-${data.totals.first_team_lost}`}</div>
                    <div>{data.second_team.name}</div>
                  </div>
                  <div className="flex flex-col text-main-violet row-gap-2">
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
              { !!data && data.totals.total <= 0 &&
                <div className="orange text-lg">No matches between {data.first_team.name} and {data.second_team.name}</div>
              }
            </div>
        </GuestLayout>
    );
}
