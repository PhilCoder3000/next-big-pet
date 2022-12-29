import React from 'react';
import { classes } from '../../utils/classes';

type Color = 'primary' | 'secondary';

export interface BaseButtonProps extends ButtonProps {
  color?: Color;
}

export function BaseButton({ color, ...buttonProps }: BaseButtonProps) {
  switch (color) {
    case 'primary':
      return <PrimaryButton {...buttonProps} />;
    case 'secondary':
      return <SecondaryButton {...buttonProps} />;
    default:
      return <PrimaryButton {...buttonProps} />;
  }
}

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {}

const PrimaryButton = ({
  children,
  className,
  ...buttonProps
}: ButtonProps) => (
  <button
    {...buttonProps}
    type="button"
    className={classes("rounded-md p-1 bg-light-primary dark:bg-dark-primary text-light-primary dark:text-dark-primary border border-light-primary dark:border-dark-primary", className)}
  >
    {children}
  </button>
);

const SecondaryButton = ({
  children,
  className,
  ...buttonProps
}: ButtonProps) => (
  <button
    {...buttonProps}
    type="button"
    className={classes("rounded-md p-1 bg-light-secondary dark:bg-dark-secondary text-light-secondary dark:text-dark-secondary border border-light-primary dark:border-dark-secondary", className)}
  >
    {children}
  </button>
);
