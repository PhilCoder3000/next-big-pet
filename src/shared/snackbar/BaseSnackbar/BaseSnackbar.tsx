import React from 'react';
import { Portal } from '../../../helpers/react/Portal';

interface BaseSnackbarProps {
  text?: string | null;
}

export function BaseSnackbar({ text }: BaseSnackbarProps) {
  if (!text) return null
  return (
    <Portal>
      <div className="fixed left-1/2 -translate-x-1/2 px-3 py-1 bottom-5 rounded-lg bg-red-500 text-white">
        {text}
      </div>
    </Portal>
  );
}
