import { Typography } from '@mui/material';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { displaySx } from './styles';

dayjs.extend(duration);

interface CountdownDisplayProps {
  seconds: number;
}

export default function CountdownDisplay({ seconds }: CountdownDisplayProps) {
  return (
    
    <Typography variant="h2" id="display" sx={displaySx}>
      {dayjs.duration(seconds, 'seconds').format('HH:mm:ss')}
    </Typography>
  );
}
