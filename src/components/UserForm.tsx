import React, { useState } from 'react'
import { useTeamContext } from '@/context/TeamContext'
import {
  TextField,
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

const UserForm = () => {
  const [userName, setUserName] = useState('')
  const [selectedTeam, setSelectedTeam] = useState('')
  const { teams, addUser } = useTeamContext()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (userName.trim() === '' || selectedTeam === '') return
    addUser(selectedTeam, userName)
    setUserName('')
  }

  const handleTeamChange = (event: SelectChangeEvent) => {
    setSelectedTeam(event.target.value)
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Kullanıcı Ekle
      </Typography>
      <FormControl fullWidth size="small" sx={{ mb: 2 }}>
        <InputLabel>Ekip Seç</InputLabel>
        <Select value={selectedTeam} label="Ekip Seç" onChange={handleTeamChange}>
          <MenuItem value="">
            <em>Ekip Seçin</em>
          </MenuItem>
          {teams.map((team) => (
            <MenuItem key={team.id} value={team.id}>
              {team.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        fullWidth
        label="Kullanıcı Adı"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        variant="outlined"
        size="small"
        sx={{ mb: 2 }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        startIcon={<PersonAddIcon />}
        disabled={!userName.trim() || !selectedTeam}
      >
        Ekle
      </Button>
    </Box>
  )
}

export default UserForm
