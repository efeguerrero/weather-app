import { createTheme, Shadows } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      light: '#e4e4e7',
      main: '#d4d4d8',
      dark: '#a1a1aa',
      contrastText: '#09090b',
    },
    secondary: {
      light: '#6d28d9',
      main: '#5b21b6',
      dark: '#4c1d95',
      contrastText: '#f5f3ff',
    },
    warning: {
      main: '#b45309',
    },
    error: {
      main: '#b91c1c',
    },
    success: {
      main: '#15803d',
    },
    text: {
      primary: '#09090b',
      secondary: '#5b21b6',
    },
    action: {
      active: '#71717a',
    },
    background: {
      default: '#f4f4f5',
    },
  },
  typography: {
    fontFamily: 'Geist, sans-serif',
  },
  shadows: Array(25).fill('none') as Shadows,
  components: {
    MuiCardContent: {
      styleOverrides: {
        root: {
          backgroundColor: '#fafafa',
          border: 'none',
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '1rem',
        },
        elevation1: {
          boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px;',
        },
      },
    },
  },
});

export default theme;
