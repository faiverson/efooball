import React from 'react';

export default function Tournament ({tournament}) {
    return (
        <table className="table-auto border-collapse">
            <thead>
            <tr>
                <th className='border-b font-bold p-2 text-white text-left'>Team</th>
                <th className='border-b font-bold p-2 text-white text-left'>Points</th>
                <th className='border-b font-medium p-2 text-white text-left'>Games</th>
                <th className='border-b font-medium p-2 text-white text-left'>Win</th>
                <th className='border-b font-medium p-2 text-white text-left'>Draw</th>
                <th className='border-b font-medium p-2 text-white text-left'>Lost</th>
                <th className='border-b font-medium p-2 text-white text-left'>GF</th>
                <th className='border-b font-medium p-2 text-white text-left'>GC</th>
                <th className='border-b font-medium p-2 text-white text-left'>DIFF</th>
            </tr>
            </thead>
            <tbody>
            { tournament.map((item, i) => {
                const {team, W: win, D: draw, L: lost, POINTS: points, GP, GF, GC, DIF: diff} = item
                return (
                    <tr key={i}>
                        <td className='border-b font-semibold py-1 px-2 text-yellow-400 text-left'>{team}</td>
                        <td className='border-b font-semibold py-1 px-2 text-yellow-400 text-right'>{points}</td>
                        <td className='border-b py-1 px-2 text-yellow-400 text-right'>{GP}</td>
                        <td className='border-b py-1 px-2 text-yellow-400 text-right'>{win}</td>
                        <td className='border-b py-1 px-2 text-yellow-400 text-right'>{draw}</td>
                        <td className='border-b py-1 px-2 text-yellow-400 text-right'>{lost}</td>
                        <td className='border-b py-1 px-2 text-yellow-400 text-right'>{GF}</td>
                        <td className='border-b py-1 px-2 text-yellow-400 text-right'>{GC}</td>
                        <td className='border-b py-1 px-2 text-yellow-400 text-right'>{diff}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}
