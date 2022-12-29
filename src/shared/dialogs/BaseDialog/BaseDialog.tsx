import React, { useCallback } from 'react';
import { classes } from '../../utils/classes';

export interface BaseDialogProps
  extends React.PropsWithChildren,
    React.HTMLProps<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
}

export function BaseDialog({
  isOpen,
  onClose,
  children,
  className,
  onClick,
  ...otherProps
}: BaseDialogProps) {
  const clickHandler = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (onClick) {
        onClick(e);
      }
    },
    [onClick],
  );

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed w-full h-full inset-0 z-50 bg-black bg-opacity-10 flex"
      onClick={onClose}
    >
      <div
        {...otherProps}
        onClick={clickHandler}
        className={classes(
          'm-auto w-60 h-60 bg-white flex flex-col rounded-md',
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
