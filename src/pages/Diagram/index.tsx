import { useState } from 'react'
import ReactFlow, { Background, ReactFlowProvider, Node } from 'reactflow'
import { useTeamContext } from '@/context/TeamContext'
import { useTheme } from '@/context/ThemeContext'
import { Box, Paper, useTheme as useMuiTheme } from '@mui/material'
import { toast } from 'react-toastify'
import { BACKGROUND_CONFIG, DIAGRAM_DIMENSIONS } from '@/constants/diagram'
import { useDiagramNodes } from '@/hooks/useDiagramNodes'
import { useContextMenu } from '@/hooks/useContextMenu'
import { DiagramControls } from '@/components/common/DiagramControls'
import ContextMenu from '@/components/ContextMenu'
import 'reactflow/dist/style.css'

const Diagram = () => {
  const { isDarkMode } = useTheme()
  const theme = useMuiTheme()
  const { teams, removeUser, removeTeam } = useTeamContext()
  const [hiddenUsers, setHiddenUsers] = useState<string[]>([])

  const handleToggleUsers = (teamId: string, isHiding: boolean) => {
    const team = teams.find((t) => t.id === teamId)
    if (!team) return

    toast.info(
      isHiding
        ? `"${team.name}" ekibinin kullanıcıları gizlendi`
        : `"${team.name}" ekibinin kullanıcıları gösterildi`,
    )

    setHiddenUsers((prev) => (isHiding ? [...prev, teamId] : prev.filter((id) => id !== teamId)))
  }

  const { nodes, edges } = useDiagramNodes(teams, hiddenUsers)
  const { menu, handleOpen, handleClose, handleDelete, handleToggle } = useContextMenu({
    teams,
    hiddenUsers,
    removeTeam,
    removeUser,
    onToggleUsers: handleToggleUsers,
  })

  return (
    <Box sx={{ width: '100%', height: DIAGRAM_DIMENSIONS.height, position: 'relative' }}>
      <ReactFlowProvider>
        <Paper
          elevation={0}
          sx={{
            width: '100%',
            height: '100%',
            bgcolor: 'background.default',
            borderRadius: 0,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodeContextMenu={(event: React.MouseEvent, node: Node) => {
              event.preventDefault()
              handleOpen(
                event,
                node.id,
                teams.some((t) => t.id === node.id),
              )
            }}
            onPaneClick={handleClose}
            fitView
            defaultEdgeOptions={{
              type: 'smoothstep',
              style: { stroke: isDarkMode ? theme.palette.grey[500] : '#999' },
            }}
            proOptions={{ hideAttribution: true }}
          >
            <Background
              color={isDarkMode ? theme.palette.grey[700] : '#aaa'}
              gap={BACKGROUND_CONFIG.gap}
              size={BACKGROUND_CONFIG.size}
            />
            <DiagramControls />
          </ReactFlow>
          {menu.show && (
            <ContextMenu
              x={menu.x}
              y={menu.y}
              isTeam={menu.isTeam}
              isHidden={hiddenUsers.includes(menu.nodeId)}
              onDelete={handleDelete}
              onToggleUsers={menu.isTeam ? handleToggle : undefined}
              onClose={handleClose}
            />
          )}
        </Paper>
      </ReactFlowProvider>
    </Box>
  )
}

export default Diagram
