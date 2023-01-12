import React from 'react'
import { Head } from '@inertiajs/inertia-react'
import Tournament from '@/Components/Tournament'
import GuestLayout from '@/Layouts/GuestLayout';


export default function Libertadores({tournaments}) {

    const champions = (tournaments.reduce((acc, tournament) => {
        const champ = tournament.positions[0]
        const idx = acc.findIndex(item => item.team === champ.team)
        idx < 0 ? acc.push({team: champ.team, total: 1}) : acc[idx]['total'] += 1
        return acc
    }, [])).sort( (a, b) => a.total <= b.total ? 1 : -1)

    return (
        <GuestLayout>
            <Head title="Libertadores" />
            <div className='mt-8 flex flex-row gap-12'>
                <section className="flex flex-col">
                    <article>
                        <h2 className='font-bold text-main-yellow text-xl text-center mb-2'>CHAMPIONS</h2>
                        <table className="table-auto border-collapse">
                            <thead>
                            <tr>
                                <th className='border-b font-bold pb-2 text-white-400 text-left'>Team</th>
                                <th className='border-b font-bold pb-2 text-white-400 text-left'>Titles</th>
                            </tr>
                            </thead>
                            <tbody>
                            { Object.values(champions).map( champion => {
                                const {team, total} = champion;
                                return (
                                    <tr key={team}>
                                        <td className='border-b font-semibold p-2 text-yellow-200 text-left'>{team}</td>
                                        <td className='border-b font-semibold p-2 text-yellow-200 text-left'>{total}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </article>
                </section>
                <section className="flex flex-col">
                    {
                        tournaments.map(tournament => {
                            return (
                                <article key={tournament.name} className='my-4'>
                                    <div className='flex justify-between mb-2 bg-gray-400 text-blue-600 rounded-md px-4 py-2 items-center'>
                                        <h4 className='text-xl'>{tournament.name}</h4>
                                        <h6 className='text-xs text-right'>Played: {tournament.played_at}</h6>
                                    </div>
                                    <Tournament tournament={tournament.positions} />
                                </article>
                            )
                        })
                    }
                </section>
            </div>
        </GuestLayout>
    );
}
