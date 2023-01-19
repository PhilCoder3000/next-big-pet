import { AnimatePresence, MotionConfig } from 'framer-motion';
import React, { useCallback } from 'react';
import { classes } from '../../../helpers/style/classes';
import { motion } from 'framer-motion';

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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed w-full h-full inset-0 z-50"
          onClick={onClose}
          initial={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
          animate={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
          exit={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
        >
          <motion.div
            onClick={clickHandler}
            className={classes(
              'relative w-60 h-60 bg-white flex flex-col rounded-md -translate-y-1/2 -translate-x-1/2 left-1/2',
              className,
            )}
            initial={{ top: '-100%' }}
            animate={{ top: '50%' }}
            exit={{ top: '-100%' }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
