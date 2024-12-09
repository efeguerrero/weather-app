import { Outlet } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate, useLocation } from 'react-router-dom';

function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <AppBar
        position="fixed"
        sx={{
          borderBottom: '1px solid',
          borderColor: (theme) => theme.palette.primary.light,
          boxShadow: 'none',
          backgroundColor: '#fafafa',
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
                {location.pathname === '/' ? (
                  <HomeIcon />
                ) : (
                  <HomeOutlinedIcon />
                )}
              </IconButton>
              <IconButton
                color="secondary"
                onClick={() => navigate('/favorites')}
              >
                {location.pathname.startsWith('/favorites') ? (
                  <FavoriteIcon />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </IconButton>
            </Box>
          </Toolbar>
        </Box>
      </AppBar>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          width: '100%',
          maxWidth: 'sm',
          marginTop: '56px', // Height of the AppBar
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;
