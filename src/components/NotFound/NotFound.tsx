import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: 2,
      }}
    >
      <Typography
        variant="h1"
        fontWeight="600"
        component="h1"
        color="text.secondary"
      >
        404
      </Typography>
      <Typography variant="h5" component="h2" textAlign="center">
        The route does not exist
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        sx={{ boxShadow: 'none' }}
        size="large"
        onClick={() => navigate('/')}
      >
        Go Back Home
      </Button>
    </Box>
  );
}

export default NotFound;
