import React, {useState} from 'react'
import axios from '@/lib/axios'
import {DateTime} from 'luxon'
import {Head} from '@inertiajs/react'
import {Button, Input} from '@material-tailwind/react'
import {GameVersion} from '@/lib/enums'
import GameVersionTags from '@/Components/GameVersionTags'
import GuestLayout from '@/Layouts/GuestLayout';

export default function Home({games}) {
  return (
    <GuestLayout>
      <Head><title>Dashboard</title></Head>
      <div className="w-full">
      {games.length > 0 &&
        <div className="w-1/3 mx-auto">
          <h3 className="m-4 text-main-orange text-2xl font-semibold text-center">Latest Games</h3>
            {
              games.map((item, i) => {
                const { team_home, team_home_score, team_away, team_away_score} = item
                return <ul key={i} className="grid grid-cols-[1fr_2em_1fr] gap-4">
                        <li className="text-right">{team_home.name}</li>
                        <li className="text-center">{`${team_home_score}-${team_away_score}`}</li>
                        <li className="text-left">{team_away.name}</li>
                      </ul>
              })
            }
        </div>
      }
      </div>
    </GuestLayout>
  );
}
