import React from 'react';
import { classes } from '../../../helpers/style/classes';
import { CircularLoader } from '../../loaders/CircularLoader';
import { BaseButton, BaseButtonProps } from '../BaseButton';

interface LoadingButtonProps extends BaseButtonProps {
  isLoading?: boolean;
}

export function LoadingButton({
  isLoading,
  children,
  className,
  ...otherProps
}: LoadingButtonProps) {
  return (
    <BaseButton
      {...otherProps}
      className={classes('relative', className, {
        'text-opacity-0 dark:text-opacity-0 transition': !!isLoading,
      })}
    >
      <div
        className={classes(
          'absolute top-0 left-0 w-full h-full flex justify-center items-center z-10 transition',
          '',
          {
            'opacity-100': !!isLoading,
            'opacity-0': !isLoading,
          },
        )}
        style={{ fontSize: '2px' }}
      >
        <CircularLoader />
      </div>
      {children}
    </BaseButton>
  );
}
