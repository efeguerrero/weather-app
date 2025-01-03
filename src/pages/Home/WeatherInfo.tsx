import { Box, CircularProgress, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { City } from '../../Types/city';
import { WeatherInfoCard } from '../../components/Weather/WeatherInfoCard';
import { WeatherSummaryCard } from '../../components/Weather/WeatherSummaryCard';
import { Weather } from '../../Types/weather';

interface WeatherInfoProps {
  selectedCity: City | null;
  weather: Weather | null;
  isLoading: boolean;
}

const WeatherInfo = ({
  selectedCity,
  weather,
  isLoading,
}: WeatherInfoProps) => {
  const weatherCardInfo = [
    {
      title: 'Wind Speed',
      value: `${weather?.current.wind_kph} km/h`,
      icon: 'Air',
    },
    {
      title: 'Humidity',
      value: `${weather?.current.humidity}%`,
      icon: 'WaterDrop',
    },
    {
      title: 'Pressure',
      value: `${weather?.current.pressure_mb} mb`,
      icon: 'Pressure',
    },
    {
      title: 'Clouds',
      value: `${weather?.current.cloud}%`,
      icon: 'Cloud',
    },
  ] as const;

  if (isLoading) {
    return (
      <Box
        sx={{
          height: 200,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  if (!selectedCity) {
    return (
      <Typography
        color="primary.contrastText"
        variant="body2"
        sx={{ opacity: 0.8 }}
      >
        <strong>Welcome to your Weather App!</strong> <br /> Search and select a
        city to see its current weather
      </Typography>
    );
  }

  if (!weather) {
    return (
      <Typography color="warning.main" variant="body2" sx={{ opacity: 0.8 }}>
        We could not retrieve the weather data for this city. <br />
        Please try again later.
      </Typography>
    );
  }

  return (
    <>
      <WeatherSummaryCard
        showDetailsButton={false}
        selectedCity={selectedCity}
        weather={weather}
      />
      <Grid container spacing={2}>
        {weatherCardInfo.map((item, index) => (
          <Grid size={{ xs: 6, sm: 3 }} key={index}>
            <WeatherInfoCard {...item} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default WeatherInfo;
