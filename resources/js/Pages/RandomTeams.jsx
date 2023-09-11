import React, { useState } from 'react';
import axios from '@/lib/axios'
import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react'
import { Button, Chip } from '@material-tailwind/react';

const PlayerChipType = {
    head: 'head',
    tail: 'tail',
};

function PlayerChip({type, player, selected, onChange}) {
  const onClick = ev => {
    ev.preventDefault()
    onChange(type, player)
  }

  const attributes = {
    ...(selected && {
        dismissible: {
          onClose: ev => onClick(ev, type, player),
        },
    }),
    ...(!selected && {onClick: ev => onClick(ev, type, player)})
  }

  return (
    <Chip color={selected ? "green" : "amber"} value={player.name} {...attributes} />
  )
}

export default function RandomTeams({ players }) {
    const [data, setData] = useState([])
    const [headSelected, setHeadSelected] = useState(new Set())
    const [tailSelected, setTailSelected] = useState(new Set())

    const onChange = (type, player) => {
        const selPlayers = new Set(type === PlayerChipType.head ? headSelected : tailSelected)
        selPlayers.has(player) ? selPlayers.delete(player) : selPlayers.add(player);
        type === PlayerChipType.head ? setHeadSelected(selPlayers) : setTailSelected(selPlayers)
        setData([])
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
        setHeadSelected(new Set())
        setTailSelected(new Set())
    }

    const head_players = Array.from(headSelected)
    const tail_players = Array.from(tailSelected)

  console.log(data, head_players.length > 0 || tail_players.length > 0)
    return (
        <GuestLayout>
            <Head><title>Random Teams</title></Head>
            <div className="container flex flex-wrap flex-column mt-8">
                <div className="w-full m-8">
                    <h3 className="text-lg text-main-yellow">Select Head Players</h3>
                    <div className="grid auto-rows-min grid-cols-7 gap-4 mt-4 w-fit mx-auto justify-items-center">
                    { players.filter(item => !tailSelected.has(item)).map( item => {
                            return (
                                // <PlayerChip key={item.name} type={PlayerChipType.head} player={item} onChange={onChange} selected={headSelected.has(item)} />
                                <div key={item.name} className="min-w-0 w-fit"><PlayerChip type={PlayerChipType.head} player={item} onChange={onChange} selected={headSelected.has(item)} /></div>
                            )
                        })
                    }
                    </div>
                    <h3 className="text-lg text-main-yellow mt-4">Select Tail Players</h3>
                    <div className="grid auto-rows-min grid-cols-7 gap-4 mt-4 w-fit mx-auto justify-items-center">
                    { players.filter(item => !headSelected.has(item)).map( item => {
                            return (
                                <PlayerChip key={item.name} type={PlayerChipType.tail} player={item} onChange={onChange} selected={tailSelected.has(item)} />
                            )
                        })
                    }
                    </div>
                </div>
                <div className="w-full m-8">
                  {data.length <= 0 && (head_players.length > 0 || tail_players.length > 0) &&
                    <div className="flex flex-wrap flex-col items-center mx-auto p-4 mt-4 bg-white rounded gap-4 w-fit border-2 border-orange-300">
                    <div className="flex flex-wrap flex-row justify-start items-start gap-4">
                      <div className="flex flex-col">
                        <h4 className="text-lg text-main-blue font-bold">Head Selection</h4>
                        <ul className="flex flex-col">
                          {head_players.map(player => <li className="text-main-blue"
                                                          key={player.id}>{player.name}</li>)}
                        </ul>
                      </div>
                      <div className="flex flex-col">
                        <h4 className="text-lg text-main-blue font-bold">Tail Selection</h4>
                        <ul className="flex flex-col">
                          {tail_players.map(player => <li key={player.id}
                                                          className="text-main-blue">{player.name}</li>)}
                        </ul>
                      </div>
                    </div>
                    <Button onClick={onSubmit}
                            disabled={head_players.length < 2 || head_players.length !== tail_players.length}
                            variant="filled" color="yellow">Randomize</Button>
                  </div>
                  }
                    {data.length > 0 &&
                    <div className="mx-auto mt-4 bg-white rounded border-2 border-orange-300 flex flex-wrap flex-col w-fit p-4">
                        <h4 className="text-lg text-main-blue font-bold">TEAMS CREATED</h4>
                        <ul className="flex flex-col">
                        { data.map(team => <li key={team.id} className="text-main-blue">{team.name}</li>) }
                        </ul>
                    </div>
                    }

                </div>
            </div>
        </GuestLayout>
    );
}
