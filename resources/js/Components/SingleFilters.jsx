import React from "react";
import TournamentTypeTags from "./TournamentTypeTags";


export default function TeamFilters({ inputs, methods }) {
  const { tournamentTypes } = inputs
  const { onChangeModality } = methods

  return (
    <div className="flex flex-col justify-start gap-2 md:flex-col">
      <TournamentTypeTags tournamentTypes={tournamentTypes} onChange={onChangeModality} />
    </div>
  );
}
