import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from '@mui/material';
import DrawerContent from './DrawerContent';
import MenuIcon from '@mui/icons-material/Menu';

const DRAWER_WIDTH = 260;

const Layout = () => {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsMobileDrawerOpen(!isMobileDrawerOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { sm: `${DRAWER_WIDTH}px` },
          display: { sm: 'none' },
          boxShadow: 'none',
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        <Toolbar variant="regular" sx={{ justifyContent: 'space-between' }}>
          <Typography fontWeight={600} color="text.secondary" variant="h6">
            Weather App
          </Typography>
          <IconButton
            color="secondary"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={isMobileDrawerOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
            },
          }}
        >
          <DrawerContent setIsMobileDrawerOpen={setIsMobileDrawerOpen} />
        </Drawer>

        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
            },
          }}
          open
        >
          <DrawerContent setIsMobileDrawerOpen={setIsMobileDrawerOpen} />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          marginTop: { xs: '80px', sm: 0 },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
