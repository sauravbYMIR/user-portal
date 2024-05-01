'use client';

import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import * as React from 'react';

import styles from './style.module.scss';

const FbtAccordion = AccordionPrimitive.Root;

const FbtAccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={`${styles.accordianItem} ${className ?? ''}`}
    {...props}
  />
));
FbtAccordionItem.displayName = 'FbtAccordionItem';

const FbtAccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className={`${styles.accordianHeader}`}>
    <AccordionPrimitive.Trigger
      ref={ref}
      className={`${styles.accordianTrigger} ${className ?? ''}`}
      {...props}
    >
      {children}
      <ChevronDownIcon className={`${styles.chevronDownIcon}`} />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
FbtAccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const FbtAccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={`${styles.accordianContent}`}
    {...props}
  >
    <div className={`${styles.accordianContentChildren} ${className ?? ''}`}>
      {children}
    </div>
  </AccordionPrimitive.Content>
));
FbtAccordionContent.displayName = AccordionPrimitive.Content.displayName;

export {
  FbtAccordion,
  FbtAccordionContent,
  FbtAccordionItem,
  FbtAccordionTrigger,
};
