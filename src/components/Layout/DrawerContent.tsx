import { ListItemText, useTheme } from '@mui/material';
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/ExitToApp';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';

interface NavigationItem {
  text: string;
  icon: JSX.Element;
  path: string;
}

const navigationItems: NavigationItem[] = [
  { text: 'Home', icon: <HomeIcon />, path: '/home' },
  { text: 'Favorite Cities', icon: <FavoriteIcon />, path: '/favorites' },
];

interface DrawerContentProps {
  setIsMobileDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DrawerContent = ({ setIsMobileDrawerOpen }: DrawerContentProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      setIsMobileDrawerOpen(false);
    }
  };

  const handleLogout = () => {
    console.log('Logged out');
  };

  return (
    <>
      <Toolbar>
        <Typography color="text.secondary" fontWeight={600} variant="h5">
          Weather App
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {navigationItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              sx={{ '&:hover': { backgroundColor: 'primary.light' } }}
              onClick={() => handleNavigation(item.path)}
            >
              <ListItemIcon sx={{ minWidth: 0, marginRight: 2 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ marginTop: 'auto' }}>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton
            sx={{ '&:hover': { backgroundColor: 'primary.light' } }}
            onClick={handleLogout}
          >
            <ListItemIcon sx={{ minWidth: 0, marginRight: 2 }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Log Out" />
          </ListItemButton>
        </ListItem>
      </Box>
    </>
  );
};

export default DrawerContent;
