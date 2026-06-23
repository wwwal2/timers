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

export const timeInputRowSx: SxProps<Theme> = {
  display: 'flex',
  gap: 1,
  alignItems: 'center',
};

export const separatorSx: SxProps<Theme> = {
  fontFamily: 'monospace',
};

export const fieldSx: SxProps<Theme> = {
  width: 72,
};

export const buttonRowSx: SxProps<Theme> = {
  display: 'flex',
  gap: 1,
};
