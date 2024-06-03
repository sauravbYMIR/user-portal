'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import headerStyle from '@/components/Header/header.module.scss';
import useTranslation from '@/hooks/useTranslation';
import { useScreenWidth } from '@/hooks/useWindowWidth';
import { useAppStore } from '@/libs/store';
import brandLogo from '@/public/assets/images/brandLogo.svg';
import denmarkFlag from '@/public/assets/images/demark_flag.png';
import irelandFlag from '@/public/assets/images/ireland_flag.png';
import norwayFlag from '@/public/assets/images/norway_flag.png';
import swedenFlag from '@/public/assets/images/sweden_flag.png';
import type { LocaleType } from '@/types/component';
import { handleGetLocalStorage, handleSetLocalStorage } from '@/utils/global';

import { CreateAccount } from '../Auth/CreateAccount';
import { VerifyOtpSuspense } from '../Auth/VerifyOtp';
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
import { ProfileHeader } from './ProfileHeader';

const menuItems = [
  { value: 'How it works', label: 'How-it-works' },
  { value: 'Our Hospitals', label: 'Our-Hospitals' },
  { value: 'FAQs', label: 'FAQs' },
];

interface HeaderPropType {
  howItWorksRef: any;
  ourHospitalRef: any;
  faqsRef: any;
}

function Header({ howItWorksRef, ourHospitalRef, faqsRef }: HeaderPropType) {
  const { t } = useTranslation();
  // TODO: create me endpoint to check
  const accessToken = handleGetLocalStorage({ tokenKey: 'access_token' });
  const selectedLanguage = handleGetLocalStorage({
    tokenKey: 'selected_language',
  });
  const [isHeaderMenuOpen, setIsHeaderMenuOpen] = useState<boolean>(false);
  const [activeLink, setActiveLink] = useState<string>('');
  const { matches } = useScreenWidth(500);
  const { isLoginModalActive, setIsLoginModalActive, isOtpVerifyModalActive } =
    useAppStore();

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
              <FbtHeaderItem key={menu.value}>
                <Link
                  onClick={() => {
                    handleLinkClick(menu.value);
                    handleScrollOnClick(menu.value);
                  }}
                  className={`${headerStyle.headerLink} ${activeLink === menu.value && headerStyle.headerActiveLink}`}
                  href="./"
                >
                  {t(menu.label)}
                </Link>
              </FbtHeaderItem>
            );
          })}
        </FbtHeaderContent>

        <div className="flex items-center justify-center gap-[48px]">
          <FbtHeaderContent>
            <FbtSelect
              defaultValue={selectedLanguage ?? 'en'}
              onValueChange={(value: LocaleType) =>
                handleSetLocalStorage({
                  tokenKey: 'selected_language',
                  tokenValue: value,
                })
              }
            >
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
                    value="no"
                  >
                    <Image
                      src={norwayFlag}
                      alt="norway flag"
                      width={38}
                      height={38}
                    />
                  </FbtSelectItem>

                  <FbtSelectItem
                    checkIconClassName={headerStyle.headerSelectTickIcon}
                    className={headerStyle.headerSelectItem}
                    value="en"
                  >
                    <Image
                      src={irelandFlag}
                      alt="norway flag"
                      width={38}
                      height={38}
                    />
                  </FbtSelectItem>

                  <FbtSelectItem
                    checkIconClassName={headerStyle.headerSelectTickIcon}
                    className={headerStyle.headerSelectItem}
                    value="da"
                  >
                    <Image
                      src={denmarkFlag}
                      alt="norway flag"
                      width={38}
                      height={38}
                    />
                  </FbtSelectItem>
                  <FbtSelectItem
                    checkIconClassName={headerStyle.headerSelectTickIcon}
                    className={headerStyle.headerSelectItem}
                    value="sv"
                  >
                    <Image
                      src={swedenFlag}
                      alt="norway flag"
                      width={38}
                      height={38}
                    />
                  </FbtSelectItem>
                </FbtSelectGroup>
              </FbtSelectContent>
            </FbtSelect>
          </FbtHeaderContent>
          {accessToken ? (
            <ProfileHeader showLogo={false} className="px-px py-0" />
          ) : (
            <FbtButton
              className={headerStyle.headerLoginBtn}
              size="lg"
              variant="outline"
              onClick={() => setIsLoginModalActive(true)}
            >
              Log in
            </FbtButton>
          )}
        </div>

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

            {menuItems.map((menu: { value: string; label: string }) => {
              return (
                <FbtHeaderMenuItem
                  className={headerStyle.liWrapper}
                  key={menu.value}
                >
                  <Link
                    onClick={() => {
                      setIsHeaderMenuOpen(false);

                      handleScrollOnClick(menu.value);
                      handleLinkClick(menu.value);
                    }}
                    className={`${headerStyle.menuItem} ${activeLink === menu.value && headerStyle.menuItemActive}`}
                    href="./"
                  >
                    {t(menu.label)}
                  </Link>
                </FbtHeaderMenuItem>
              );
            })}

            <FbtHeaderMenuItem className={headerStyle.liWrapper}>
              {accessToken ? (
                <Link className={headerStyle.menuItemBtn} href="./">
                  Log out
                </Link>
              ) : (
                <Link
                  className={headerStyle.menuItemBtn}
                  href="./"
                  onClick={() => setIsLoginModalActive(true)}
                >
                  Log in
                </Link>
              )}
            </FbtHeaderMenuItem>
          </FbtHeaderMenu>
        )}
      </FbtHeader>
      {isLoginModalActive && <CreateAccount />}
      {isOtpVerifyModalActive && <VerifyOtpSuspense />}
    </>
  );
}

export default Header;
