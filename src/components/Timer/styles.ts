import type { SxProps, Theme } from '@mui/material';

export const containerSx: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 2,
  p: 4,
};

export const displaySx: SxProps<Theme> = {
  fontFamily: 'monospace',
};

export const buttonRowSx: SxProps<Theme> = {
  display: 'flex',
  gap: 1,
};
