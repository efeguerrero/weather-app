import { Typography, Card, CardContent, Box } from '@mui/material';
import { City } from '../../Types/city';
import { Weather } from '../../Types/weather';
import FavoriteButton from '../common/FavoriteButton';

interface WeatherSummaryCardProps {
  selectedCity: City;
  weather: Weather;
}

export function WeatherSummaryCard({
  selectedCity,
  weather,
}: WeatherSummaryCardProps) {
  return (
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
                {selectedCity.name}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  opacity: 0.8,
                  display: 'block',
                  fontSize: { xs: '0.75rem', md: '0.875rem' },
                }}
              >
                {selectedCity.region}, {selectedCity.country}
              </Typography>
            </Box>
            <FavoriteButton city={selectedCity} weather={weather} />
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h3" sx={{ fontWeight: 500 }}>
              {`${weather.current.temp_c}°`}
            </Typography>
            <Box display="flex" flexDirection="column" alignItems="center">
              {weather.current.condition.icon && (
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
                {weather.current.condition.text}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
