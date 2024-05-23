import Image from 'next/image';
import * as React from 'react';

// import { useScreenWidthType } from "src/types";
import { useScreenWidth } from '@/hooks/useScreenWidth';
import closeIcon from '@/public/assets/icons/close.svg';
import hamburgerIcon from '@/public/assets/icons/hamburger.svg';

import styles from './style.module.scss';

const FbtHeader = ({
  children,
  className,
  isFixed,
}: {
  children: React.ReactNode;
  className?: string;
  isFixed?: boolean;
}) => {
  return (
    <nav
      className={`${styles.headerContainer} ${isFixed && styles.isFixed} ${
        className ?? ''
      }`}
    >
      {children}
    </nav>
  );
};

const FbtHeaderBrand = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`${styles.headerBrandContainer} ${className ?? ''}`}>
      {children}
    </div>
  );
};

const FbtHeaderItem = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <li className={`${className ?? ''}`}> {children} </li>;
};

const FbtHeaderContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { matches } = useScreenWidth(500);
  return (
    <div>
      {!matches && (
        <ul className={`${styles.headerContentContainer} ${className ?? ''}`}>
          {children}
        </ul>
      )}
    </div>
  );
};

const FbtHeaderMenuItem = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <li className={`${className ?? ''}`}> {children} </li>;
};

const FbtHeaderMenu = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { matches } = useScreenWidth(500);
  return (
    <div>
      {matches && (
        <ul className={`${styles.headerMenuContainer} ${className ?? ''}`}>
          {children}
        </ul>
      )}
    </div>
  );
};

const FbtHeaderMenuToggle = ({
  className,
  isMenuOpen,
  clickHandler,
}: {
  className?: string;
  isMenuOpen: boolean;
  clickHandler: () => void;
}) => {
  const { matches } = useScreenWidth(500);

  return (
    <div>
      {matches && (
        <button
          type="button"
          onClick={clickHandler}
          className={`${className ?? ''}`}
        >
          {isMenuOpen ? (
            <Image
              src={closeIcon}
              alt="close icon mobile view"
              width={25}
              height={25}
            />
          ) : (
            <Image
              src={hamburgerIcon}
              alt="hamburger icon mobile view"
              width={25}
              height={25}
            />
          )}
        </button>
      )}
    </div>
  );
};

export {
  FbtHeader,
  FbtHeaderBrand,
  FbtHeaderContent,
  FbtHeaderItem,
  FbtHeaderMenu,
  FbtHeaderMenuItem,
  FbtHeaderMenuToggle,
};
