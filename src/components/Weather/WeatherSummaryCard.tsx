import { Typography, Card, CardContent, Box } from '@mui/material';
import { City } from '../../Types/city';
import { Weather } from '../../Types/weather';
import FavoriteButton from '../common/FavoriteButton';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Link } from 'react-router-dom';

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
        color: 'primary.contrastText',
        mb: 3,
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
            <Box
              display="flex"
              gap={1}
              alignItems="center"
              justifyContent="center"
            >
              <Link
                to={`/favorites/${selectedCity.id}`}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <AddCircleOutlineOutlinedIcon color="secondary" />
              </Link>
              <FavoriteButton city={selectedCity} weather={weather} />
            </Box>
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
