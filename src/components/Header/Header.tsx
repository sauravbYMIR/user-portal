'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import headerStyle from '@/components/Header/header.module.scss';
import useTranslation from '@/hooks/useTranslation';
import { useScreenWidth } from '@/hooks/useWindowWidth';
import { useAppStore } from '@/libs/store';
import brandLogo from '@/public/assets/images/brandLogo.svg';
import type { LocaleType } from '@/types/component';
import {
  countryData,
  handleGetLocalStorage,
  handleSetLocalStorage,
} from '@/utils/global';

import BankIdModal from '../Auth/BankIdModal';
import { CreateAccount } from '../Auth/CreateAccount';
import { VerifyOtp } from '../Auth/VerifyOtp';
import {
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
  const { matches } = useScreenWidth(640);
  const {
    isLoginModalActive,
    setIsLoginModalActive,
    isOtpVerifyModalActive,
    isBankIdModalActive,
  } = useAppStore();

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
      <FbtHeader
        isFixed
        className="flex items-center justify-around !bg-primary-5"
      >
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
        {matches && (
          <div className="flex items-center gap-x-5">
            <FbtSelect defaultValue={selectedLanguage ?? 'en'}>
              <FbtSelectTrigger
                selectIconClassName={headerStyle.headerSelectTriggerIcon}
                // className={headerStyle.headerSelectTrigger}
                className="!h-[50px] !w-[135px] !rounded-lg !border-2 !border-neutral-4 !py-[18.5px]"
              >
                <FbtSelectValue placeholder="Select" />
              </FbtSelectTrigger>

              <FbtSelectContent className={headerStyle.headerSelectContent}>
                <FbtSelectGroup>
                  {countryData.map((countryInfo) => (
                    <FbtSelectItem
                      key={countryInfo.countryCode}
                      checkIconClassName={headerStyle.headerSelectTickIcon}
                      className={headerStyle.headerSelectItem}
                      value={countryInfo.locale}
                    >
                      <span className="font-poppins text-sm font-medium text-neutral-2">
                        {countryInfo.language}
                      </span>
                    </FbtSelectItem>
                  ))}
                </FbtSelectGroup>
              </FbtSelectContent>
            </FbtSelect>

            <FbtHeaderMenuToggle
              clickHandler={() => setIsHeaderMenuOpen(!isHeaderMenuOpen)}
              isMenuOpen={isHeaderMenuOpen}
            />
          </div>
        )}
        {!matches && (
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
                  // className={headerStyle.headerSelectTrigger}
                  className="!h-[50px] !w-[135px] !rounded-lg !border-2 !border-neutral-4 !py-[18.5px]"
                >
                  <FbtSelectValue placeholder="Select" />
                </FbtSelectTrigger>

                <FbtSelectContent className={headerStyle.headerSelectContent}>
                  <FbtSelectGroup>
                    {countryData.map((countryInfo) => (
                      <FbtSelectItem
                        key={countryInfo.countryCode}
                        checkIconClassName={headerStyle.headerSelectTickIcon}
                        className={headerStyle.headerSelectItem}
                        value={countryInfo.locale}
                      >
                        <span className="font-poppins text-sm font-medium text-neutral-2">
                          {countryInfo.language}
                        </span>
                      </FbtSelectItem>
                    ))}
                  </FbtSelectGroup>
                </FbtSelectContent>
              </FbtSelect>
            </FbtHeaderContent>
            {accessToken ? (
              <ProfileHeader showLogo={false} className="px-px py-0" />
            ) : (
              <button
                className="rounded-[6.4px] border-2 border-primary-2 bg-primary-5 px-6 py-[6px]"
                type="button"
                onClick={() => setIsLoginModalActive(true)}
              >
                <span className="font-poppins text-2xl font-medium text-primary-2">
                  Log in
                </span>
              </button>
            )}
          </div>
        )}
        {isHeaderMenuOpen && (
          <FbtHeaderMenu className={headerStyle.headerMobileMenuContainer}>
            <FbtHeaderMenuItem className="flex w-full items-center justify-between px-1 py-3">
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
      {isOtpVerifyModalActive && <VerifyOtp />}
      {isBankIdModalActive && <BankIdModal />}
    </>
  );
}

export default Header;
