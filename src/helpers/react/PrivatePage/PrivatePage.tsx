import { useRouter } from 'next/router';
import React from 'react';

export function PrivatePage({ children }: React.PropsWithChildren) {
  const user = null;
  return <h1>please auth</h1>
  return <>{children}</>;
}
