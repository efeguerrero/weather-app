import { useState, useEffect } from 'react';
import { Typography, Card, CardContent, Box, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

import { City } from '../../../Types/city';
import { getWeather } from '../../../api/Weather';
import { Weather } from '../../../Types/weather';
import { WeatherInfoCard } from './WeatherInfoCard';

interface WeatherInfoProps {
  selectedCity: City | null;
}

function WeatherInfo({ selectedCity }: WeatherInfoProps) {
  const [weather, setWeather] = useState<Weather | null>(null);

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

  useEffect(() => {
    const fetchWeather = async () => {
      if (selectedCity) {
        const newWeather = await getWeather(selectedCity);
        setWeather(newWeather);
      }
    };

    fetchWeather();
  }, [selectedCity]);

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
      <Card
        sx={{
          bgcolor: 'transparent',
          color: 'primary.contrastText',
          mb: 3,
          borderRadius: 2,
          boxShadow: 'none',
          border: '1px solid',
          borderColor: 'primary.dark',
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box display="flex" flexDirection="column" gap={2}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Box>
                <Typography variant="h5" sx={{ mb: 0, fontWeight: 500 }}>
                  {selectedCity?.name}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    opacity: 0.8,
                    display: 'block',
                    fontSize: { xs: '0.75rem', md: '0.875rem' },
                  }}
                >
                  {selectedCity?.region}, {selectedCity?.country}
                </Typography>
              </Box>
              <IconButton
                color="inherit"
                sx={{
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                <FavoriteBorderOutlinedIcon />
              </IconButton>
            </Box>

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h3" sx={{ fontWeight: 500 }}>
                {`${weather?.current.temp_c}°`}
              </Typography>
              <Box display="flex" flexDirection="column" alignItems="center">
                {weather?.current.condition.icon && (
                  <img
                    src={weather.current.condition.icon}
                    alt={weather.current.condition.text}
                    style={{ width: 64, height: 64 }}
                  />
                )}
                <Typography
                  variant="caption"
                  sx={{
                    opacity: 0.7,
                    fontSize: '0.75rem',
                  }}
                >
                  {weather?.current.condition.text}
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <Grid container spacing={2}>
        {weatherCardInfo.map((item, index) => (
          <Grid size={{ xs: 6, sm: 3 }} key={index}>
            <WeatherInfoCard {...item} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default WeatherInfo;
