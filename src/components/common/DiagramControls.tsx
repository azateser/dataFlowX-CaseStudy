import { Controls } from 'reactflow'
import { useTheme } from '@mui/material'
import { CONTROLS_POSITION } from '@/constants/diagram'

export const DiagramControls = () => {
  const theme = useTheme()

  return (
    <Controls
      position="bottom-right"
      style={{
        bottom: CONTROLS_POSITION.bottom,
        right: CONTROLS_POSITION.right,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
      }}
    />
  )
}
