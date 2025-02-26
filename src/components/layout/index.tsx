import { Box, Container } from '@mui/material'
import { Header } from './header'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header />
      <Container>{children}</Container>
    </Box>
  )
}

export default Layout
