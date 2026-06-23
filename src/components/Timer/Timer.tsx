import { useState, useEffect, useRef } from 'react';
import { Box, Button, Typography } from '@mui/material';

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

  const formatTime = (total: number) => {
    const h = Math.floor(total / 3600).toString().padStart(2, '0');
    const m = Math.floor((total % 3600) / 60).toString().padStart(2, '0');
    const s = (total % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, p: 4 }}>
      <Typography variant="h2" sx={{ fontFamily: 'monospace' }}>
        {formatTime(seconds)}
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
