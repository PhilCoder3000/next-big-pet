import React from 'react';
import { BaseDialog, BaseDialogProps } from '../BaseDialog';

interface AuthDialogProps extends BaseDialogProps {
  uuid?: string;
}

export function AuthDialog({ uuid, ...props }: AuthDialogProps) {
  return <BaseDialog {...props}>Hello</BaseDialog>;
}
