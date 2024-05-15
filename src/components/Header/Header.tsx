'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import headerStyle from '@/components/Header/header.module.scss';
import { useScreenWidth } from '@/hooks/useWindowWidth';
import denmarkFlag from '@/public/assets/icons/denmarkFlag.svg';
import irelandFlag from '@/public/assets/icons/ireland.svg';
import norwayFlag from '@/public/assets/icons/norwayFlag.svg';
import brandLogo from '@/public/assets/images/brandLogo.svg';

import { CreateAccount } from '../Auth/CreateAccount';
import { VerifyOtp } from '../Auth/VerifyOtp';
import {
  FbtButton,
  FbtHeader,
  FbtHeaderBrand,
  FbtHeaderContent,
  FbtHeaderItem,
  FbtHeaderMenu,
  FbtHeaderMenuItem,
  FbtHeaderMenuToggle,
  FbtSelect,
  FbtSelectContent,
  FbtSelectGroup,
  FbtSelectItem,
  FbtSelectTrigger,
  FbtSelectValue,
} from '../ui';

const menuItems = ['How it works', 'Our Hospitals', 'FAQs'];

interface HeaderPropType {
  howItWorksRef: any;
  ourHospitalRef: any;
  faqsRef: any;
}

function Header({ howItWorksRef, ourHospitalRef, faqsRef }: HeaderPropType) {
  const [isHeaderMenuOpen, setIsHeaderMenuOpen] = useState<boolean>(false);
  const [activeLink, setActiveLink] = useState<string>('');
  const { matches } = useScreenWidth(500);
  const [isLoginModalActive, setIsLoginModalActive] = useState<boolean>(false);
  const [isOtpVerifyModalActive, setIsOtpVerifyModalActive] =
    React.useState<boolean>(false);

  const scrollToSection = (ref: any) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  function handleScrollOnClick(menu: string) {
    if (menu === 'How it works') {
      setTimeout(() => {
        scrollToSection(howItWorksRef);
      }, 500);
    } else if (menu === 'Our Hospitals') {
      setTimeout(() => {
        scrollToSection(ourHospitalRef);
      }, 500);
    } else if (menu === 'FAQs') {
      setTimeout(() => {
        scrollToSection(faqsRef);
      }, 500);
    }
  }

  useEffect(() => {
    document.body.style.overflow = isHeaderMenuOpen ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isHeaderMenuOpen]);

  return (
    <>
      <FbtHeader isFixed className={headerStyle.headerContainer}>
        <FbtHeaderBrand>
          <Image
            src={brandLogo}
            alt="branch icon"
            width={!matches ? 160 : 80}
            height={!matches ? 64 : 32}
          />
        </FbtHeaderBrand>

        <FbtHeaderContent className={headerStyle.headerLinkContainer}>
          {menuItems.map((menu) => {
            return (
              <FbtHeaderItem key={menu}>
                <Link
                  onClick={() => {
                    handleLinkClick(menu);
                    handleScrollOnClick(menu);
                  }}
                  className={`${headerStyle.headerLink} ${activeLink === menu && headerStyle.headerActiveLink}`}
                  href="./"
                >
                  {menu}
                </Link>
              </FbtHeaderItem>
            );
          })}
        </FbtHeaderContent>

        <FbtHeaderContent>
          <FbtSelect defaultValue="NOR">
            <FbtSelectTrigger
              selectIconClassName={headerStyle.headerSelectTriggerIcon}
              className={headerStyle.headerSelectTrigger}
            >
              <FbtSelectValue placeholder="Select" />
            </FbtSelectTrigger>

            <FbtSelectContent className={headerStyle.headerSelectContent}>
              <FbtSelectGroup>
                <FbtSelectItem
                  checkIconClassName={headerStyle.headerSelectTickIcon}
                  className={headerStyle.headerSelectItem}
                  value="NOR"
                >
                  NOR
                </FbtSelectItem>

                <FbtSelectItem
                  checkIconClassName={headerStyle.headerSelectTickIcon}
                  className={headerStyle.headerSelectItem}
                  value="EN"
                >
                  EN
                </FbtSelectItem>

                <FbtSelectItem
                  checkIconClassName={headerStyle.headerSelectTickIcon}
                  className={headerStyle.headerSelectItem}
                  value="DN"
                >
                  DN
                </FbtSelectItem>
              </FbtSelectGroup>
            </FbtSelectContent>
          </FbtSelect>
        </FbtHeaderContent>

        <FbtHeaderContent>
          <FbtHeaderItem>
            <FbtButton
              className={headerStyle.headerLoginBtn}
              size="lg"
              variant="outline"
              onClick={() => setIsLoginModalActive(true)}
            >
              Log in
            </FbtButton>
          </FbtHeaderItem>
        </FbtHeaderContent>

        {matches && (
          <div className={headerStyle.headerMobIconContainer}>
            <FbtSelect defaultValue="NOR">
              <FbtSelectTrigger
                selectIconClassName={headerStyle.headerSelectTriggerIcon}
                className={headerStyle.headerSelectTrigger}
              >
                <FbtSelectValue placeholder="Select" />
              </FbtSelectTrigger>

              <FbtSelectContent className={headerStyle.headerSelectContent}>
                <FbtSelectGroup>
                  <FbtSelectItem
                    checkIconClassName={headerStyle.headerSelectTickIcon}
                    className={headerStyle.headerSelectItem}
                    value="NOR"
                  >
                    <Image src={norwayFlag} alt="norway flag" />
                    <span className={headerStyle.dropdownOptionDesc}>
                      Norway
                    </span>
                  </FbtSelectItem>

                  <FbtSelectItem
                    checkIconClassName={headerStyle.headerSelectTickIcon}
                    className={headerStyle.headerSelectItem}
                    value="DN"
                  >
                    <Image src={denmarkFlag} alt="denmark flag" />
                    <span className={headerStyle.dropdownOptionDesc}>
                      Denmark
                    </span>
                  </FbtSelectItem>

                  <FbtSelectItem
                    checkIconClassName={headerStyle.headerSelectTickIcon}
                    className={headerStyle.headerSelectItem}
                    value="IR"
                  >
                    <Image src={irelandFlag} alt="ireland flag" />
                    <span className={headerStyle.dropdownOptionDesc}>
                      Ireland
                    </span>
                  </FbtSelectItem>
                </FbtSelectGroup>
              </FbtSelectContent>
            </FbtSelect>

            <FbtHeaderMenuToggle
              clickHandler={() => setIsHeaderMenuOpen(!isHeaderMenuOpen)}
              isMenuOpen={isHeaderMenuOpen}
            />
          </div>
        )}

        {isHeaderMenuOpen && (
          <FbtHeaderMenu className={headerStyle.headerMobileMenuContainer}>
            <FbtHeaderMenuItem className={headerStyle.headerMobile}>
              <FbtHeaderBrand>
                <Image
                  src={brandLogo}
                  alt="branch icon"
                  width={80}
                  height={32}
                />
              </FbtHeaderBrand>

              <FbtHeaderMenuToggle
                clickHandler={() => setIsHeaderMenuOpen(!isHeaderMenuOpen)}
                isMenuOpen={isHeaderMenuOpen}
              />
            </FbtHeaderMenuItem>

            {menuItems.map((menu: string) => {
              return (
                <FbtHeaderMenuItem className={headerStyle.liWrapper} key={menu}>
                  <Link
                    onClick={() => {
                      setIsHeaderMenuOpen(false);

                      handleScrollOnClick(menu);
                      handleLinkClick(menu);
                    }}
                    className={`${headerStyle.menuItem} ${activeLink === menu && headerStyle.menuItemActive}`}
                    href="./"
                  >
                    {menu}
                  </Link>
                </FbtHeaderMenuItem>
              );
            })}

            <FbtHeaderMenuItem className={headerStyle.liWrapper}>
              <Link
                className={headerStyle.menuItemBtn}
                href="./"
                onClick={() => setIsLoginModalActive(true)}
              >
                Log in
              </Link>
            </FbtHeaderMenuItem>
          </FbtHeaderMenu>
        )}
      </FbtHeader>
      {isLoginModalActive && (
        <CreateAccount
          setIsLoginModalActive={setIsLoginModalActive}
          setIsOtpVerifyModalActive={setIsOtpVerifyModalActive}
        />
      )}
      {isOtpVerifyModalActive && (
        <VerifyOtp setIsOtpVerifyModalActive={setIsOtpVerifyModalActive} />
      )}
    </>
  );
}

export default Header;
