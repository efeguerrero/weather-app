import { Card, CardContent, Box, Typography } from '@mui/material';
import AirOutlinedIcon from '@mui/icons-material/AirOutlined';
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined';
import CompressOutlinedIcon from '@mui/icons-material/CompressOutlined';

interface WeatherCardProps {
  icon: keyof typeof iconMap;
  title: string;
  value: string;
}

const iconMap = {
  Air: AirOutlinedIcon,
  WaterDrop: WaterDropOutlinedIcon,
  Pressure: CompressOutlinedIcon,
  Cloud: CloudOutlinedIcon,
};

export function WeatherInfoCard({ icon, title, value }: WeatherCardProps) {
  const Icon = iconMap[icon];

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
          <Icon />
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
