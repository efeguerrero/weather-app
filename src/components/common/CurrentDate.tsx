import { Typography } from '@mui/material';
import { format } from 'date-fns';

const currentDate = format(new Date(), 'EEEE d, MMMM yyyy');

function CurrentDate() {
  return (
    <Typography
      variant="h6"
      color="primary.contrastText"
      sx={{ mb: 2, fontWeight: 500 }}
    >
      {currentDate}
    </Typography>
  );
}

export default CurrentDate;
