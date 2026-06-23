import { useState, useEffect, useRef } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const DEFAULT_SECONDS = 60;

export default function Countdown() {
  const [seconds, setSeconds] = useState(DEFAULT_SECONDS);
  const [input, setInput] = useState(DEFAULT_SECONDS);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => {
          if (prev <= 1) {
            setRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const handleReset = () => {
    setRunning(false);
    setSeconds(input);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, p: 4 }}>
      <Typography variant="h2" sx={{ fontFamily: 'monospace' }}>
        {dayjs.duration(seconds, 'seconds').format('HH:mm:ss')}
      </Typography>
      <TextField
        type="number"
        label="Seconds"
        size="small"
        value={input}
        onChange={e => {
          const val = Math.max(1, parseInt(e.target.value) || 1);
          setInput(val);
          setSeconds(val);
          setRunning(false);
        }}
        slotProps={{ htmlInput: { min: 1 } }}
        sx={{ width: 120 }}
      />
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button variant="contained" onClick={() => setRunning(r => !r)} disabled={seconds === 0}>
          {running ? 'Pause' : 'Start'}
        </Button>
        <Button variant="outlined" onClick={handleReset}>
          Reset
        </Button>
      </Box>
    </Box>
  );
}
