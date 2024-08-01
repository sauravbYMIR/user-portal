/* eslint-disable jsx-a11y/control-has-associated-label */

'use client';

import { type ReactNode, useEffect, useState } from 'react';

import { useAppStore } from '@/libs/store';

import { ArrowDownIcon } from '../Icons/Icons';
import accordionStyles from './customAccordion.module.scss';

interface AccordionProps {
  children: ReactNode;
  title: string;
  type:
    | 'DEPARTMENT'
    | 'PROCEDURE'
    | 'SUB-CATEGORY'
    | 'SUB-CATEGORY-WITH-PROCEDURE';
  procedureId?: string;
  className?: string;
  isAccordianOpen: boolean;
}

function CustomAccordion({
  children,
  title,
  procedureId,
  type,
  className,
  isAccordianOpen,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedProcedure, setSelectedProcedure } = useAppStore();

  const setAccordianState = (isopen: boolean) => {
    setIsOpen(isopen);
  };

  useEffect(() => {
    setAccordianState(isAccordianOpen);
  }, []);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={`${accordionStyles.accordionContainer} `}>
      <button
        type="button"
        className={`${accordionStyles.headerContainer} ${isOpen && type === 'DEPARTMENT' ? 'bg-primary-5 px-[24px] py-[12px]' : 'bg-neutral-7'} ${type === 'DEPARTMENT' ? 'px-[24px] py-[16px]' : 'p-0'} ${className}`}
        onClick={toggleAccordion}
      >
        <div className={accordionStyles.headerContentWrapper}>
          {type === 'SUB-CATEGORY-WITH-PROCEDURE' && (
            <ArrowDownIcon
              className={`${isOpen ? 'rotate-180' : 'rotate-0'} h-[36px]`}
              stroke="rgba(9, 111, 144, 1)"
              width="2"
            />
          )}

          <div className="flex w-full items-center justify-between">
            {(type === 'SUB-CATEGORY' || type === 'PROCEDURE') && (
              <input
                className="mr-[24px] size-[24px]"
                type="radio"
                id={procedureId}
                value={procedureId}
                checked={selectedProcedure === procedureId}
                onChange={(e) =>
                  setSelectedProcedure && setSelectedProcedure(e.target.value)
                }
              />
            )}
            <label
              htmlFor={procedureId}
              className={`cursor-pointer font-onsite text-2xl ${isOpen && type === 'SUB-CATEGORY-WITH-PROCEDURE' ? 'text-primary-2' : 'text-neutral-2'} ${type === 'DEPARTMENT' ? 'text-2xl sm:text-md' : 'text-base sm:text-2xl'}`}
            >
              {title}
            </label>
          </div>
        </div>
        {type === 'DEPARTMENT' && (
          <ArrowDownIcon
            className={`${isOpen ? 'rotate-180' : 'rotate-0'} h-[30px]`}
            stroke="rgba(9, 111, 144, 1)"
            width="2"
          />
        )}
      </button>

      {isOpen && (
        <div
          className={`${accordionStyles.contentContainer} ${type === 'SUB-CATEGORY-WITH-PROCEDURE' ? `${accordionStyles.noShadow} px-[44px] py-[4px]` : 'px-[24px] py-[20px]'} flex flex-col gap-[16px] ${type === 'DEPARTMENT' ? 'pt-[20px] sm:pt-[44px]' : 'pt-0'}`}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export default CustomAccordion;
