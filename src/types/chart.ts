export type ChartData = {
  name: string
  value: number
}

export type BarChartData = {
  name: string
  users: number
}

export type ChartProps = {
  data?: ChartData[] | BarChartData[]
  width?: number
  height?: number
}
