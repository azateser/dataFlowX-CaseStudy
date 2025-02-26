import { Team } from '@/types/team'

export const TEST_DATA: Team[] = [
  {
    id: '1',
    name: 'Frontend Ekibi',
    users: [
      { id: 'fe1', name: 'Azat ESER', teamId: '1' },
      { id: 'fe2', name: 'Zeynep ULUÇAY', teamId: '1' },
      { id: 'fe3', name: 'Atlas', teamId: '1' },
    ],
  },
  {
    id: '2',
    name: 'Backend Ekibi',
    users: [
      { id: 'be1', name: 'Haluk İŞCAN', teamId: '2' },
      { id: 'be2', name: 'Kadir Can ÇİFTÇİ', teamId: '2' },
      { id: 'be3', name: 'Olgu SIRMAN', teamId: '2' },
      { id: 'be4', name: 'Tarkan KAYA', teamId: '2' },
    ],
  },
  {
    id: '3',
    name: 'Tasarım Ekibi',
    users: [
      { id: 'de1', name: 'Ayten ESER', teamId: '3' },
      { id: 'de2', name: 'Habip ESER', teamId: '3' },
    ],
  },
]
