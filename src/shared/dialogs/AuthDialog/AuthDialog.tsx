import React, { useState } from 'react';
import { BaseButton } from '../../buttons/BaseButton';
import { BaseTextField } from '../../fields/BaseTextField';
import { PasswordTextField } from '../../fields/PasswordTextField';
import { classes } from '../../utils/classes';
import { BaseDialog, BaseDialogProps } from '../BaseDialog';

interface AuthDialogProps extends BaseDialogProps {
  email: string;
  password: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  login: () => void;
  logout: () => void
}

export function AuthDialog({
  email,
  password,
  handleChange,
  login,
  logout,
  ...props
}: AuthDialogProps) {
  const [mode, setMode] = useState<'sign-in' | 'sign-up'>('sign-in');

  return (
    <BaseDialog
      {...props}
      className="bg-light-secondary dark:bg-dark-secondary rounded-lg"
    >
      <div className="flex w-full h-8">
        <div
          onClick={() => setMode('sign-in')}
          className={classes(
            'rounded-t-md text-center w-1/2 pt-1 cursor-pointer transition',
            mode === 'sign-in'
              ? 'bg-light-primary dark:bg-dark-primary'
              : 'bg-light-secondary dark:bg-dark-secondary dark:text-dark-secondary',
          )}
        >
          <p className="font-semibold">Sign in</p>
        </div>
        <div
          onClick={() => setMode('sign-up')}
          className={classes(
            'rounded-t-md text-center w-1/2 pt-1 cursor-pointer transition',
            mode === 'sign-up'
              ? 'bg-light-primary dark:bg-dark-primary'
              : 'bg-light-secondary dark:bg-dark-secondary dark:text-dark-secondary',
          )}
        >
          <p className="font-semibold">Sign up</p>
        </div>
      </div>
      <div
        className={classes(
          'flex-grow border-2 p-2 border-light-primary dark:border-dark-primary rounded-b-md bg-white dark:bg-black',
          mode === 'sign-in' ? 'rounded-tr-md' : 'rounded-tl-md',
        )}
      >
        <BaseTextField
          className="mb-2"
          placeholder="email"
          value={email}
          name="email"
          onChange={handleChange}
        />
        {/* <BaseTextField className="mb-2" placeholder="name" /> */}
        <PasswordTextField
          placeholder="password"
          value={password}
          name='password'
          onChange={handleChange}
        />
        <BaseButton onClick={login}>login</BaseButton>
        <BaseButton onClick={logout}>logout</BaseButton>
      </div>
    </BaseDialog>
  );
}
