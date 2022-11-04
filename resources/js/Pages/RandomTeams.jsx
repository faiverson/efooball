import React, { useState } from 'react';
import axios from '@/lib/axios'
import GuestLayout from '@/Layouts/GuestLayout';
import { Button, Chip } from '@material-tailwind/react';

function PlayerChip({player, status, onChange}) {
  const onClick = ev => {
    ev.preventDefault()
    onChange(player)
  }
  const attributes = {
    ...(status && {
        dismissible: () => {}
    })
  }

  return (
    <Chip color={status ? "green" : "amber"} value={player.name} attributes onClick={onClick} />
  )
}

export default function RandomTeams({ players }) {
    const [data, setData] = useState([])
    const [headSelected, setHeadSelected] = useState(new Set())
    const [tailSelected, setTailSelected] = useState(new Set())

    const onChange = (type, player) => {
        const selPlayers = new Set(type === 'head' ? headSelected: tailSelected)
        selPlayers.add(player)
        type === 'head' ? setHeadSelected(selPlayers) : setTailSelected(selPlayers)
    }

    const onSubmit = async ev => {
        ev.preventDefault();
        const response = await axios.post(`/random`, {
            head: [...headSelected].map(item => item.id),
            tail: [...tailSelected].map(item => item.id)
        })
            .then(res => res.data)
            .catch(error => console.log(error));

        setData(response.data.teams)
    }

    const head_players = Array.from(headSelected)
    const tail_players = Array.from(tailSelected)

    console.log(data)
    return (
        <GuestLayout>
            <div className="container flex flex-wrap flex-column mt-8">
                <h3 className="text-lg text-main-yellow">Select Head Players</h3>
                <div className="container flex flex-wrap flex-row gap-4 items-center mt-4">
                { players.filter(item => !tailSelected.has(item)).map( item => {
                        return (
                            <PlayerChip key={item.name} player={item} onChange={player => onChange('head', player)} status={headSelected.has(item)} />
                        )
                    })
                }
                </div>
                <h3 className="text-lg text-main-yellow mt-4">Select Tail Players</h3>
                <div className="container flex flex-wrap flex-row gap-4 items-center mt-4">
                { players.filter(item => !headSelected.has(item)).map( item => {
                        return (
                            <PlayerChip key={item.name} player={item} onChange={player => onChange('tail', player)} status={tailSelected.has(item)} />
                        )
                    })
                }
                </div>
                <div className="w-full">
                    <div className="flex flex-wrap flex-col items-center mx-auto p-4 mt-4 bg-white rounded gap-4 w-fit">
                        <div className="flex flex-wrap flex-row justify-start items-start gap-4">
                            <div className="flex flex-col">
                                <h4 className="text-lg text-main-blue font-bold">Head Selection</h4>
                                <ul className="flex flex-col">
                                    { head_players.map(player => <li className="text-main-blue" key={player.id}>{player.name}</li>) }
                                </ul>
                            </div>
                            <div className="flex flex-col">
                                <h4 className="text-lg text-main-blue font-bold">Tail Selection</h4>
                                <ul className="flex flex-col">
                                    { tail_players.map(player => <li key={player.id} className="text-main-blue">{player.name}</li>) }
                                </ul>
                            </div>
                        </div>
                        <Button onClick={onSubmit} variant="filled" color="yellow">Randomize</Button>
                    </div>
                    <div className="mx-auto mt-4 bg-white rounded flex flex-wrap flex-col w-fit p-4">
                        <h4 className="text-lg text-main-blue font-bold">TEAMS</h4>
                        <ul className="flex flex-col">
                        { data.map(team => <li key={team.id} className="text-main-blue">{team.name}</li>) }
                        </ul>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
