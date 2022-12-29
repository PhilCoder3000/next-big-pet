import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps extends React.PropsWithChildren {}

export function Portal({ children }: PortalProps) {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
    ref.current = document.getElementById('portal');
    return () => setMounted(false);
  }, []);

  if (!mounted || !ref.current) {
    return null;
  }

  return createPortal(children, ref.current);
}
