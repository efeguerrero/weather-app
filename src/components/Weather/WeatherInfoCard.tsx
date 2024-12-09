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
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between"
          gap={1.5}
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={1}
          >
            <Icon
              sx={{
                color: 'secondary.main',
                width: '2rem',
                height: '2rem',
              }}
            />
            <Typography
              variant="caption"
              fontSize="0.75rem"
              sx={{
                opacity: 0.8,
              }}
            >
              {title}
            </Typography>
          </Box>
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
      </CardContent>
    </Card>
  );
}
