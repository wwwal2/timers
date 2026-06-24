import type { SxProps, Theme } from '@mui/material';

export const containerSx: SxProps<Theme> = {
  display: 'flex',
  gap: 2,
  p: 4,
  flexWrap: 'wrap',
};

export const itemSx = (isDragging: boolean, isTarget: boolean): SxProps<Theme> => ({
  opacity: isDragging ? 0.35 : 1,
  outline: isTarget ? '2px dashed' : 'none',
  outlineColor: 'primary.main',
  borderRadius: 2,
  transition: 'opacity 0.15s',
  cursor: 'grab',
  '&:active': {
    cursor: 'grabbing',
  },
});
