import {useState} from "react"
import Head from 'next/head'
import { useAuth } from '@/hooks/auth'
import Logo from 'components/Logo'
import {GameVersion} from '@/lib/enums'
import axios from '@/lib/axios'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import GameVersionTags from "@/components/GameVersionTags"

import { TextField, Button, FormLabel } from '@mui/material';



function Home({teams}) {
    // const { user } = useAuth({ middleware: 'guest' })
  const [stats, setStats] = useState(teams)
  const [versions, setVersions] = useState(Object.keys(GameVersion).map(item => ({active: false, name: item})))
  const [minGames, setMinGames] = useState('')

  const onChangeTag = tag => {
    const newVersions = [...versions]
    const idx = newVersions.findIndex(item => item.name === tag)
    newVersions[idx].active = !newVersions[idx].active
    setVersions(newVersions)
  }

  const onChangeMinGames = ev => {
    ev.preventDefault()
    setMinGames(ev.target.value)
  }

  const send = async ev => {
    ev.preventDefault()
    const response = await axios.create({
      baseURL: 'http://localhost:8005',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*',
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
      withCredentials: true,
    }).get(`api/team_stats?versions=${versions.filter(item => item.active).map(item => item.name).join(',')}&min_amount=${minGames}`)
      .then(res => res.data)
      .catch(error => console.log(error));

    setStats(response?.data)
  }

  return (
    <>
        <Head>
            <title>Martes de Play</title>
        </Head>
        <div className="flex items-top flex-col items-center ">
          <header className="flex justify-start pt-8 sm:justify-start sm:pt-8">
            <Logo />
          </header>
          <div className="grid grid-cols-3 min-h-screen container bg-none">
            <div className="flex flex-col w-40">
              <FormLabel component="legend" className="yellow-light">Filtros:</FormLabel>
              <GameVersionTags versions={versions} onChange={onChangeTag} />
              <br />
              <TextField type={"number"} label="Partidos Jugados" variant="outlined" onChange={ev => onChangeMinGames(ev)} />
              <LocalizationProvider dateAdapter={AdapterLuxon}>
                <DesktopDatePicker
                  label="Date desktop"
                  inputFormat="MM/dd/yyyy"
                  value={value}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <Button onClick={send} variant="contained" color="primary">Filtrar</Button>
            </div>
            <div className="">
              <table className="mt-8 table pes-table">
                <thead>
                <tr>
                  <th>Equipos</th>
                  <th>Porcentaje</th>
                  <th>Record</th>
                </tr>
                </thead>
                <tbody>
                {
                  stats.map((item, i) => {
                    const {name, win, draw, lost, average} = item
                    const record = `${win}-${draw}-${lost}`
                    return (
                      <tr key={i}>
                        <td>{name}</td>
                        <td>{average}%</td>
                        <td>{record}</td>
                      </tr>
                    )
                  })
                }
                </tbody>
              </table>
            </div>
          </div>
        </div>
    </>
  )
}


Home.getInitialProps = async (ctx) => {
  const response = await axios.get('api/team_stats')
    .then(res => res.data)
    .catch(error => console.log(error));

  return {teams: response?.data || []}
}

// export async function getServerSideProps(context) {
//   console.log(context);
//   const response = await axios.get('api/team_stats')
//     .then(res => res.data)
//     .catch(error => console.log(error));
//
//   return {
//     props: {
//       teams: response?.data || []
//     },
//   }
// }
export default Home
