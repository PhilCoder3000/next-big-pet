import React, { useState } from 'react';
import { classes } from '../../utils/classes';
import { BaseDialog, BaseDialogProps } from '../BaseDialog';

interface AuthDialogProps extends BaseDialogProps {
  uuid?: string;
}

export function AuthDialog({ uuid, ...props }: AuthDialogProps) {
  const [mode, setMode] = useState<'sign-in' | 'sign-up'>('sign-in');

  return (
    <BaseDialog {...props}>
      <div className="flex w-full h-8">
        <div
          onClick={() => setMode('sign-in')}
          className={classes(
            'rounded-t-md text-center w-1/2 cursor-pointer transition',
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
            'rounded-t-md text-center w-1/2 cursor-pointer transition',
            mode === 'sign-up'
              ? 'bg-light-primary dark:bg-dark-primary'
              : 'bg-light-secondary dark:bg-dark-secondary dark:text-dark-secondary',
          )}
        >
          <p className="font-semibold">Sign up</p>
        </div>
      </div>
      <div className="flex-grow border-2 p-2 border-light-primary dark:border-dark-primary">
        asdf
      </div>
    </BaseDialog>
  );
}
