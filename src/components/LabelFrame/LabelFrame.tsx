import { useState, useRef, useEffect, useCallback } from 'react';
import { Box, InputBase } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

interface LabelFrameProps {
  children: React.ReactNode;
  defaultLabel?: string;
}

const MIN_W = 160;
const MIN_H = 100;
const HANDLE_PX = 8;

export default function LabelFrame({ children, defaultLabel = 'CLOCK' }: LabelFrameProps) {
  const [label, setLabel] = useState(defaultLabel);
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [naturalSize, setNaturalSize] = useState<{ width: number; height: number } | null>(null);
  const [size, setSize] = useState<{ width: number; height: number } | null>(null);

  // Capture the natural (auto) dimensions once after first paint
  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setNaturalSize({ width, height });
    }
  }, []);

  const scaleFactor = size && naturalSize ? size.width / naturalSize.width : 1;

  const startResize = useCallback(
    (e: React.MouseEvent, dir: 'right' | 'bottom' | 'corner') => {
      e.preventDefault();
      e.stopPropagation();

      const startX = e.clientX;
      const startY = e.clientY;
      const startW = size?.width ?? containerRef.current!.getBoundingClientRect().width;
      const startH = size?.height ?? containerRef.current!.getBoundingClientRect().height;

      const onMove = (ev: MouseEvent) => {
        const dx = ev.clientX - startX;
        const dy = ev.clientY - startY;

        if (dir === 'right') {
          // Proportional: keep aspect ratio so content never clips
          const newW = Math.max(MIN_W, startW + dx);
          const ratio = startH / startW;
          setSize({ width: newW, height: Math.max(MIN_H, Math.round(newW * ratio)) });
        } else if (dir === 'bottom') {
          setSize({ width: startW, height: Math.max(MIN_H, startH + dy) });
        } else {
          setSize({ width: Math.max(MIN_W, startW + dx), height: Math.max(MIN_H, startH + dy) });
        }
      };

      const onUp = () => {
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup', onUp);
      };

      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);
    },
    [size],
  );

  const handleLabelClick = () => {
    setEditing(true);
    setTimeout(() => inputRef.current?.select(), 0);
  };

  const handleBlur = () => {
    setEditing(false);
    if (!label.trim()) setLabel(defaultLabel);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      inputRef.current?.blur();
    }
  };

  return (
    <Box
      ref={containerRef}
      sx={{
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
      }}
    >
      {/* Label */}
      <Box
        sx={{
          px: 0.75,
          bgcolor: 'background.default',
          lineHeight: 1,
          flexShrink: 0,
          zoom: scaleFactor
        }}
      >
        <InputBase
          inputRef={inputRef}
          value={label}
          onChange={e => setLabel(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onClick={handleLabelClick}
          readOnly={!editing}
          inputProps={{ size: Math.max(label.length + 4, 1) }}
          sx={{
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
          }}
        />
      </Box>

      {/* Scaled content area */}
      <Box sx={{ zoom: scaleFactor }}>
        {children}
      </Box>

      {/* Right edge handle */}
      <Box
        onMouseDown={e => startResize(e, 'right')}
        sx={{
          position: 'absolute',
          right: 0,
          top: 0,
          width: HANDLE_PX,
          height: '100%',
          cursor: 'ew-resize',
          zIndex: 10,
        }}
      />

      {/* Bottom edge handle */}
      <Box
        onMouseDown={e => startResize(e, 'bottom')}
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: HANDLE_PX,
          cursor: 's-resize',
          zIndex: 10,
        }}
      />

      {/* Corner handle (takes priority over edge handles at the intersection) */}
      <DragIndicatorIcon
        onMouseDown={e => startResize(e, 'corner')}
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: 16,
          height: 16,
          cursor: 'se-resize',
          zIndex: 11,
          
        }}
      />
    </Box>
  );
}
 