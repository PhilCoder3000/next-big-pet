import React, { useEffect } from 'react';
import { IconButton } from '../../shared/buttons/IconButton';
import { classes } from '../../helpers/style/classes';
import styles from './ChangeTheme.module.css';
import { useRecoilValue } from 'recoil';
import { userAuthData } from '../../../store/atoms/user/user';

export function ChangeTheme() {
  const { authenticatedUser } = useRecoilValue(userAuthData);
  const theme = authenticatedUser?.theme || 'light'

  useEffect(() => {
    document.documentElement.removeAttribute('class');
    document.documentElement.classList.add(theme);
  }, [theme]);

  const toggleThemeHandler = () => {
    // setTheme((prev: Theme): Theme => (prev === 'dark' ? 'light' : 'dark'));
  }

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
