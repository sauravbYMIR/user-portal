import { cva } from 'class-variance-authority';

import styles from './Modal.module.scss';

export const modalPlacementVariant = cva(styles.modalcontent, {
  variants: {
    placement: {
      top: styles.top,
      bottom: styles.bottom,
      center: styles.center,
      'top-center': styles.topcenter,
      'bottom-center': styles.bottomcenter,
    },
  },
  defaultVariants: {
    placement: 'center',
  },
});
export const modalBackdropVariant = cva(styles.modaloverlay, {
  variants: {
    backdrop: {
      opaque: styles.opaque,
      blur: styles.blur,
      transparent: styles.transparent,
    },
  },
  defaultVariants: {
    backdrop: 'opaque',
  },
});
