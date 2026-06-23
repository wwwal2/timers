import { Box, Button, Typography } from '@mui/material';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { useTimer } from '../../hooks/useTimer';
import { containerSx, displaySx, buttonRowSx } from './styles';

dayjs.extend(duration);

export default function Timer() {
  const { seconds, running, setRunning, setSeconds } = useTimer();

  return (
    <Box sx={containerSx}>
      <Typography variant="h2" sx={displaySx}>
        {dayjs.duration(seconds, 'seconds').format('HH:mm:ss')}
      </Typography>
      <Box sx={buttonRowSx}>
        <Button variant="contained" onClick={() => setRunning(r => !r)}>
          {running ? 'Pause' : 'Start'}
        </Button>
        <Button variant="outlined" onClick={() => { setRunning(false); setSeconds(0); }}>
          Reset
        </Button>
      </Box>
    </Box>
  );
}
