import { Box, Button, ButtonGroup, TextField, Typography } from '@mui/material';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { timeInputRowSx, separatorSx, fieldSx, setModeContainerSx, dateTimePickerContainerSx } from './styles';
import type { TimeInput } from '../../types/timers';
import type { PickerValue } from '@mui/x-date-pickers/internals';

dayjs.extend(duration);


interface CountdownSetModeProps {
  timeInput: TimeInput;
  setTimeInput: (timeInput: TimeInput) => void;
  onFieldChange: (field: keyof TimeInput, max: number) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  timeSetMode: 'amount' | 'tillDate';
  setTimeSetMode: (timeSetMode: 'amount' | 'tillDate') => void;
}

export default function CountdownSetMode({ timeInput, onFieldChange, setTimeInput, timeSetMode, setTimeSetMode }: CountdownSetModeProps) {
  return (
    <Box sx={setModeContainerSx}>
      <ButtonGroup size="small">
        <Button variant={timeSetMode === 'amount' ? 'contained' : 'outlined'} onClick={() => setTimeSetMode('amount')}>Amount</Button>
        <Button variant={timeSetMode === 'tillDate' ? 'contained' : 'outlined'} onClick={() => setTimeSetMode('tillDate')}>Till Date</Button>
      </ButtonGroup>

      {timeSetMode === 'amount' ? (
        <Box sx={timeInputRowSx}>
          <TextField
            label="HH"
            type="number"
            size="small"
            value={timeInput.hours}
            onChange={onFieldChange('hours', 999)}
            slotProps={{ htmlInput: { min: 0, max: 999 } }}
            sx={fieldSx}
          />
          <Typography variant="h4" sx={separatorSx}>:</Typography>
          <TextField
            label="MM"
            type="number"
            size="small"
            value={timeInput.minutes}
            onChange={onFieldChange('minutes', 59)}
            slotProps={{ htmlInput: { min: 0, max: 59 } }}
            sx={fieldSx}
          />
          <Typography variant="h4" sx={separatorSx}>:</Typography>
          <TextField
            label="SS"
            type="number"
            size="small"
            value={timeInput.seconds}
            onChange={onFieldChange('seconds', 59)}
            slotProps={{ htmlInput: { min: 0, max: 59 } }}
            sx={fieldSx}
          />
        </Box>
      ) : (
        <Box sx={dateTimePickerContainerSx}>
          <DateTimePicker
            label="TIME AND DATE"
            ampm={false}
            disablePast
            format="DD/MM HH:mm"
            value={dayjs().add(timeInput.hours, 'hour').add(timeInput.minutes, 'minute').add(timeInput.seconds, 'second')}
            slotProps={{ textField: { size: 'small' } }}
            onChange={(value: PickerValue) => {
              if (!value) return;
              const dur = dayjs.duration(Math.max(0, value.diff(dayjs())));
              setTimeInput({
                hours: Math.floor(dur.asHours()),
                minutes: dur.minutes(),
                seconds: dur.seconds(),
              });
            }}
          />
        </Box>
      )}
    </Box>
  );
}
