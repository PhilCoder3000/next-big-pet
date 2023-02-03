import { motion } from 'framer-motion';
import React from 'react';
import { Portal } from '../../helpers/react/Portal';
import { CircularLoader } from '../../shared/loaders/CircularLoader';

type Position = {
  top: number;
  left: number;
  bottom: number;
  right: number;
};

interface PostRedirectAnimProps {
  startPosition: Position | null;
}

export function PostRedirectAnim({ startPosition }: PostRedirectAnimProps) {
  return (
    <Portal>
      {startPosition && (
        <motion.div
          initial={startPosition}
          animate={{
            top: 48,
            left: 0,
            bottom: 0,
            right: 0,
          }}
          exit={{
            opacity: 0,
          }}
          className="flex rounded-md absolute bg-white dark:bg-black"
        >
          <motion.div
            className="m-auto"
            initial={{
              scale: 0.1,
            }}
            animate={{
              scale: 1,
            }}
          >
            <CircularLoader />
          </motion.div>
        </motion.div>
      )}
    </Portal>
  );
}
