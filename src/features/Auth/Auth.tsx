import React, { useState } from 'react';
import { AuthButton } from '../../shared/buttons/AuthButton';
import { AuthDialog } from '../../shared/dialogs/AuthDialog';
import { Portal } from '../../shared/reactHelpers/Portal';

interface AuthProps {
  uuid?: string;
}

export function Auth({ uuid }: AuthProps) {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <AuthButton color="primary" onClick={() => setOpen(true)}>Auth</AuthButton>
      <Portal>
        <AuthDialog isOpen={isOpen} onClose={() => setOpen(false)} />
      </Portal>
    </>
  );
}
