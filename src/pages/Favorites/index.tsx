import { useFavoriteCitiesContext } from '../../context/FavoriteCitiesContext';
import { WeatherSummaryCard } from '../../components/Weather/WeatherSummaryCard';
import { Typography, Container, Link, Box } from '@mui/material';
import CurrentDate from '../../components/common/CurrentDate';
import CircularProgress from '@mui/material/CircularProgress';
import { Link as RouterLink } from 'react-router-dom';

const Favorites = () => {
  const { favoriteCitiesData, isLoading } = useFavoriteCitiesContext();

  if (isLoading) {
    return (
      <Container
        maxWidth="md"
        sx={{
          py: 4,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CurrentDate />
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress color="secondary" />
        </Box>
      </Container>
    );
  }

  if (favoriteCitiesData.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <CurrentDate />
        <Typography
          color="primary.contrastText"
          variant="body2"
          sx={{ opacity: 0.8, mt: 2 }}
        >
          No favorite cities exist.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4, px: 0 }}>
      <CurrentDate />
      {favoriteCitiesData.map(({ city, weather }) => (
        <Link
          underline="none"
          component={RouterLink}
          to={`/favorites/${city.id}`}
          key={city.id}
        >
          <WeatherSummaryCard selectedCity={city} weather={weather} />
        </Link>
      ))}
    </Container>
  );
};

export default Favorites;
