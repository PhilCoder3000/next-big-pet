import React, { useEffect } from 'react';
import { IconButton } from '../../shared/buttons/IconButton';
import { useLocalStorage } from '../../helpers/browserApi/hooks';
import Image from 'next/image';

type Theme = 'light' | 'dark';

interface ChangeThemeProps {
  uuid?: string;
}

const getPreferTheme = (): Theme => {
  if (typeof window !== 'undefined') {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  }
  return 'light';
};

export function ChangeTheme({ uuid }: ChangeThemeProps) {
  const { item: theme, setItem: setTheme } = useLocalStorage<Theme>(
    'color-theme',
    getPreferTheme(),
  );

  useEffect(() => {
    document.documentElement.removeAttribute('class');
    document.documentElement.classList.add(theme);
  }, [theme]);

  const toggleThemeHandler = () => {
    setTheme((prev: Theme): Theme => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <IconButton color="secondary" onClick={toggleThemeHandler}>
      <Image
        src={theme === 'dark' ? 'svg/theme/dark_mode.svg' : 'svg/theme/light_mode.svg'}
        width={15}
        height={15}
        alt="change-theme"
        // className="fill-light-primary dark:fill-dark-primary"
      />
    </IconButton>
  );
}
