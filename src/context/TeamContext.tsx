import React, { createContext, useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { Team, TeamContextType } from '@/types/team'
import { TEST_DATA } from '@/mocks/testData'

const TeamContext = createContext<TeamContextType | undefined>(undefined)

const createTeam = (name: string): Team => ({
  id: crypto.randomUUID(),
  name,
  users: [],
})

const createUser = (name: string, teamId: string) => ({
  id: crypto.randomUUID(),
  name,
  teamId,
})

export const TeamProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [teams, setTeams] = useState<Team[]>([])

  const addTeam = (name: string) => {
    setTeams((prevTeams) => [...prevTeams, createTeam(name)])
    toast.success(`"${name}" ekibi başarıyla oluşturuldu`)
  }

  const removeTeam = (teamId: string) => {
    const teamName = teams.find((team) => team.id === teamId)?.name
    setTeams((prevTeams) => prevTeams.filter((team) => team.id !== teamId))
    toast.success(`"${teamName}" ekibi ve tüm üyeleri silindi`)
  }

  const addUser = (teamId: string, name: string) => {
    const teamName = teams.find((team) => team.id === teamId)?.name
    setTeams((prevTeams) =>
      prevTeams.map((team) =>
        team.id === teamId ? { ...team, users: [...team.users, createUser(name, teamId)] } : team,
      ),
    )
    toast.success(`"${name}" kullanıcısı "${teamName}" ekibine eklendi`)
  }

  const removeUser = (userId: string) => {
    let userName = ''
    let teamName = ''

    teams.forEach((team) => {
      const user = team.users.find((user) => user.id === userId)
      if (user) {
        userName = user.name
        teamName = team.name
      }
    })

    setTeams((prevTeams) =>
      prevTeams.map((team) => ({
        ...team,
        users: team.users.filter((user) => user.id !== userId),
      })),
    )

    toast.success(`"${userName}" kullanıcısı "${teamName}" ekibinden silindi`)
  }

  const addTestData = () => {
    setTeams(TEST_DATA)
    toast.success('Test verileri başarıyla eklendi')
  }

  const contextValue: TeamContextType = {
    teams,
    addTeam,
    removeTeam,
    addUser,
    removeUser,
    addTestData,
  }

  return <TeamContext.Provider value={contextValue}>{children}</TeamContext.Provider>
}
//eslint-disable-next-line
export const useTeamContext = () => {
  const context = useContext(TeamContext)
  if (!context) {
    throw new Error('useTeamContext must be used within a TeamProvider')
  }
  return context
}
