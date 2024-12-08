import { useState } from 'react';
import { Typography, Container } from '@mui/material';
import { format } from 'date-fns';
import { City } from '../../Types/city';
import CitySearchInput from './CitySearchInput';
import WeatherInfo from './WeatherInfo';

function Home() {
  const currentDate = format(new Date(), 'EEEE d, MMMM yyyy');
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography
        variant="h6"
        color="primary.contrastText"
        sx={{ mb: 2, fontWeight: 500 }}
      >
        {currentDate}
      </Typography>

      <CitySearchInput
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
      />

      <WeatherInfo selectedCity={selectedCity} />
    </Container>
  );
}

export default Home;
