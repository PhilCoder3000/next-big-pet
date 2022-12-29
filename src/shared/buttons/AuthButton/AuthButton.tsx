import React from 'react';
import { BaseButton, BaseButtonProps } from '../BaseButton';

interface AuthButtonProps extends BaseButtonProps {
  uuid?: string;
}

export function AuthButton({ uuid, ...otherProps }: AuthButtonProps) {
  return <BaseButton {...otherProps} className="mr-3">Auth</BaseButton>;
}
