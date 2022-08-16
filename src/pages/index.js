import Head from 'next/head'
import { useAuth } from '@/hooks/auth'
import Logo from 'components/Logo'
import axios from '@/lib/axios'

export default function Home({teams}) {
    // const { user } = useAuth({ middleware: 'guest' })

    return (
        <>
            <Head>
                <title>Martes de Play</title>
            </Head>
            <div className="flex items-top flex-col items-center ">
              <div className="flex items-top flex-col items-center min-h-screen items-start container background-dark">
                <header className="flex justify-start pt-8 sm:justify-start sm:pt-8">
                  <Logo />
                </header>
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
                    teams.map((item, i) => {
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
        </>
    )
}


export async function getServerSideProps(context) {
  console.log(context);
  const response = await axios.get('api/team_stats')
    .then(res => res.data)
    .catch(error => console.log(error));

  return {
    props: {
      teams: response?.data || []
    },
  }
}
