import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { AppBar, Toolbar, Button, Box, IconButton } from '@mui/material'
import { useTheme } from '@/context/ThemeContext'
import { Link } from 'react-router'

export const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <AppBar position="static" sx={{ mb: 3 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button component={Link} to="/" color="inherit">
            Ana Sayfa
          </Button>
          <Button component={Link} to="/diagram" color="inherit">
            Diyagram
          </Button>
          <Button component={Link} to="/charts" color="inherit">
            Grafikler
          </Button>
        </Box>
        <IconButton onClick={toggleTheme} color="inherit">
          {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
