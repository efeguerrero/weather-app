import { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import { City } from '../../Types/city';
import CitySearchInput from './CitySearchInput';
import WeatherInfo from './WeatherInfo';
import CurrentDate from '../../components/common/currentDate/CurrentDate';
import { getWeather } from '../../api/Weather';
import { Weather } from '../../Types/weather';

function Home() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      if (selectedCity) {
        setIsLoading(true);
        const newWeather = await getWeather(selectedCity);
        setWeather(newWeather);
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, [selectedCity]);

  return (
    <Container maxWidth="md" sx={{ py: 4, px: 0 }}>
      <CurrentDate />
      <CitySearchInput
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
      />

      <WeatherInfo
        selectedCity={selectedCity}
        weather={weather}
        isLoading={isLoading}
      />
    </Container>
  );
}

export default Home;
