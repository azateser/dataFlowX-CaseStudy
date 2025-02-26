import { useState } from 'react'
import { Team, ContextMenuState } from '@/types/team'

interface Props {
  teams: Team[]
  hiddenUsers: string[]
  removeTeam: (id: string) => void
  removeUser: (id: string) => void
  onToggleUsers: (teamId: string, isHiding: boolean) => void
}

export const useContextMenu = ({
  teams,
  hiddenUsers,
  removeTeam,
  removeUser,
  onToggleUsers,
}: Props) => {
  const [menu, setMenu] = useState<ContextMenuState>({
    show: false,
    x: 0,
    y: 0,
    nodeId: '',
    isTeam: false,
  })

  const handleOpen = (event: React.MouseEvent, nodeId: string, isTeam: boolean) => {
    event.preventDefault()
    setMenu({ show: true, x: event.clientX, y: event.clientY, nodeId, isTeam })
  }

  const handleClose = () => {
    setMenu((prev) => ({ ...prev, show: false }))
  }

  const handleDelete = () => {
    // eslint-disable-next-line
    menu.isTeam ? removeTeam(menu.nodeId) : removeUser(menu.nodeId)
    handleClose()
  }

  const handleToggle = () => {
    const team = teams.find((t) => t.id === menu.nodeId)
    if (!team) return

    onToggleUsers(menu.nodeId, !hiddenUsers.includes(menu.nodeId))
    handleClose()
  }

  return { menu, handleOpen, handleClose, handleDelete, handleToggle }
}
