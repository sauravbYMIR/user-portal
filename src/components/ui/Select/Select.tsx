'use client';

import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@radix-ui/react-icons';
import * as SelectPrimitive from '@radix-ui/react-select';
import clsx from 'clsx';
import * as React from 'react';

import styles from './style.module.scss';

const FbtSelect = SelectPrimitive.Root;

const FbtSelectGroup = SelectPrimitive.Group;

const FbtSelectValue = SelectPrimitive.Value;

export interface FbtSelectTriggerType
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
  selectIconClassName?: string;
}

const FbtSelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  FbtSelectTriggerType
>(({ className, selectIconClassName, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={clsx(styles.selecttrigger, className)}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDownIcon
        className={clsx(styles.chevrondownicon, selectIconClassName)}
      />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
FbtSelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const FbtSelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={clsx(styles.selectscrollbutton, className)}
    {...props}
  >
    <ChevronUpIcon />
  </SelectPrimitive.ScrollUpButton>
));
FbtSelectScrollUpButton.displayName =
  SelectPrimitive.ScrollUpButton.displayName;

const FbtSelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={clsx(styles.selectscrollbutton, className)}
    {...props}
  >
    <ChevronDownIcon />
  </SelectPrimitive.ScrollDownButton>
));
FbtSelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const FbtSelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={clsx(
        styles.selectcontent,
        position === 'popper' && styles.selectcontent,
        className,
      )}
      position={position}
      {...props}
    >
      <FbtSelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={clsx(
          styles.selectprimitive,
          position === 'popper' && styles.selectprimitivepopper,
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <FbtSelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
FbtSelectContent.displayName = SelectPrimitive.Content.displayName;

const FbtSelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={clsx(styles.selectlabel, className)}
    {...props}
  />
));
FbtSelectLabel.displayName = SelectPrimitive.Label.displayName;

export interface FbtSelectItemType
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {
  checkIconClassName?: string;
}
const FbtSelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  FbtSelectItemType
>(({ className, checkIconClassName, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={clsx(styles.selectitem, className)}
    {...props}
  >
    <span className={styles.selectitemspan}>
      <SelectPrimitive.ItemIndicator>
        <CheckIcon className={clsx(styles.checkicon, checkIconClassName)} />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
FbtSelectItem.displayName = SelectPrimitive.Item.displayName;

const FbtSelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={clsx(styles.selectseparator, className)}
    {...props}
  />
));
FbtSelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  FbtSelect,
  FbtSelectContent,
  FbtSelectGroup,
  FbtSelectItem,
  FbtSelectLabel,
  FbtSelectScrollDownButton,
  FbtSelectScrollUpButton,
  FbtSelectSeparator,
  FbtSelectTrigger,
  FbtSelectValue,
};
