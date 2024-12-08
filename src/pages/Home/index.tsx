import { useState } from 'react';
import { Container } from '@mui/material';
import { City } from '../../Types/city';
import CitySearchInput from './CitySearchInput';
import WeatherInfo from './WeatherInfo';
import CurrentDate from '../../components/common/CurrentDate';

function Home() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <CurrentDate />
      <CitySearchInput
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
      />

      <WeatherInfo selectedCity={selectedCity} />
    </Container>
  );
}

export default Home;
