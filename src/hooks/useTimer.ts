import { useState, useEffect, useRef } from 'react';

interface UseTimerOptions {
  direction?: 'up' | 'down';
  initialSeconds?: number;
}

interface UseTimerResult {
  seconds: number;
  running: boolean;
  setRunning: React.Dispatch<React.SetStateAction<boolean>>;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
}

export function useTimer({ direction = 'up', initialSeconds = 0 }: UseTimerOptions = {}): UseTimerResult {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => {
          if (direction === 'down') {
            if (prev <= 1) {
              setRunning(false);
              return 0;
            }
            return prev - 1;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, direction]);

  return { seconds, running, setRunning, setSeconds };
}
