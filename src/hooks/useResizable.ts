import { useState, useRef, useEffect, useCallback } from 'react';


interface Size {
  width: number;
  height: number;
}

interface UseResizableResult {
  containerRef: React.RefObject<HTMLDivElement | null>;
  size: Size | null;
  scaleFactor: number;
  startResize: (e: React.MouseEvent) => void;
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

  const scaleFactor = size && naturalSize ? size.height / naturalSize.height : 1;

  const startResize = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const startX = e.clientX;
      const startY = e.clientY;
      const startW = size?.width ?? containerRef.current!.getBoundingClientRect().width;
      const startH = size?.height ?? containerRef.current!.getBoundingClientRect().height;

      const onMove = (ev: MouseEvent) => {
        const dx = ev.clientX - startX;
        const dy = ev.clientY - startY;

        setSize({ width: Math.max(MIN_W, startW + dx), height: Math.max(MIN_H, startH + dy) });
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
