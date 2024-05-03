'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import type { VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import * as React from 'react';

import styles from './Modal.module.scss';
import { modalBackdropVariant, modalPlacementVariant } from './modalVariant';

export interface FbtModalContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof modalPlacementVariant>,
    VariantProps<typeof modalBackdropVariant> {}

export interface FbtModalOverlayProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>,
    VariantProps<typeof modalBackdropVariant> {}

const FbtModal = DialogPrimitive.Root;

const FbtModalTrigger = DialogPrimitive.Trigger;

const FbtModalPortal = DialogPrimitive.Portal;

const FbtModalClose = DialogPrimitive.Close;

const FbtModalOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  FbtModalOverlayProps
>(({ className, backdrop, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    // className={clsx(styles.modaloverlay, className, placement, backdrop)}
    className={clsx(modalBackdropVariant({ className, backdrop }))}
    {...props}
  />
));
FbtModalOverlay.displayName = DialogPrimitive.Overlay.displayName;

const FbtModalContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  FbtModalContentProps
>(({ className, placement, backdrop, children, ...props }, ref) => (
  <FbtModalPortal>
    <FbtModalOverlay backdrop={backdrop} />
    <DialogPrimitive.Content
      ref={ref}
      className={clsx(modalPlacementVariant({ className, placement }))}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className={styles.modalclose}>
        <Cross2Icon className={styles.modalcloseicon} />
        <span className={styles.modalclosespan}>Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </FbtModalPortal>
));
FbtModalContent.displayName = DialogPrimitive.Content.displayName;

const FbtModalHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx(styles.modalheader, className)} {...props} />
);
FbtModalHeader.displayName = 'FbtModalHeader';

const FbtModalFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx(styles.modalfooter, className)} {...props} />
);
FbtModalFooter.displayName = 'ModalFooter';

const FbtModalTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={clsx(styles.modaltitle, className)}
    {...props}
  />
));
FbtModalTitle.displayName = DialogPrimitive.Title.displayName;

const FbtModalDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={clsx(styles.modaldescription, className)}
    {...props}
  />
));
FbtModalDescription.displayName = DialogPrimitive.Description.displayName;

export {
  FbtModal,
  FbtModalClose,
  FbtModalContent,
  FbtModalDescription,
  FbtModalFooter,
  FbtModalHeader,
  FbtModalOverlay,
  FbtModalPortal,
  FbtModalTitle,
  FbtModalTrigger,
};
