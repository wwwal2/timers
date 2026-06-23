import { useState, useRef } from 'react';
import { Box, InputBase } from '@mui/material';

interface LabelFrameProps {
  children: React.ReactNode;
  defaultLabel?: string;
}

export default function LabelFrame({ children, defaultLabel = 'CLOCK' }: LabelFrameProps) {
  const [label, setLabel] = useState(defaultLabel);
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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
      sx={{
        border: '2px solid',
        borderColor: 'divider',
        borderRadius: 2,
        pt: 2.5,
        px: 2,
        pb: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 'max-content',
      }}
    >
      <Box
        sx={{
          px: 0.75,
          bgcolor: 'background.default',
          lineHeight: 1,
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
            overflow: "visible",
            '& input': {
              p: 0,
              cursor: 'inherit',
              textTransform: 'uppercase',
            },
          }}
        />
      </Box>
      {children}
    </Box>
  );
}
