import { useFavoriteCitiesContext } from '../../context/FavoriteCitiesContext';
import { WeatherSummaryCard } from '../../components/Weather/WeatherSummaryCard';
import { Typography, Container } from '@mui/material';
import CurrentDate from '../../components/common/CurrentDate';

const Favorites = () => {
  const { favoriteCitiesData } = useFavoriteCitiesContext();

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
    <Container maxWidth="md" sx={{ py: 4 }}>
      <CurrentDate />
      {favoriteCitiesData.map(({ city, weather }) => (
        <WeatherSummaryCard
          selectedCity={city}
          weather={weather}
          key={city.id}
        />
      ))}
    </Container>
  );
};

export default Favorites;
