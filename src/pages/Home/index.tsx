import React from 'react'
import { useTeamContext } from '@/context/TeamContext'
import TeamForm from '@/components/TeamForm'
import UserForm from '@/components/UserForm'
import {
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

const Home = () => {
  const { teams, addTestData } = useTeamContext()

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Ekip Yönetimi
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleOutlineIcon />}
          onClick={addTestData}
        >
          Test Verisi Ekle
        </Button>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box sx={{ position: 'sticky', top: 24 }}>
            <Paper elevation={2} sx={{ p: 3, mb: 2 }}>
              <TeamForm />
            </Paper>
            <Paper elevation={2} sx={{ p: 3 }}>
              <UserForm />
            </Paper>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Mevcut Ekipler
            </Typography>
            {teams.length > 0 ? (
              <List>
                {teams.map((team, index) => (
                  <React.Fragment key={team.id}>
                    {index > 0 && <Divider />}
                    <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                      <ListItemText
                        primary={team.name}
                        primaryTypographyProps={{
                          variant: 'subtitle1',
                          fontWeight: 'medium',
                        }}
                      />
                      <Box
                        sx={{ pl: 2, borderLeft: 1, borderColor: 'divider', mt: 1, width: '100%' }}
                      >
                        {team.users.length > 0 ? (
                          team.users.map((user) => (
                            <Typography
                              key={user.id}
                              variant="body2"
                              color="text.secondary"
                              sx={{ py: 0.5 }}
                            >
                              {user.name}
                            </Typography>
                          ))
                        ) : (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontStyle: 'italic' }}
                          >
                            Henüz kullanıcı yok
                          </Typography>
                        )}
                      </Box>
                    </ListItem>
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                Henüz ekip oluşturulmadı
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Home
