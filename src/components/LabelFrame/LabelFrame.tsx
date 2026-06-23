import { useState, useRef } from 'react';
import { Box, InputBase } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { useResizable } from '../../hooks/useResizable';
import {
  containerSx,
  labelBoxSx,
  inputBaseSx,
  contentAreaSx,
  rightHandleSx,
  bottomHandleSx,
  cornerHandleSx,
} from './styles';

interface LabelFrameProps {
  children: React.ReactNode;
  defaultLabel?: string;
}

export default function LabelFrame({ children, defaultLabel = 'CLOCK' }: LabelFrameProps) {
  const [label, setLabel] = useState(defaultLabel);
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { containerRef, size, scaleFactor, startResize } = useResizable();

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
    <Box ref={containerRef} sx={containerSx(size)}>
      {/* Label */}
      <Box sx={labelBoxSx(scaleFactor)}>
        <InputBase
          inputRef={inputRef}
          value={label}
          onChange={e => setLabel(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onClick={handleLabelClick}
          readOnly={!editing}
          inputProps={{ size: Math.max(label.length + 4, 1) }}
          sx={inputBaseSx(editing)}
        />
      </Box>

      {/* Scaled content area */}
      <Box sx={contentAreaSx(scaleFactor)}>
        {children}
      </Box>

      {/* Right edge handle */}
      <Box onMouseDown={e => startResize(e, 'right')} sx={rightHandleSx} />

      {/* Bottom edge handle */}
      <Box onMouseDown={e => startResize(e, 'bottom')} sx={bottomHandleSx} />

      {/* Corner handle (takes priority over edge handles at the intersection) */}
      <DragIndicatorIcon onMouseDown={e => startResize(e, 'corner')} sx={cornerHandleSx} />
    </Box>
  );
}
