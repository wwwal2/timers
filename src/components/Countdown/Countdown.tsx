import { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { useTimer } from '../../hooks/useTimer';
import {
  containerSx,
  displaySx,
  timeInputRowSx,
  separatorSx,
  fieldSx,
  buttonRowSx,
} from './styles';
import type { Mode, TimeInput } from '../../types/timers';
import { secondsToTimeInput, clamp } from '../../helpers/countdown'

dayjs.extend(duration);

const DEFAULT_INPUT: TimeInput = { hours: 0, minutes: 0, seconds: 0 };



export default function Countdown({ initialSeconds }: { initialSeconds: number }) {
  const [mode, setMode] = useState<Mode>('display');
  const [timeInput, setTimeInput] = useState<TimeInput>(DEFAULT_INPUT);
  const { seconds, running, setRunning, setSeconds } = useTimer({
    direction: 'down',
    initialSeconds,
  });

  const handleFieldChange =
    (field: keyof TimeInput, max: number) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = clamp(parseInt(e.target.value) || 0, 0, max);
      const updated = { ...timeInput, [field]: val };
      setTimeInput(updated);
    };

  const handleModeToggle = () => {
    setTimeInput(secondsToTimeInput(seconds));

    if (mode === 'set') {
      const total = dayjs.duration(timeInput).asSeconds();
      setSeconds(total);
      setRunning(false);
    }
    setMode(m => (m === 'display' ? 'set' : 'display'));
  };

  const handleReset = () => {
    setRunning(false);
    setSeconds(dayjs.duration(timeInput).asSeconds());
  };

  return (
    <Box sx={containerSx}>
      {mode === 'display' ? (
        <Typography variant="h2" id="display" sx={displaySx}>
          {dayjs.duration(seconds, 'seconds').format('HH:mm:ss')}
        </Typography>
      ) : (
        <Box sx={timeInputRowSx}>
          <TextField
            label="HH"
            type="number"
            size="small"
            value={timeInput.hours}
            onChange={handleFieldChange('hours', 99)}
            slotProps={{ htmlInput: { min: 0, max: 99 } }}
            sx={fieldSx}
          />
          <Typography variant="h4" sx={separatorSx}>:</Typography>
          <TextField
            label="MM"
            type="number"
            size="small"
            value={timeInput.minutes}
            onChange={handleFieldChange('minutes', 59)}
            slotProps={{ htmlInput: { min: 0, max: 59 } }}
            sx={fieldSx}
          />
          <Typography variant="h4" sx={separatorSx}>:</Typography>
          <TextField
            label="SS"
            type="number"
            size="small"
            value={timeInput.seconds}
            onChange={handleFieldChange('seconds', 59)}
            slotProps={{ htmlInput: { min: 0, max: 59 } }}
            sx={fieldSx}
          />
        </Box>
      )}

      <Box sx={buttonRowSx}>
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
