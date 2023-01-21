import { useEffect, useRef, useState } from 'react';

export function useTimer(seconds: number, cb: () => void) {
  const timerRef = useRef<number | null>(null);
  const [leftTime, setLeftTime] = useState(seconds);

  const startTimer = () =>
    (timerRef.current = window.setInterval(
      () => setLeftTime((prev) => prev - 1),
      1000,
    ));

  useEffect(
    () => () => timerRef.current ? clearInterval(timerRef.current) : undefined,
    [],
  );

  useEffect(() => {
    if (leftTime === 0 && timerRef.current) {
      cb();
      clearInterval(timerRef.current);
    }
  }, [cb, leftTime]);

  return { leftTime, startTimer };
}
