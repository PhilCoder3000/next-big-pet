import { useEffect, useMemo, useRef, useState } from 'react';

type Screen = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | null;

export const useWindowWidth = () => {
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    const resizeListener = () => {
      if (typeof window !== 'undefined') {
        setWidth(window.innerWidth);
      }
    };

    resizeListener();
    window.addEventListener('resize', resizeListener);

    return () => window.removeEventListener('resize', resizeListener);
  }, []);

  const screen = useMemo<Screen>(() => {
    if (!width) return null;
    if (width < 640) {
      return 'sm';
    }
    if (width < 768) {
      return 'sm';
    }
    if (width < 1024) {
      return 'lg';
    }
    if (width < 1280) {
      return 'xl';
    }
    return '2xl';
  }, [width]);

  return { screen };
};
