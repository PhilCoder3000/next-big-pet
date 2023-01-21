import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useTimer } from '../../../helpers/dateTime/useTimer';
import { Portal } from '../../../helpers/react/Portal';

interface BaseSnackbarProps {
  text?: string | null;
  estimate?: number;
}

export function BaseSnackbar({
  text: initialText,
  estimate = 5,
}: BaseSnackbarProps) {
  const [text, setText] = useState('');
  const { leftTime, startTimer } = useTimer(estimate, () => setText(''));

  useEffect(() => {
    if (initialText && initialText !== text) {
      setText(initialText)
      startTimer()
    }
  }, [initialText, startTimer, text])
  return (
    <Portal>
      <AnimatePresence>
        {text && (
          <motion.div className="fixed left-1/2 -translate-x-1/2 px-3 py-1 bottom-5 rounded-lg bg-red-500 text-white">
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
}
