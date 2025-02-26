export interface User {
  id: string
  name: string
  teamId: string
}

export interface Team {
  id: string
  name: string
  users: User[]
}

export interface TeamContextType {
  teams: Team[]
  addTeam: (name: string) => void
  removeTeam: (teamId: string) => void
  addUser: (teamId: string, name: string) => void
  removeUser: (userId: string) => void
  addTestData: () => void
}

export interface ContextMenuState {
  show: boolean
  x: number
  y: number
  nodeId: string
  isTeam: boolean
}
