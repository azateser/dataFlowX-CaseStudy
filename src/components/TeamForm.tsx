import React, { useState } from 'react'
import { useTeamContext } from '@/context/TeamContext'
import { TextField, Button, Box, Typography } from '@mui/material'
import GroupAddIcon from '@mui/icons-material/GroupAdd'

const TeamForm = () => {
  const [teamName, setTeamName] = useState('')
  const { addTeam } = useTeamContext()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (teamName.trim() === '') return
    addTeam(teamName)
    setTeamName('')
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Ekip Ekle
      </Typography>
      <TextField
        fullWidth
        label="Ekip Adı"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        variant="outlined"
        size="small"
        sx={{ mb: 2 }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        startIcon={<GroupAddIcon />}
        disabled={!teamName.trim()}
      >
        Ekle
      </Button>
    </Box>
  )
}

export default TeamForm
