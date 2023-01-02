import React from 'react';
import { classes } from '../../../helpers/style/classes';

type Color = 'primary' | 'secondary';

export interface BaseTextFieldProps extends BaseProps {
  color?: Color;
}

export function BaseTextField({ color, ...otherProps }: BaseTextFieldProps) {
  switch (color) {
    case 'primary':
      return <PrimaryTextField {...otherProps} />;
    case 'secondary':
      return <SecondaryTextField {...otherProps} />;
    default:
      return <PrimaryTextField {...otherProps} />;
  }
}

interface BaseProps extends React.HTMLProps<HTMLInputElement> {}

const PrimaryTextField = ({ className, ...otherProps }: BaseProps) => (
  <input
    type="text"
    {...otherProps}
    className={classes(
      'pt-1 pb-2 px-2 rounded-md border-light-grey border bg-white dark:bg-dark-secondary dark:border-dark-grey outline-none w-full text-base line h-9 text-light-grey dark:text-dark-grey',
      className,
    )}
  />
);

const SecondaryTextField = ({ className, ...otherProps }: BaseProps) => (
  <input {...otherProps} type="text" className={classes('p-1', className)} />
);
