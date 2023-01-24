import React from 'react';
import { classes } from '../../../helpers/style/classes';
import cls from './CircularLoader.module.css';

interface CircularLoaderProps {
  className?: string;
}

export function CircularLoader({ className }: CircularLoaderProps) {
  return (
    <div className={classes(cls.ldsRing, className)}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
