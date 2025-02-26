import { Menu, MenuItem, ListItemIcon, ListItemText, Divider } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

interface ContextMenuProps {
  x: number
  y: number
  isTeam: boolean
  isHidden?: boolean
  onDelete: () => void
  onToggleUsers?: () => void
  onClose: () => void
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  x,
  y,
  isTeam,
  isHidden = false,
  onDelete,
  onToggleUsers,
  onClose,
}) => {
  return (
    <Menu
      open
      onClose={onClose}
      anchorReference="anchorPosition"
      anchorPosition={{ top: y, left: x }}
      elevation={3}
    >
      {isTeam && onToggleUsers && (
        <>
          <MenuItem onClick={onToggleUsers}>
            <ListItemIcon>
              {isHidden ? (
                <VisibilityIcon fontSize="small" />
              ) : (
                <VisibilityOffIcon fontSize="small" />
              )}
            </ListItemIcon>
            <ListItemText>
              {isHidden ? 'Kullanıcıları Göster' : 'Kullanıcıları Gizle'}
            </ListItemText>
          </MenuItem>
          <Divider />
        </>
      )}
      <MenuItem onClick={onDelete} sx={{ color: 'error.main' }}>
        <ListItemIcon>
          <DeleteIcon fontSize="small" color="error" />
        </ListItemIcon>
        <ListItemText>{isTeam ? 'Ekibi Sil' : 'Kullanıcıyı Sil'}</ListItemText>
      </MenuItem>
    </Menu>
  )
}

export default ContextMenu
