import { useState, useEffect, useRef } from 'react';
import { Box, Button, Typography } from '@mui/material';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, p: 4 }}>
      <Typography variant="h2" sx={{ fontFamily: 'monospace' }}>
        {dayjs.duration(seconds, 'seconds').format('HH:mm:ss')}
      </Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
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
