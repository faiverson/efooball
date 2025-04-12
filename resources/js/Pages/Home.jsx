import React, { Fragment } from 'react'
import { Head } from '@inertiajs/react'
import GuestLayout from '@/Layouts/GuestLayout';
import { CalendarIcon, TrophyIcon, UserGroupIcon } from '@heroicons/react/24/outline';

export default function Home({games}) {
  return (
    <GuestLayout>
      <Head><title>Dashboard</title></Head>
      <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 py-12">
        {games.length > 0 ? (
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-8 border border-neutral-200">
              <h3 className="text-3xl font-bold text-center mb-8 text-primary-700">
                Latest Games
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="py-4 px-6 text-left text-sm font-semibold text-neutral-600">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-5 w-5 text-primary-600" />
                          <span>Date</span>
                        </div>
                      </th>
                      <th className="py-2 px-6 text-right text-sm font-semibold text-neutral-600">
                        <div className="flex items-center justify-end gap-2">
                          <span>Home Team</span>
                          <UserGroupIcon className="h-5 w-5 text-primary-600" />
                        </div>
                      </th>
                      <th className="py-4 px-6 text-center text-sm font-semibold text-neutral-600">
                        <div className="flex items-center justify-center gap-2">
                          <span>Score</span>
                        </div>
                      </th>
                      <th className="py-4 px-6 text-left text-sm font-semibold text-neutral-600">
                        <div className="flex items-center gap-2">
                          <span>Away Team</span>
                          <UserGroupIcon className="h-5 w-5 text-primary-600" />
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {games.slice(0, 10).map((item, i) => {
                      const { team_home, team_home_score, team_away, team_away_score, played_at } = item;
                      const isHomeWinner = team_home_score > team_away_score;
                      const isAwayWinner = team_away_score > team_home_score;
                      const date = new Date(played_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      });

                      return (
                        <tr
                          key={i}
                          className="group hover:bg-primary-50/50 transition-colors duration-200"
                        >
                          <td className="py-2 px-6 text-sm text-neutral-600">
                            <div className="flex items-center gap-2">
                              <span>{date}</span>
                            </div>
                          </td>
                          <td className="py-2 px-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {isHomeWinner && <TrophyIcon className="h-4 w-4 text-accent-600" />}
                              <span className={`font-medium ${isHomeWinner ? 'text-accent-600' : 'text-neutral-800'}`}>
                                {team_home.name}
                              </span>
                            </div>
                          </td>
                          <td className="py-2 px-6 text-center">
                            <div className="inline-flex items-center justify-center min-w-[80px]">
                              <div className="bg-primary-50 rounded-full px-4 py-1 shadow-sm border border-primary-200">
                                <span className="text-lg font-bold text-primary-700">
                                  {`${team_home_score}-${team_away_score}`}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="py-2 px-6">
                            <div className="flex items-center gap-2">
                              <span className={`font-medium ${isAwayWinner ? 'text-accent-600' : 'text-neutral-800'}`}>
                                {team_away.name}
                              </span>
                              {isAwayWinner && <TrophyIcon className="h-4 w-4 text-accent-600" />}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-8 max-w-md mx-auto border border-neutral-200">
              <h3 className="text-primary-700 text-2xl font-semibold mb-4">
                No games available at the moment
              </h3>
              <p className="text-neutral-600">
                Check back later for upcoming matches
              </p>
            </div>
          </div>
        )}
      </div>
    </GuestLayout>
  );
}
