import { useState, useRef, useEffect, useCallback } from 'react';

type ResizeDir = 'right' | 'bottom' | 'corner';

interface Size {
  width: number;
  height: number;
}

interface UseResizableResult {
  containerRef: React.RefObject<HTMLDivElement | null>;
  size: Size | null;
  scaleFactor: number;
  startResize: (e: React.MouseEvent, dir: ResizeDir) => void;
}

const MIN_W = 160;
const MIN_H = 100;

export function useResizable(): UseResizableResult {
  const containerRef = useRef<HTMLDivElement>(null);
  const [naturalSize, setNaturalSize] = useState<Size | null>(null);
  const [size, setSize] = useState<Size | null>(null);

  // Capture the natural (auto) dimensions once after first paint
  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setNaturalSize({ width, height });
    }
  }, []);

  const scaleFactor = size && naturalSize ? size.width / naturalSize.width : 1;

  const startResize = useCallback(
    (e: React.MouseEvent, dir: ResizeDir) => {
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

  return { containerRef, size, scaleFactor, startResize };
}
