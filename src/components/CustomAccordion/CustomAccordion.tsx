/* eslint-disable jsx-a11y/control-has-associated-label */

'use client';

import { type ReactNode, useState } from 'react';

import accordionStyles from './customAccordion.module.scss';

interface AccordionProps {
  children: ReactNode;
  title: string;
  // editClickHandler?: () => void;
  // type: 'DEPARTMENT' | 'PROCEDURE' | 'SUB-CATEGORY';
}

function CustomAccordion({
  children,
  title,
  // editClickHandler,
  // type,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={accordionStyles.accordionContainer}>
      <button
        type="button"
        className={accordionStyles.headerContainer}
        onClick={toggleAccordion}
      >
        <div className={accordionStyles.headerContentWrapper}>
          {/* <button
            onClick={toggleAccordion}
            className="cursor-pointer"
            type="button"
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={'w-[13.34px] h-[13.34px]' ?? 'size-6'}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 15.75 7.5-7.5 7.5 7.5"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={'w-[13.34px] h-[13.34px]' ?? 'size-6'}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            )}
          </button> */}
          <p className="font-poppins text-base text-black18">{title}</p>
        </div>
        {/* <button
          type="button"
          className="cursor-pointer"
          onClick={editClickHandler}
        > */}
        {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg> */}
        {/* </button> */}
      </button>

      {isOpen && (
        <div className={accordionStyles.contentContainer}>{children}</div>
      )}
    </div>
  );
}

export default CustomAccordion;
