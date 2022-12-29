import React from 'react';

export interface BaseDialogProps extends React.PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
}

export function BaseDialog({ isOpen, onClose, children }: BaseDialogProps) {
  if (!isOpen) {
    return null;
  }
  return (
    <div
      className="fixed w-full h-full inset-0 z-50 bg-black bg-opacity-5 flex"
      onClick={onClose}
    >
      <div className='m-auto w-60 h-60 bg-white'>
        {children}
      </div>
    </div>
  );
}
