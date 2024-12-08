import { Container, Typography } from '@mui/material';
import CurrentDate from '../../components/common/CurrentDate';
import { useParams } from 'react-router-dom';
import { useFavoriteCitiesContext } from '../../context/FavoriteCitiesContext';
import WeatherInfo from '../Home/WeatherInfo';

function CityDetails() {
  const { cityId } = useParams();
  const { favoriteCitiesData } = useFavoriteCitiesContext();

  const selectedCity = favoriteCitiesData.find((data) => {
    if (cityId) {
      return data.city.id === parseInt(cityId);
    }
  });

  if (!selectedCity) {
    return <Typography>City not found</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <CurrentDate />
      <WeatherInfo
        selectedCity={selectedCity.city}
        weather={selectedCity.weather}
        isLoading={false}
      />
    </Container>
  );
}

export default CityDetails;
