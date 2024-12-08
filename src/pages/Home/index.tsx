import {
  Typography,
  Container,
  Autocomplete,
  TextField,
  Card,
  CardContent,
  Box,
  IconButton,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import WbSunny from '@mui/icons-material/WbSunny';
import Favorite from '@mui/icons-material/Favorite';
import Air from '@mui/icons-material/Air';
import WaterDrop from '@mui/icons-material/WaterDrop';
import { format } from 'date-fns';

// Mock data for autocomplete - remove when implementing API
const mockCities = [
  { label: 'Buenos Aires, Argentina' },
  { label: 'London, UK' },
  { label: 'Tokyo, Japan' },
];

interface WeatherCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

function WeatherInfoCard({ icon, title, value }: WeatherCardProps) {
  return (
    <Card
      sx={{
        boxShadow: 'none',
        border: '1px solid',
        borderColor: 'primary.dark',
        bgcolor: 'transparent',
        borderRadius: 2,
        color: 'primary.contrastText',
        height: '100%',
        '& .MuiCardContent-root': {
          p: 2,
        },
      }}
    >
      <CardContent>
        <Box
          display="flex"
          flexDirection={{ xs: 'column', md: 'row' }}
          alignItems="center"
          justifyContent="space-around"
          gap={1}
        >
          {icon}
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="caption"
              sx={{
                opacity: 0.8,
                fontSize: { xs: '0.75rem', md: '0.875rem' },
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 500,
                fontSize: { xs: '1rem', md: '1.25rem' },
              }}
            >
              {value}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

function Home() {
  const currentDate = format(new Date(), 'EEEE d, MMMM yyyy');

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography
        variant="h6"
        color="primary.contrastText"
        sx={{ mb: 2, fontWeight: 500 }}
      >
        {currentDate}
      </Typography>

      <Autocomplete
        options={mockCities}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search for a city..."
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                bgcolor: 'background.paper',
                borderRadius: 1,
                '&:hover': {
                  bgcolor: 'background.paper',
                },
                '& fieldset': {
                  borderColor: 'primary.light',
                },
              },
            }}
          />
        )}
      />

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
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Box>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Buenos Aires, Argentina
              </Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="h3" sx={{ fontWeight: 500 }}>
                  27°
                </Typography>
                <WbSunny sx={{ fontSize: 32 }} />
                <Typography variant="h6" sx={{ ml: 1 }}>
                  Sunny
                </Typography>
              </Box>
            </Box>
            <IconButton
              color="inherit"
              sx={{
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              <Favorite />
            </IconButton>
          </Box>
        </CardContent>
      </Card>

      <Grid container spacing={2}>
        {[
          { title: 'Wind Speed', value: '12 km/h', icon: <Air /> },
          { title: 'Humidity', value: '50%', icon: <WaterDrop /> },
          { title: 'Wind Speed', value: '12 km/h', icon: <Air /> },
          { title: 'Wind Speed', value: '12 km/h', icon: <Air /> },
        ].map((item, index) => (
          <Grid size={{ xs: 6, sm: 3 }} key={index}>
            <WeatherInfoCard {...item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Home;
