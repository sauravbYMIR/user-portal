'use client';

import 'react-day-picker/dist/style.css';

import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import * as React from 'react';
import { DayPicker } from 'react-day-picker';

import styles from './FbtCalendar.module.scss';

export type FbtCalendarProps = React.ComponentProps<typeof DayPicker>;

function FbtCalendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: FbtCalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      classNames={{
        day_selected: styles.selectedDay,
        day_range_middle: styles.dayMiddleRange,
        day: styles.day,
        head_cell: styles.headCell,
        caption_label: styles.captionLabel,
        cell: styles.cell,
        ...classNames,
      }}
      className={clsx(className)}
      components={{
        // eslint-disable-next-line react/no-unstable-nested-components
        IconLeft: () => (
          <ChevronLeftIcon
            className="size-4"
            stroke="#b6b6ba"
            strokeWidth="0.75px"
          />
        ),
        // eslint-disable-next-line react/no-unstable-nested-components
        IconRight: () => (
          <ChevronRightIcon
            className="size-4"
            stroke="#b6b6ba"
            strokeWidth="0.75px"
          />
        ),
      }}
      {...props}
    />
  );
}
FbtCalendar.displayName = 'FbtCalendar';

export { FbtCalendar };
