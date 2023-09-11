import GameVersionTags from "@/Components/GameVersionTags";
import {Button, Input} from "@material-tailwind/react";
import React from "react";


export default function PlayerStats({ inputs, methods }) {
  const { versions, minGames, from_at, until_at } = inputs
  const { onChangeTag, onChangeMinGames, handleChange, onSubmit } = methods

  return (
    <div className="flex flex-col justify-start gap-2 md:flex-col p-2 md:w-80 md:p-8">
      <div className="text-sm text-main-yellow">Filters</div>
      <GameVersionTags versions={versions} onChange={onChangeTag} />
      {!!minGames && <Input type="number"
                            color="yellow"
                            variant="outlined"
                            label="Played games"
                            value={minGames}
                            onChange={ev => onChangeMinGames(ev)}/>
      }
      <Input type="date" color="yellow" variant="outlined" label="Since" value={from_at ? from_at.toFormat('yyyy-MM-dd') : ''} onChange={ev => handleChange(ev, 'from_at')} />
      <Input type="date" color="yellow" variant="outlined" label="Until" value={until_at ? until_at.toFormat('yyyy-MM-dd') : ''} onChange={ev => handleChange(ev, 'until_at')} />
      <Button onClick={onSubmit} variant="filled" color="yellow">Apply Filter</Button>
    </div>
  );
}
