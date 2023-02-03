import React, { useState } from 'react';
import { classes } from '../../../helpers/style/classes';
import { BaseDialog, BaseDialogProps } from '../../../shared/dialogs/BaseDialog';
import { SignInBody } from './SignInBody';
import { SignUpBody } from './SignUpBody';

type AuthDialogProps = BaseDialogProps

type Mode = 'Sign in' | 'Sign up'

export function AuthDialog(props: AuthDialogProps) {
  const [mode, setMode] = useState<Mode>('Sign in');

  return (
    <BaseDialog
      {...props}
      className="bg-light-secondary dark:bg-dark-secondary rounded-lg"
    >
      <div className="flex w-full h-8">
        {['Sign in', 'Sign up'].map((item) => (
          <div
            key={item}
            onClick={() => setMode(item as Mode)}
            className={classes(
              'rounded-t-md text-center w-1/2 pt-1 cursor-pointer transition',
              mode === item
                ? 'bg-light-primary dark:bg-dark-primary'
                : 'bg-light-secondary dark:bg-dark-secondary dark:text-dark-secondary',
            )}
          >
            <p className="font-semibold">{item}</p>
          </div>
        ))}
      </div>
      <div
        className={classes(
          'flex flex-col flex-grow border-2 p-2 border-light-primary dark:border-dark-primary rounded-b-md bg-white dark:bg-black',
          mode === 'Sign in' ? 'rounded-tr-md' : 'rounded-tl-md',
        )}
      >
        {mode === 'Sign in' && <SignInBody />}
        {mode === 'Sign up' && <SignUpBody />}
      </div>
    </BaseDialog>
  );
}
