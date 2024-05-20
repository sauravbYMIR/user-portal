import { Slot } from '@radix-ui/react-slot';
import type { VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import * as React from 'react';

import { buttonVariants } from './buttonVariant';

export interface FbtButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const FbtButton = React.forwardRef<HTMLButtonElement, FbtButtonProps>(
  ({ className, size, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={clsx(buttonVariants({ className, size, variant }))}
        {...props}
        ref={ref}
      />
    );
  },
);

FbtButton.displayName = 'FbtButton';

export { FbtButton };
