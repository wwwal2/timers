import { useState } from 'react';
import { Box, Button } from '@mui/material';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { useTimer } from '../../hooks/useTimer';
import { containerSx, buttonRowSx } from './styles';
import type { Mode, TimeInput } from '../../types/timers';
import { secondsToTimeInput, clamp } from '../../helpers/countdown';
import CountdownDisplay from './CountdownDisplay';
import CountdownSetMode from './CountdownSetMode';

dayjs.extend(duration);


export default function Countdown({ initialSeconds }: { initialSeconds: number }) {
  const [mode, setMode] = useState<Mode>('display');

  const [timeInput, setTimeInput] = useState<TimeInput>(secondsToTimeInput(initialSeconds));

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

    if (mode === 'set') {
      const total = dayjs.duration(timeInput).asSeconds();
      setSeconds(total);
      setRunning(false);
    } else {
      setTimeInput(secondsToTimeInput(seconds));
    }

    setMode(m => (m === 'display' ? 'set' : 'display'));
  };

  const handleReset = () => {
    setRunning(false);
    setSeconds(dayjs.duration(timeInput).asSeconds());
  };

  return (
    <Box sx={containerSx(mode)}>
      {mode === 'display' ? (
        <CountdownDisplay seconds={seconds} />
      ) : (
        <CountdownSetMode timeInput={timeInput} onFieldChange={handleFieldChange} />
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
