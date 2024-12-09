import {
  Card,
  CardContent,
  Box,
  Typography,
  LinearProgress,
} from '@mui/material';
import { WeatherForecast } from '../../Types/weather';
import { format, parseISO } from 'date-fns';

interface ExtendedForecastProps {
  weatherForecast: WeatherForecast | null;
  isLoading: boolean;
}

function getDayName(date: Date | string): string {
  // Need to parse the date to avoid timezone issues and get the day name
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return format(parsedDate, 'EEEE');
}

function ExtendedForecast({
  weatherForecast,
  isLoading,
}: ExtendedForecastProps) {
  if (isLoading) {
    return <LinearProgress color="secondary" />;
  }

  if (!weatherForecast) {
    return (
      <Typography>
        No weather forecast found. Please try again later.
      </Typography>
    );
  }

  return (
    <Card
      sx={{
        color: 'primary.contrastText',
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
          Extended Forecast
        </Typography>
        {weatherForecast.forecast.forecastday.map((day) => (
          <Box
            key={day.date_epoch}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              py: 2,
              borderBottom: '1px solid',
              borderColor: 'primary.light',
              '&:last-child': {
                borderBottom: 'none',
              },
            }}
          >
            <Typography sx={{ flex: 1 }}>{getDayName(day.date)}</Typography>
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 2,
                alignItems: 'center',
              }}
            >
              <img
                src={day.day.condition.icon}
                alt={day.day.condition.text}
                style={{ width: 32, height: 32 }}
              />
              <Typography variant="body1">
                {`${Math.round(day.day.maxtemp_c)}°`}
              </Typography>
              <Typography variant="body1">
                {`${Math.round(day.day.mintemp_c)}°`}
              </Typography>
            </Box>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}

export default ExtendedForecast;
