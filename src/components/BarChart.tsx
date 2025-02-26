import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { useTeamContext } from '@/context/TeamContext'

const BarChartComponent = () => {
  const { teams } = useTeamContext()

  const data = teams.map((team) => ({
    name: team.name,
    users: team.users.length,
  }))

  return (
    <div className="p-4 border rounded-lg shadow-md mt-4">
      <h2 className="text-lg font-semibold mb-2">Ekip Kullanıcı Sayısı</h2>
      <BarChart width={400} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="users" fill="#82ca9d" />
      </BarChart>
    </div>
  )
}

export default BarChartComponent
