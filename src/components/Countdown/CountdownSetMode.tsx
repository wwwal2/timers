import { Box, Button, ButtonGroup, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { timeInputRowSx, separatorSx, fieldSx, setModeContainerSx, dateTimePickerContainerSx } from './styles';
import type { TimeInput } from '../../types/timers';

interface CountdownSetModeProps {
  timeInput: TimeInput;
  onFieldChange: (field: keyof TimeInput, max: number) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CountdownSetMode({ timeInput, onFieldChange }: CountdownSetModeProps) {
  const [mode, setMode] = useState<'amount' | 'tillDate'>('amount');
  return (
    <Box sx={setModeContainerSx}>
      <ButtonGroup size="small">
        <Button variant={mode === 'amount' ? 'contained' : 'outlined'} onClick={() => setMode('amount')}>Amount</Button>
        <Button variant={mode === 'tillDate' ? 'contained' : 'outlined'} onClick={() => setMode('tillDate')}>Till Date</Button>
      </ButtonGroup>

      {mode === 'amount' ? (
        <Box sx={timeInputRowSx}>
          <TextField
            label="HH"
            type="number"
            size="small"
            value={timeInput.hours}
            onChange={onFieldChange('hours', 99)}
            slotProps={{ htmlInput: { min: 0, max: 99 } }}
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
            slotProps={{ textField: { size: 'small' } }}
          />
          </Box>
      )}
    </Box>
  );
}
