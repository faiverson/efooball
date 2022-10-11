import {useState} from "react"
import Head from 'next/head'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { TextField, Button, FormLabel } from '@mui/material'
import { useAuth } from '@/hooks/auth'
import axios from '@/lib/axios'
import {GameVersion} from '@/lib/enums'
import Logo from 'components/Logo'
import GameVersionTags from "@/components/GameVersionTags"

function Home({teams}) {
    // const { user } = useAuth({ middleware: 'guest' })
  const [stats, setStats] = useState(teams)
  const [versions, setVersions] = useState(Object.keys(GameVersion).map(item => ({active: false, name: item})))
  const [minGames, setMinGames] = useState('')
  const [from_at, setFromAt] = useState()
  const [until_at, setUntilAt] = useState()

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

  const handleChange = (field, date) => {
    if(field === 'from_at') {
      setFromAt(date)
    } else if(field === 'until_at') {
      setUntilAt(date)
    }
  }

  const send = async ev => {
    ev.preventDefault()
    let filters = `?versions=${versions.filter(item => item.active).map(item => item.name).join(',')}`;
    if(!!minGames) {
      filters += `&min_amount=${minGames}`;
    }

    if(!!from_at) {
      filters += `&start_at=${from_at.toFormat('dd-MM-yyyy')}`;
    }

    if(!!until_at) {
      filters += `&end_at=${until_at.toFormat('dd-MM-yyyy')}`;
    }

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
    }).get(`api/team_stats${filters}`)
      .then(res => res.data)
      .catch(error => console.log(error));

    setStats(response?.data)
  }

  return (
    <>
        <Head>
            <title>Martes de Play</title>
        </Head>
        <div className="flex flex-col items-top">
          <header className="flex justify-center pt-8 pb-4">
            <Logo />
          </header>
          <div className="grid grid-flow-col">
            <div className="flex flex-col gap-2 px-4">
                <FormLabel component="legend" color="secondary">Filtros:</FormLabel>
                <GameVersionTags versions={versions} onChange={onChangeTag} />
                <TextField type={"number"} color="secondary" variant="filled" label="Partidos Jugados" onChange={ev => onChangeMinGames(ev)} />
                <DesktopDatePicker
                  mask="__/__/____"
                  label="Fecha desde"
                  inputFormat="dd/MM/yyyy"
                  value={from_at ? from_at.toLocaleString() : null}
                  onChange={val => handleChange('from_at', val)}
                  renderInput={(params) => <TextField color="secondary" variant="filled"  {...params} />} />
                <DesktopDatePicker
                  mask="__/__/____"
                  label="Fecha hasta"
                  inputFormat="dd/MM/yyyy"
                  value={until_at ? until_at.toLocaleString() : null}
                  onChange={val => handleChange('until_at', val)}
                  renderInput={(params) => <TextField {...params} />} />
                <Button onClick={send} variant="contained" color="secondary">Filtrar</Button>
              </div>
            {/*<div className="">*/}
            {/*  <table className="table pes-table">*/}
            {/*    <thead>*/}
            {/*    <tr>*/}
            {/*      <th>Equipos</th>*/}
            {/*      <th>Porcentaje</th>*/}
            {/*      <th>Record</th>*/}
            {/*    </tr>*/}
            {/*    </thead>*/}
            {/*    <tbody>*/}
            {/*    {*/}
            {/*      stats.map((item, i) => {*/}
            {/*        const {name, win, draw, lost, average} = item*/}
            {/*        const record = `${win}-${draw}-${lost}`*/}
            {/*        return (*/}
            {/*          <tr key={i}>*/}
            {/*            <td>{name}</td>*/}
            {/*            <td>{average}%</td>*/}
            {/*            <td>{record}</td>*/}
            {/*          </tr>*/}
            {/*        )*/}
            {/*      })*/}
            {/*    }*/}
            {/*    </tbody>*/}
            {/*  </table>*/}
            {/*</div>*/}
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


export default Home
