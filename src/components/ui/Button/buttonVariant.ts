import { cva } from 'class-variance-authority';

import styles from './button.module.scss';

export const buttonVariants = cva(styles.button, {
  variants: {
    variant: {
      solid: styles.solid,
      outline: styles.outline,
      ghost: styles.ghost,
      link: styles.link,
    },
    size: {
      default: styles.defaultSize,
      sm: styles.sm,
      lg: styles.lg,
      icon: styles.icon,
    },
  },
  defaultVariants: {
    variant: 'solid',
    size: 'default',
  },
});
