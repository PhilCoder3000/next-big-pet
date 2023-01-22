import React from 'react';
import { Auth } from '../../features/Auth/Auth';
import { ChangeTheme } from '../../features/ChangeTheme';
import { useWindowWidth } from '../../helpers/browser/hooks/useWindowWidth';
import { MobileMenu } from './Components/MobileMenu';
import { DesktopMenu } from './Components/DesktopMenu';

interface NavBarProps {
  uuid?: string;
}

export function NavBar({ uuid }: NavBarProps) {
  const { screen } = useWindowWidth();
  return (
    <header className="w-full py-2 flex items-center justify-end px-5 shadow-md dark:bg-dark-secondary">
      {(screen === 'sm' || screen === 'md') ? <MobileMenu /> : <DesktopMenu />}
      <Auth />
      <ChangeTheme />
    </header>
  );
}
