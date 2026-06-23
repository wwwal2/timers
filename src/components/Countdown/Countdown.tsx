import { useState, useEffect, useRef } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

type Mode = 'display' | 'set';

interface TimeInput {
  hours: number;
  minutes: number;
  seconds: number;
}

const DEFAULT_INPUT: TimeInput = { hours: 0, minutes: 1, seconds: 0 };

const toSeconds = ({ hours, minutes, seconds }: TimeInput) =>
  hours * 3600 + minutes * 60 + seconds;

const clamp = (val: number, min: number, max: number) =>
  Math.min(max, Math.max(min, val));

export default function Countdown() {
  const [mode, setMode] = useState<Mode>('display');
  const [timeInput, setTimeInput] = useState<TimeInput>(DEFAULT_INPUT);
  const [seconds, setSeconds] = useState(toSeconds(DEFAULT_INPUT));
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

  const handleFieldChange =
    (field: keyof TimeInput, max: number) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = clamp(parseInt(e.target.value) || 0, 0, max);
      const updated = { ...timeInput, [field]: val };
      setTimeInput(updated);
    };

  const handleModeToggle = () => {
    if (mode === 'set') {
      const total = toSeconds(timeInput);
      setSeconds(total);
      setRunning(false);
    }
    setMode(m => (m === 'display' ? 'set' : 'display'));
  };

  const handleReset = () => {
    setRunning(false);
    setSeconds(toSeconds(timeInput));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, p: 4 }}>
      {mode === 'display' ? (
        <Typography variant="h2" id="display" sx={{ fontFamily: 'monospace' }}>
          {dayjs.duration(seconds, 'seconds').format('HH:mm:ss')}
        </Typography>
      ) : (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <TextField
            label="HH"
            type="number"
            size="small"
            value={timeInput.hours}
            onChange={handleFieldChange('hours', 99)}
            slotProps={{ htmlInput: { min: 0, max: 99 } }}
            sx={{ width: 72 }}
          />
          <Typography variant="h4" sx={{ fontFamily: 'monospace' }}>:</Typography>
          <TextField
            label="MM"
            type="number"
            size="small"
            value={timeInput.minutes}
            onChange={handleFieldChange('minutes', 59)}
            slotProps={{ htmlInput: { min: 0, max: 59 } }}
            sx={{ width: 72 }}
          />
          <Typography variant="h4" sx={{ fontFamily: 'monospace' }}>:</Typography>
          <TextField
            label="SS"
            type="number"
            size="small"
            value={timeInput.seconds}
            onChange={handleFieldChange('seconds', 59)}
            slotProps={{ htmlInput: { min: 0, max: 59 } }}
            sx={{ width: 72 }}
          />
        </Box>
      )}

      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button variant="contained" onClick={() => setRunning(r => !r)} disabled={seconds === 0 || mode === 'set'}>
          {running ? 'Pause' : 'Start'}
        </Button>
        <Button variant="outlined" onClick={handleReset} disabled={mode === 'set'}>
          Reset
        </Button>
        <Button variant="outlined" onClick={handleModeToggle}>
          {mode === 'display' ? 'Set' : 'Done'}
        </Button>
      </Box>
    </Box>
  );
}
