import { Node, Edge } from 'reactflow'
import { Team } from '@/types/team'
import { useTheme } from '@/context/ThemeContext'
import { useTheme as useMuiTheme } from '@mui/material'
import { NODE_POSITIONS, NODE_STYLES } from '@/constants/diagram'

export const useDiagramNodes = (teams: Team[], hiddenUsers: string[]) => {
  const { isDarkMode } = useTheme()
  const theme = useMuiTheme()

  const createTeamNode = (team: Team, index: number): Node => ({
    id: team.id,
    type: 'default',
    position: { x: NODE_POSITIONS.TEAM.X, y: index * NODE_POSITIONS.TEAM.Y_SPACING },
    data: { label: team.name },
    style: {
      background: isDarkMode ? theme.palette.grey[800] : '#fff',
      border: `1px solid ${isDarkMode ? theme.palette.grey[700] : '#ddd'}`,
      borderRadius: NODE_STYLES.borderRadius,
      padding: NODE_STYLES.padding,
      color: theme.palette.text.primary,
    },
  })

  const createUserNode = (user: Team['users'][0], teamIndex: number, userIndex: number): Node => ({
    id: user.id,
    type: 'default',
    position: {
      x: NODE_POSITIONS.USER.X,
      y: teamIndex * NODE_POSITIONS.TEAM.Y_SPACING + userIndex * NODE_POSITIONS.USER.Y_SPACING,
    },
    data: { label: user.name },
    style: {
      background: isDarkMode ? theme.palette.grey[900] : '#f5f5f5',
      border: `1px solid ${isDarkMode ? theme.palette.grey[700] : '#ddd'}`,
      borderRadius: NODE_STYLES.borderRadius,
      padding: NODE_STYLES.padding,
      color: theme.palette.text.primary,
    },
  })

  const createEdge = (teamId: string, userId: string): Edge => ({
    id: `${teamId}-${userId}`,
    source: teamId,
    target: userId,
    type: 'smoothstep',
    style: { stroke: isDarkMode ? theme.palette.grey[500] : '#999' },
  })

  const nodes: Node[] = []
  teams.forEach((team, teamIndex) => {
    const teamNode = createTeamNode(team, teamIndex)
    nodes.push(teamNode)

    if (!hiddenUsers.includes(team.id)) {
      team.users.forEach((user, userIndex) => {
        const userNode = createUserNode(user, teamIndex, userIndex)
        nodes.push(userNode)
      })
    }
  })

  const edges: Edge[] = []
  teams.forEach((team) => {
    if (!hiddenUsers.includes(team.id)) {
      team.users.forEach((user) => {
        const edge = createEdge(team.id, user.id)
        edges.push(edge)
      })
    }
  })

  return { nodes, edges }
}
