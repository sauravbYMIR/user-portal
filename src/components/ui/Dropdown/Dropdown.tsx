'use client';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import {
  CheckIcon,
  ChevronRightIcon,
  DotFilledIcon,
} from '@radix-ui/react-icons';
import clsx from 'clsx';
import * as React from 'react';

import styles from './Dropdown.module.scss';

const FbtDropdownMenu = DropdownMenuPrimitive.Root;

const FbtDropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const FbtDropdownMenuGroup = DropdownMenuPrimitive.Group;

const FbtDropdownMenuPortal = DropdownMenuPrimitive.Portal;

const FbtDropdownMenuSub = DropdownMenuPrimitive.Sub;

const FbtDropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const FbtDropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={clsx(
      styles.subtrigger,
      inset && styles.subtriggerInsert,
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRightIcon className={styles.chevronrighticon} />
  </DropdownMenuPrimitive.SubTrigger>
));
FbtDropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName;

const FbtDropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={clsx(styles.menuSubContent, className)}
    {...props}
  />
));
FbtDropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName;

const FbtDropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={clsx(styles.menuSubContent, className)}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
FbtDropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const FbtDropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={clsx(styles.menuitem, inset && styles.menuiteminset, className)}
    {...props}
  />
));
FbtDropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const FbtDropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={clsx(styles.menuitem, className)}
    checked={checked}
    {...props}
  >
    <span className={styles.menucheckboxspan}>
      <DropdownMenuPrimitive.ItemIndicator>
        <CheckIcon className={styles.checkicon} />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
FbtDropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName;

const FbtDropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={clsx(styles.menuitem, className)}
    {...props}
  >
    <span className={styles.menucheckboxspan}>
      <DropdownMenuPrimitive.ItemIndicator>
        <DotFilledIcon className={styles.dotfilled} />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
FbtDropdownMenuRadioItem.displayName =
  DropdownMenuPrimitive.RadioItem.displayName;

const FbtDropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={clsx(
      styles.menulabel,
      inset && styles.menulabelinset,
      className,
    )}
    {...props}
  />
));
FbtDropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const FbtDropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={clsx(styles.menuseparator, className)}
    {...props}
  />
));
FbtDropdownMenuSeparator.displayName =
  DropdownMenuPrimitive.Separator.displayName;

const FbtDropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return <span className={clsx(styles.menushortcut, className)} {...props} />;
};
FbtDropdownMenuShortcut.displayName = 'FbtDropdownMenuShortcut';

export {
  FbtDropdownMenu,
  FbtDropdownMenuCheckboxItem,
  FbtDropdownMenuContent,
  FbtDropdownMenuGroup,
  FbtDropdownMenuItem,
  FbtDropdownMenuLabel,
  FbtDropdownMenuPortal,
  FbtDropdownMenuRadioGroup,
  FbtDropdownMenuRadioItem,
  FbtDropdownMenuSeparator,
  FbtDropdownMenuShortcut,
  FbtDropdownMenuSub,
  FbtDropdownMenuSubContent,
  FbtDropdownMenuSubTrigger,
  FbtDropdownMenuTrigger,
};
