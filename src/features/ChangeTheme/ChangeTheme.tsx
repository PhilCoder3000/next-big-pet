import React, { useEffect } from 'react';
import { IconButton } from '../../shared/buttons/IconButton';
import { useLocalStorage } from '../../helpers/browser/hooks';
import { classes } from '../../helpers/style/classes';
import styles from './ChangeTheme.module.css';

type Theme = 'light' | 'dark';

const isClient = typeof window !== 'undefined';

interface ChangeThemeProps {
  uuid?: string;
}

export function ChangeTheme({ uuid }: ChangeThemeProps) {
  const { item: theme, setItem: setTheme } = useLocalStorage<Theme>(
    'color-theme',
    'dark',
  );

  useEffect(() => {
    if (isClient) {
      document.documentElement.removeAttribute('class');
      document.documentElement.classList.add(theme);
    }
  }, [theme]);

  const toggleThemeHandler = () =>
    setTheme((prev: Theme): Theme => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <IconButton color="secondary" onClick={toggleThemeHandler}>
      <div
        className={classes(styles.change_theme_div, '', {
          [styles.dark]: theme === 'dark',
          [styles.light]: theme === 'light',
        })}
      />
    </IconButton>
  );
}
