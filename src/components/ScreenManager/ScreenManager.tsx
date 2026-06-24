import React, { useState } from 'react';
import { Box } from '@mui/material';
import { containerSx, itemSx } from './styles';

interface ScreenManagerProps {
  children: React.ReactNode;
}

export default function ScreenManager({ children }: ScreenManagerProps) {
  const items = React.Children.toArray(children);
  const [order, setOrder] = useState<number[]>(() => items.map((_, i) => i));
  const [dragging, setDragging] = useState<number | null>(null);
  const [dragOver, setDragOver] = useState<number | null>(null);

  const handleDragStart = (pos: number) => setDragging(pos);

  const handleDragOver = (e: React.DragEvent, pos: number) => {
    e.preventDefault();
    if (dragOver !== pos) setDragOver(pos);
  };

  const handleDrop = (dropPos: number) => {
    if (dragging !== null && dragging !== dropPos) {
      setOrder(prev => {
        const next = [...prev];
        [next[dragging], next[dropPos]] = [next[dropPos], next[dragging]];
        return next;
      });
    }
    setDragging(null);
    setDragOver(null);
  };

  const handleDragEnd = () => {
    setDragging(null);
    setDragOver(null);
  };

  return (
    <Box sx={containerSx}>
      {order.map((childIdx, pos) => (
        <Box
          key={childIdx}
          draggable
          onDragStart={() => handleDragStart(pos)}
          onDragOver={e => handleDragOver(e, pos)}
          onDrop={() => handleDrop(pos)}
          onDragEnd={handleDragEnd}
          sx={itemSx(dragging === pos, dragOver === pos && dragging !== pos)}
        >
          {items[childIdx]}
        </Box>
      ))}
    </Box>
  );
}
