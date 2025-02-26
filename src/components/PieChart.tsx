import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'
import { useTeamContext } from '@/context/TeamContext'
import { CHART_COLORS } from '@/constants/chart'

const PieChartComponent = () => {
  const { teams } = useTeamContext()

  const data = teams.map((team, index) => ({
    name: team.name,
    value: team.users.length,
    color: CHART_COLORS[index % CHART_COLORS.length],
  }))

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">Ekip Kullanıcı Dağılımı</h2>
      <PieChart width={400} height={300}>
        <Pie data={data} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  )
}

export default PieChartComponent
