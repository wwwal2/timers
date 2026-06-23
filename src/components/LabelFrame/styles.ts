import type { SxProps, Theme } from '@mui/material';

export const HANDLE_PX = 8;

export const containerSx = (
  size: { width: number; height: number } | null,
): SxProps<Theme> => ({
  position: 'relative',
  border: '2px solid',
  borderColor: 'divider',
  borderRadius: 2,
  pt: 2.5,
  px: 2,
  pb: 2,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: size ? `${size.width}px` : 'max-content',
  height: size ? `${size.height}px` : 'max-content',
  overflow: 'hidden',
  userSelect: 'none',
  boxSizing: 'border-box',
});

export const labelBoxSx = (scaleFactor: number): SxProps<Theme> => ({
  px: 0.75,
  bgcolor: 'background.default',
  lineHeight: 1,
  flexShrink: 0,
  zoom: scaleFactor,
});

export const inputBaseSx = (editing: boolean): SxProps<Theme> => ({
  fontSize: '0.75rem',
  fontWeight: 700,
  letterSpacing: '0.08em',
  color: 'text.secondary',
  cursor: editing ? 'text' : 'pointer',
  overflow: 'visible',
  '& input': {
    p: 0,
    cursor: 'inherit',
    textTransform: 'uppercase',
  },
});

export const contentAreaSx = (scaleFactor: number): SxProps<Theme> => ({
  zoom: scaleFactor,
});

export const rightHandleSx: SxProps<Theme> = {
  position: 'absolute',
  right: 0,
  top: 0,
  width: HANDLE_PX,
  height: '100%',
  cursor: 'ew-resize',
  zIndex: 10,
};

export const bottomHandleSx: SxProps<Theme> = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  height: HANDLE_PX,
  cursor: 's-resize',
  zIndex: 10,
};

export const cornerHandleSx: SxProps<Theme> = {
  position: 'absolute',
  bottom: 0,
  right: 0,
  width: 16,
  height: 16,
  cursor: 'se-resize',
  zIndex: 11,
};
