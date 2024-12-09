import { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import CurrentDate from '../../components/common/CurrentDate';
import { useParams } from 'react-router-dom';
import { useFavoriteCitiesContext } from '../../context/FavoriteCitiesContext';
import WeatherInfo from '../Home/WeatherInfo';
import ExtendedForecast from '../../components/Weather/ExtendedForecast';
import { getWeatherForecast } from '../../api/Forecast';
import { WeatherForecast } from '../../Types/weather';

function CityDetails() {
  const { cityId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [weatherForecast, setWeatherForecast] =
    useState<WeatherForecast | null>(null);
  const { favoriteCitiesData } = useFavoriteCitiesContext();

  const selectedCity = favoriteCitiesData.find((data) => {
    if (cityId) {
      return data.city.id === parseInt(cityId);
    }
  });

  useEffect(() => {
    const fetchWeather = async () => {
      if (selectedCity) {
        setIsLoading(true);
        const newWeatherForecast = await getWeatherForecast(selectedCity.city);
        setWeatherForecast(newWeatherForecast);
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, [selectedCity]);

  if (!selectedCity) {
    return <Typography>City not found</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4, px: 0 }}>
      <CurrentDate />
      <WeatherInfo
        selectedCity={selectedCity.city}
        weather={selectedCity.weather}
        isLoading={false}
      />
      <Box sx={{ mt: 3 }}>
        <ExtendedForecast
          weatherForecast={weatherForecast}
          isLoading={isLoading}
        />
      </Box>
    </Container>
  );
}

export default CityDetails;
