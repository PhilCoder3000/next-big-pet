import React, { useId } from 'react';
import { classes } from '../../../helpers/style/classes';
import cls from './BaseTextField.module.css';

type Color = 'primary' | 'secondary';

export interface BaseTextFieldProps extends BaseProps {
  color?: Color;
}

export function BaseTextField({
  color = 'primary',
  ...otherProps
}: BaseTextFieldProps) {
  const id = useId()
  switch (color) {
    case 'primary':
      return <PrimaryTextField id={id} {...otherProps} />;
    case 'secondary':
      return <SecondaryTextField id={id} {...otherProps} />;
    default:
      return null;
  }
}

interface BaseProps extends React.HTMLProps<HTMLInputElement> {
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PrimaryTextField = ({ className, label, id, ...otherProps }: BaseProps) => (
  <div className={cls.container}>
    <input
      id={id}
      placeholder=" "
      type="text"
      {...otherProps}
      className={classes(
        'pt-1 pb-2 px-2 rounded-md border-light-grey border bg-white dark:bg-dark-secondary dark:border-dark-grey outline-none w-full text-base line h-9 text-light-grey dark:text-dark-grey',
        cls.input,
      )}
    />
    <label htmlFor={id} className={cls.label}>{label}</label>
  </div>
);

const SecondaryTextField = ({ className, ...otherProps }: BaseProps) => (
  <input {...otherProps} type="text" className={classes('p-1', className)} />
);
