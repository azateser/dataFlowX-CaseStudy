import { Team } from '@/types/team'
import { ChartData, BarChartData } from '@/types/chart'

export const prepareTeamDataForPieChart = (teams: Team[]): ChartData[] => {
  return teams.map((team) => ({
    name: team.name,
    value: team.users.length,
  }))
}

export const prepareTeamDataForBarChart = (teams: Team[]): BarChartData[] => {
  return teams.map((team) => ({
    name: team.name,
    users: team.users.length,
  }))
}
