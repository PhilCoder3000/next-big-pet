import React from 'react';
import { Auth } from '../../features/Auth/Auth';
import { ChangeTheme } from '../../features/ChangeTheme';

interface NavBarProps {
  uuid?: string;
}

export function NavBar({ uuid }: NavBarProps) {
  return (
    <header className="w-full py-2 flex items-center justify-end px-5 shadow-md dark:bg-dark-secondary">
      <Auth />
      <ChangeTheme />
    </header>
  );
}
