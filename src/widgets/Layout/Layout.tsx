import React from 'react';
import { NavBar } from '../NavBar';

interface LayoutProps extends React.PropsWithChildren {}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
    </>
  );
}
