import React, { useState } from 'react';
import { BaseTextField, BaseTextFieldProps } from '../BaseTextField';
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri';
import { classes } from '../../../helpers/style/classes';

interface PasswordTextFieldProps extends BaseTextFieldProps {}

type Type = 'text' | 'password';

export function PasswordTextField({
  className,
  ...otherProps
}: PasswordTextFieldProps) {
  const [type, setType] = useState<Type>('password');

  const toggleType = () =>
    setType((prev) => (prev === 'password' ? 'text' : 'password'));

  return (
    <div className="flex border rounded-md border-light-grey dark:border-dark-grey dark:bg-dark-secondary">
      <BaseTextField type={type} {...otherProps} className={classes('border-none', className)} />
      <button type="button" onClick={toggleType} className="w-6 text-light-secondary dark:text-dark-grey">
        {type === 'password' ? <RiEyeCloseLine /> : <RiEyeLine />}
      </button>
    </div>
  );
}
