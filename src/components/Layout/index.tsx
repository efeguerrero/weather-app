import { Outlet } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';

function Layout() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 'none',
          backgroundColor: (theme) => theme.palette.background.default,
          width: '100%',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Toolbar
            sx={{
              justifyContent: 'space-between',
              width: '100%',
              maxWidth: 'xl',
            }}
          >
            <Typography fontWeight={600} color="text.secondary" variant="h6">
              Weather App
            </Typography>
            <Box>
              <IconButton color="secondary" onClick={() => navigate('/')}>
                <HomeIcon />
              </IconButton>
              <IconButton
                color="secondary"
                onClick={() => navigate('/favorites')}
              >
                <FavoriteIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Box>
      </AppBar>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: '100%',
          maxWidth: 'sm',
          marginTop: '64px', // Height of the AppBar
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;
