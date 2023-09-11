import React, { Fragment, useState } from 'react'
import { Head } from '@inertiajs/react'
import GuestLayout from '@/Layouts/GuestLayout';

export default function Home({games}) {
  return (
    <GuestLayout>
      <Head><title>Dashboard</title></Head>
      <div className="w-full">
      { games.length > 0 &&
        <div className="w-1/3 mx-auto">
          <h3 className="m-4 text-main-violet text-2xl font-semibold text-center">Latest Games</h3>
            <ul className="grid grid-cols-[1fr_auto_1fr] gap-x-6 gap-y-2 text-blue-500 text-lg">
            {
              games.map((item, i) => {
                const { team_home, team_home_score, team_away, team_away_score} = item
                return (
                  <Fragment key={i}>
                    <li className="text-right">{team_home.name}</li>
                    <li className="text-center font-bold text-xl">{`${team_home_score}-${team_away_score}`}</li>
                    <li className="text-left">{team_away.name}</li>
                  </Fragment>
                )
              })
            }
            </ul>
        </div>
      }
      </div>
    </GuestLayout>
  );
}
