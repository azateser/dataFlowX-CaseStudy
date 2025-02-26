import { useTeamContext } from '@/context/TeamContext'
import {
  PieChart,
  BarChart,
  Bar,
  Cell,
  Pie,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from 'recharts'
import { prepareTeamDataForPieChart, prepareTeamDataForBarChart } from '@/utils/chart'
import { CHART_COLORS, CHART_MARGIN } from '@/constants/chart'
import { Grid, Paper, Typography, Box, alpha, useTheme } from '@mui/material'

const Charts = () => {
  const { teams } = useTeamContext()
  const theme = useTheme()
  const pieChartData = prepareTeamDataForPieChart(teams)
  const lineChartData = prepareTeamDataForBarChart(teams)

  const secondPieData = teams.map((team) => {
    const percentage =
      team.users.length > 0
        ? (team.users.length * 100) / teams.reduce((acc, t) => acc + t.users.length, 0)
        : 0
    return {
      name: team.name,
      value: Number(percentage.toFixed(1)),
    }
  })

  const monthlyData = teams.map((team) => ({
    name: team.name,
    aktif: team.users.length * 2,
    pasif: team.users.length,
  }))

  if (teams.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6" color="text.secondary">
          Henüz ekip bulunmamaktadır
        </Typography>
      </Box>
    )
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Typography variant="h4" component="h1" gutterBottom>
          Ekip İstatistikleri
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Paper elevation={2} sx={{ p: 3, mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            Özet Bilgiler
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  textAlign: 'center',
                  p: 2,
                  borderRadius: 1,
                  bgcolor: alpha(
                    theme.palette.primary.main,
                    theme.palette.mode === 'dark' ? 0.2 : 0.1,
                  ),
                  border: 1,
                  borderColor: alpha(theme.palette.primary.main, 0.2),
                }}
              >
                <Typography variant="h4" color="primary.main">
                  {teams.length}
                </Typography>
                <Typography variant="subtitle1" color="text.primary">
                  Toplam Ekip
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  textAlign: 'center',
                  p: 2,
                  borderRadius: 1,
                  bgcolor: alpha(
                    theme.palette.secondary.main,
                    theme.palette.mode === 'dark' ? 0.2 : 0.1,
                  ),
                  border: 1,
                  borderColor: alpha(theme.palette.secondary.main, 0.2),
                }}
              >
                <Typography variant="h4" color="secondary.main">
                  {teams.reduce((acc, team) => acc + team.users.length, 0)}
                </Typography>
                <Typography variant="subtitle1" color="text.primary">
                  Toplam Kullanıcı
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  textAlign: 'center',
                  p: 2,
                  borderRadius: 1,
                  bgcolor: alpha(
                    theme.palette.success.main,
                    theme.palette.mode === 'dark' ? 0.2 : 0.1,
                  ),
                  border: 1,
                  borderColor: alpha(theme.palette.success.main, 0.2),
                }}
              >
                <Typography variant="h4" color="success.main">
                  {(
                    teams.reduce((acc, team) => acc + team.users.length, 0) / teams.length || 0
                  ).toFixed(1)}
                </Typography>
                <Typography variant="subtitle1" color="text.primary">
                  Ortalama Ekip Büyüklüğü
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
          <Typography variant="h6" gutterBottom>
            Ekip Büyüklükleri
          </Typography>
          <Box sx={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={(entry) => `${entry.name}: ${entry.value}`}
                >
                  {pieChartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
          <Typography variant="h6" gutterBottom>
            Ekip Dağılım Yüzdeleri
          </Typography>
          <Box sx={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={secondPieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={(entry) => `${entry.name}: %${entry.value}`}
                >
                  {secondPieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `%${value}`} />
                <Legend
                  formatter={(value) =>
                    `${value} (%${secondPieData.find((item) => item.name === value)?.value})`
                  }
                />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
          <Typography variant="h6" gutterBottom>
            Ekip Kullanıcı Sayıları
          </Typography>
          <Box sx={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={lineChartData} margin={CHART_MARGIN}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="users" fill={CHART_COLORS[0]} name="Kullanıcı Sayısı" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
          <Typography variant="h6" gutterBottom>
            Ekip Aktivite Durumu
          </Typography>
          <Box sx={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={monthlyData} margin={CHART_MARGIN}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="aktif" fill={CHART_COLORS[1]} name="Aktif Kullanıcılar" />
                <Bar dataKey="pasif" fill={CHART_COLORS[2]} name="Pasif Kullanıcılar" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Charts
