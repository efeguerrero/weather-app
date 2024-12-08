import './styles/global.css';
import AppRouter from './router/AppRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { CssBaseline } from '@mui/material';
import { FavoriteCitiesContextProvider } from './context/FavoriteCitiesContext';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <FavoriteCitiesContextProvider>
        <CssBaseline />
        <AppRouter />
      </FavoriteCitiesContextProvider>
    </ThemeProvider>
  );
};

export default App;
