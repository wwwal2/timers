import type { SxProps, Theme } from '@mui/material';
import type { Mode } from '../../types/timers';

export const containerSx: (mode: Mode) => SxProps<Theme> = (mode) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 2,
  // py: mode === 'display' ? 4 : 2.95,
  pt: mode === 'display' ? 4 : 2.95,
  pb: mode === 'display' ? 3 : 2.95,
  px: mode === 'display' ? 4 : 2.35,
});

export const displaySx: SxProps<Theme> = {
  fontFamily: 'monospace',
  pb: 1,
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

export const setModeContainerSx: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 2,
  width: '286px',
};

export const dateTimePickerContainerSx: SxProps<Theme> = {
  py: '1px',
};