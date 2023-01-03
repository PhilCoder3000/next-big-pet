import React from 'react';
import { NavBar } from '../NavBar';

interface LayoutProps extends React.PropsWithChildren {}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex flex-col">
      <NavBar />
      <main className="flex-grow">{children}</main>
    </div>
  );
}
