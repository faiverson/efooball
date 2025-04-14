import React, { useState } from 'react'
import { Head } from '@inertiajs/react'
import StatsFilters from '@/Components/StatsFilters'
import GuestLayout from '@/Layouts/GuestLayout';
import { Accordion, AccordionHeader, AccordionBody, Chip } from "@material-tailwind/react";
import { useStatsFilterForm } from '@/Hooks/useStatsFilterForm';
import { TrophyIcon, CalendarIcon, ScaleIcon, TagIcon } from "@heroicons/react/24/outline";
import { parseTag, groupMatchesByVersion, groupMatchesByDate, formatDate } from '@/utils/index';
import SelectionSection from '@/Components/SelectionSection';
import Score from '@/Components/Score';

export default function TeamVersus({ teams, current_version, start_at, end_at, min_amount, modality }) {
  const local_teams = teams.map(team => ({...team, id: String(team.id), players: team.players.map(p => p.id)}));

    const [first_team, setFirstTeam] = useState('-1')
    const [second_team, setSecondTeam] = useState('-1')
    const [away_teams, setAwayTeams] = useState([])
  const [showErrors, setShowErrors] = useState(false)
  const [openAccordion, setOpenAccordion] = useState(1);

  const {
    stats,
    versions,
    tournamentTypes,
    minGames,
    from_at,
    until_at,
    onChangeTag,
    onChangeModality,
    onChangeMinGames,
    handleChange,
    onSubmit
  } = useStatsFilterForm({
    baseUrl: 'team_versus',
    current_version,
    start_at,
    end_at,
    min_amount
  });

  const handleSubmit = (ev) => {
    ev.preventDefault();

    if (first_team === '-1' || second_team === '-1') {
      setShowErrors(true);
      return;
    }

    const teamFilters = `first_team_id=${first_team}&second_team_id=${second_team}`;
    onSubmit(ev, teamFilters);
  };

    const handleLocalTeam = id => {
      setFirstTeam(id)
      const idx = local_teams.findIndex(item => item.id === id);
    const away = local_teams && local_teams.filter(team => !team.players.some(player_id => local_teams[idx].players.includes(player_id)))
      setSecondTeam('-1')
      setAwayTeams(away);
    setShowErrors(false)
  }

  const handleAwayTeam = id => {
    setSecondTeam(id)
    setShowErrors(false)
  }

  const handleAccordion = (value) => {
    setOpenAccordion(openAccordion === value ? 0 : value);
  };

  console.log(stats);

    return (
        <GuestLayout>
            <Head><title>Team Head to Head</title></Head>
      <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 py-2">
        <div className="flex">
          {/* Sidebar with Filters */}
          <div className="w-72 flex-shrink-0 sticky top-0 h-screen overflow-y-auto">
            <StatsFilters
              versions={versions}
              minGames={minGames}
              from_at={from_at}
              until_at={until_at}
              tournamentTypes={tournamentTypes}
              onChangeTag={onChangeTag}
              onChangeMinGames={onChangeMinGames}
              handleChange={handleChange}
              onChangeModality={onChangeModality}
              onSubmit={handleSubmit}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex flex-col items-center gap-4 p-4">
              <SelectionSection
                local_teams={local_teams}
                away_teams={away_teams}
                first_team={first_team}
                second_team={second_team}
                showErrors={showErrors}
                handleLocalTeam={handleLocalTeam}
                handleAwayTeam={handleAwayTeam}
                handleSubmit={handleSubmit}
              />

              {/* Results Section */}
              { stats?.first_team && stats?.second_team && (
                <div className="w-full max-w-4xl bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg px-8 py-4 border border-neutral-200 mt-2 relative z-0">
                  <div className="flex flex-col gap-6">
                    {stats?.games?.length > 0 && (
                      <>
                      {/* Head to Head Summary */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="flex items-center gap-2 text-teal-600">
                          <TrophyIcon className="h-6 w-6" />
                          <h4 className="text-xl font-semibold">Head to Head Summary</h4>
                        </div>
                        <div className="flex items-center gap-4 text-xl">
                          <span className="font-bold text-teal-700">{stats.first_team.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="px-4 py-2 bg-teal-50 rounded-full text-teal-700 font-medium">
                              {`${stats.totals.first_team_win}-${stats.totals.draw}-${stats.totals.first_team_lost}`}
                            </span>
                          </div>
                          <span className="font-bold text-teal-700">{stats.second_team.name}</span>
                        </div>
                        <div className="w-full flex items-center gap-2 text-neutral-600 text-sm">
                          <TagIcon className="h-4 w-4 mt-0.5 text-teal-500" />
                          <span>Versions:</span>
                          <div className="flex flex-wrap gap-2">
                            {versions.filter(v => v.active).map((v, index) => (
                              <Chip
                                key={index}
                                value={parseTag(v.name)}
                                className="bg-teal-50 text-teal-600"
                              />
                            ))}
                          </div>
                        </div>
                    </div>

                    {/* Match History */}
                    <div className="flex items-center gap-2 text-blue-600">
                      <CalendarIcon className="h-6 w-6" />
                      <h4 className="text-xl font-semibold">Match History</h4>
                      <span className="text-sm text-blue-500 font-semibold">
                        ({stats.games.length} matches)
                      </span>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-2">
                        {Object.entries(groupMatchesByVersion(stats.games)).map(([version, matches], index) => (
                          <Accordion
                            key={version}
                            open={openAccordion === index + 1}
                            className="border border-neutral-200 rounded-lg overflow-hidden"
                          >
                            <AccordionHeader
                              onClick={() => handleAccordion(index + 1)}
                              className="bg-blue-50 px-4 py-3 hover:bg-blue-100"
                            >
                              <div className="flex items-center gap-2 text-blue-700">
                                <TagIcon className="h-5 w-5" />
                                <span className="font-semibold uppercase">{parseTag(version)}</span>
                                <span className="text-sm text-blue-500 font-semibold ml-2">
                                  ({matches.length} matches)
                                </span>
                              </div>
                            </AccordionHeader>
                            <AccordionBody className="px-0">
                              <div className="grid gap-2 p-2">
                                {Object.entries(groupMatchesByDate(matches)).map(([date, dateMatches]) => (
                                  <div key={date} className="flex flex-col gap-2">
                                    <div className="flex items-center justify-end gap-2 text-neutral-500 text-sm">
                                      <span>{formatDate(date)}</span>
                                      <CalendarIcon className="h-4 w-4" />
                                      {dateMatches.length > 1 && (
                                        <span className="text-xs bg-blue-50 text-blue-500 px-1.5 py-0.5 rounded-full">
                                          {dateMatches.length} matches
                                        </span>
                                      )}
                                    </div>
                                    {dateMatches.map((match, i) => {
                                      const {team_home_score, team_away_score, played_at} = match
                                      const isFirstTeamWin = team_home_score > team_away_score
                                      const isDraw = team_home_score === team_away_score

                                      return (
                                        <div
                                          key={i}
                                          className="flex items-center justify-between p-2 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors"
                                        >
                                          <Score
                                            homeName={stats?.first_team?.name}
                                            awayName={stats?.second_team?.name}
                                            homeScore={team_home_score}
                                            awayScore={team_away_score}
                                            isHomeWinner={isFirstTeamWin}
                                            isAwayWinner={!isFirstTeamWin && !isDraw}
                                            isDraw={isDraw}
                                            homeColor="text-blue-600"
                                            awayColor="text-blue-600"
                                          />
                                        </div>
                                      )
                                    })}
                                  </div>
                                ))}
                              </div>
                            </AccordionBody>
                          </Accordion>
                        ))}
                      </div>
                    </div>
                      </>
)}

                      <div className="text-center py-8">
                        <div className="flex flex-col items-center gap-2 text-neutral-600">
                          <ScaleIcon className="h-8 w-8" />
                          <p className="text-lg">No matches between {stats.first_team.name} and {stats.second_team.name}</p>
                        </div>
                        </div>
                  </div>
                </div>
                      )}
            </div>
          </div>
        </div>
            </div>
        </GuestLayout>
    );
}
