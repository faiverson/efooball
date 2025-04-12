import React from 'react';
import { Button } from "@material-tailwind/react";
import TeamDropdown from '@/Components/TeamDropdown';

export default function SelectionSection({
  type = 'teams', // 'teams' or 'players'
  local_teams,
  away_teams,
  first_team,
  second_team,
  showErrors,
  handleLocalTeam,
  handleAwayTeam,
  handleSubmit
}) {
  const isTeams = type === 'teams';
  const firstLabel = isTeams ? 'First Team' : 'First Player';
  const secondLabel = isTeams ? 'Second Team' : 'Second Player';
  const buttonText = isTeams ? 'Compare Teams' : 'Compare Players';
  const title = isTeams ? 'Select Teams to Compare' : 'Select Players to Compare';

  return (
    <div className="w-full max-w-4xl bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg px-6 py-4 border border-neutral-200 relative z-10">
      <h3 className="text-2xl font-bold text-center mb-4 text-primary-700">
        {title}
      </h3>
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <div className="w-full md:w-1/3">
          <TeamDropdown
            name="local_team"
            teams={local_teams}
            selected={first_team}
            onChange={handleLocalTeam}
            label={firstLabel}
            error={showErrors && first_team === '-1'}
          />
        </div>
        <div className="w-full md:w-1/3">
          <TeamDropdown
            name="away_team"
            teams={away_teams}
            selected={second_team}
            onChange={handleAwayTeam}
            label={secondLabel}
            error={showErrors && second_team === '-1'}
            disabled={first_team === '-1'}
          />
        </div>
        <div className="w-full md:w-1/4">
          <Button
            onClick={handleSubmit}
            variant="filled"
            color="blue"
            className="w-full whitespace-nowrap"
            disabled={first_team === '-1' || second_team === '-1'}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
}
