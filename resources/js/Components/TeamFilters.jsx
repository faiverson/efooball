import GameVersionTags from "@/Components/GameVersionTags";
import DatePicker from "@/Components/DatePicker";
import {Input} from "@material-tailwind/react";
import React from "react";


export default function TeamFilters({ inputs, methods }) {
  const { versions, tournamentTypes, minGames, from_at, until_at } = inputs
  const { onChangeTag, onChangeMinGames, handleChange } = methods

  return (
    <div className="flex flex-col justify-start gap-2 md:flex-col">
      <div className="text-sm text-main-yellow">Filters</div>
      <GameVersionTags versions={versions} onChange={onChangeTag} />
      <Input type="number"
              min="1"
              color="yellow"
              variant="outlined"
              label="Played games"
              value={minGames}
              onChange={ev => onChangeMinGames(ev)}/>

      <DatePicker label="Since" value={from_at} onChange={val => handleChange(val, 'from_at')}  />
      <DatePicker label="Until" value={until_at} onChange={val => handleChange(val, 'until_at')} />
    </div>
  );
}
