import {useState} from "react"
import Head from 'next/head'
import { Input, Button } from "@material-tailwind/react";
import { useAuth } from '@/hooks/auth'
import axios from '@/lib/axios'
import {DateTime} from 'luxon';
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

  const handleChange = (ev, field) => {
    ev.preventDefault()
    const date = DateTime.fromFormat(ev.target.value, 'yyyy-MM-dd');
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
      filters += `&start_at=${from_at.toFormat('yyyy-MM-dd')}`;
    }

    if(!!until_at) {
      filters += `&end_at=${until_at.toFormat('yyyy-MM-dd')}`;
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

  console.log(stats)

  return (
    <>
        <Head>
            <title>Martes de Play</title>
        </Head>
        <div className="flex flex-col items-top">
          <header className="flex justify-center pt-4 pb-2 md:pt-8 md:pb-4">
            <Logo />
          </header>
          <div className="flex flex-col md:flex-row md:justify-between p-2 md:p-8">
            <div className="flex flex-col gap-2 px-4 md:w-80 ">
              <div>Filtros</div>
                <GameVersionTags versions={versions} onChange={onChangeTag} />
                <Input type={"number"} color="yellow" variant="outlined" label="Partidos Jugados" value={minGames} onChange={ev => onChangeMinGames(ev)} />
                <Input type={"date"} color="yellow" variant="outlined" label="Fecha desde" value={from_at ? from_at.toFormat('yyyy-MM-dd') : ''} onChange={ev => handleChange(ev, 'from_at')} />
                <Input type={"date"} color="yellow" variant="outlined" label="Fecha hasta" value={until_at ? until_at.toFormat('yyyy-MM-dd') : ''} onChange={ev => handleChange(ev, 'until_at')} />
                <Button onClick={send} variant="filled" color="yellow">Filtrar</Button>
              </div>
            <div className="">
              <table className="table pes-table">
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


export default Home
