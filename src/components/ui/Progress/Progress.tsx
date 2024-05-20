'use client';

import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as React from 'react';

import styles from './Progress.module.scss';

const FbtProgress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={`${styles.progressRoot} ${className}`}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={`${styles.progressIndicator}`}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
FbtProgress.displayName = ProgressPrimitive.Root.displayName;

export { FbtProgress };
