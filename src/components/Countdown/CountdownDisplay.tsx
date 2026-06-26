import { Typography } from '@mui/material';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { displaySx } from './styles';

dayjs.extend(duration);

interface CountdownDisplayProps {
  seconds: number;
}

function formatDuration(totalSeconds: number): string {
  const d = dayjs.duration(totalSeconds, 'seconds');
  const hours = Math.floor(d.asHours());
  const mm = String(d.minutes()).padStart(2, '0');
  const ss = String(d.seconds()).padStart(2, '0');
  return `${String(hours).padStart(2, '0')}:${mm}:${ss}`;
}

export default function CountdownDisplay({ seconds }: CountdownDisplayProps) {
  return (
    <Typography variant="h2" id="display" sx={displaySx}>
      {formatDuration(seconds)}
    </Typography>
  );
}
