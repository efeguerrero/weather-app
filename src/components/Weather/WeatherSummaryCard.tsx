import { Typography, Card, CardContent, Box, Link } from '@mui/material';
import { City } from '../../Types/city';
import { Weather } from '../../Types/weather';
import FavoriteButton from '../common/favoriteButton/FavoriteButton';
import { Link as RouterLink } from 'react-router-dom';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';

interface WeatherSummaryCardProps {
  selectedCity: City;
  weather: Weather;
  showDetailsButton: boolean;
}

export function WeatherSummaryCard({
  selectedCity,
  weather,
  showDetailsButton,
}: WeatherSummaryCardProps) {
  return (
    <Card sx={{ mb: 3 }}>
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
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
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
            <Box display="flex" alignItems="center" gap={0.5}>
              {weather.current.condition.icon && (
                <Box display="flex" alignItems="center">
                  <img
                    src={weather.current.condition.icon}
                    alt={weather.current.condition.text}
                    style={{ width: 64, height: 64 }}
                  />
                </Box>
              )}
              <Box display="flex" flexDirection="column">
                <Typography variant="h4" sx={{ fontWeight: 500 }}>
                  {`${Math.round(weather.current.temp_c)}°`}
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.7 }}>
                  {weather.current.condition.text}
                </Typography>
              </Box>
            </Box>

            {showDetailsButton && (
              <Box alignSelf="flex-end">
                <Link
                  to={`/favorites/${selectedCity.id}`}
                  component={RouterLink}
                  underline="none"
                  color="primary.contrastText"
                  fontWeight={500}
                  fontSize={14}
                  display="flex"
                  alignItems="center"
                  gap={0.5}
                  sx={{
                    '&:hover': {
                      color: 'secondary.main',
                    },
                  }}
                >
                  Forecast
                  <ArrowForwardOutlinedIcon fontSize="inherit" />
                </Link>
              </Box>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
