'use client';

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
} from '@frontbase/components-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

import { useScreenWidth } from '@/hooks/useWindowWidth';

import brandLogo from '../../../public/assets/images/brandLogo.svg';
import headerStyle from './header.module.scss';

const menuItems = ['How it works', 'Our Hospitals', 'FAQs'];

interface HeaderPropType {
  howItWorksRef: any;
  ourHospitalRef: any;
  faqsRef: any;
}

function Header({ howItWorksRef, ourHospitalRef, faqsRef }: HeaderPropType) {
  const [isHeaderMenuOpen, setIsHeaderMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const { matches } = useScreenWidth(500);

  const scrollToSection = (ref: any) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  return (
    <FbtHeader className={headerStyle.headerContainer}>
      <FbtHeaderBrand>
        <Image
          src={brandLogo}
          alt="branch icon"
          width={!matches ? 160 : 80}
          height={!matches ? 64 : 32}
        />
      </FbtHeaderBrand>

      <FbtHeaderContent className={headerStyle.headerLinkContainer}>
        <FbtHeaderItem>
          <Link
            onClick={() => {
              handleLinkClick('How it works');
              scrollToSection(howItWorksRef);
            }}
            className={`${headerStyle.headerLink} ${activeLink === 'How it works' && headerStyle.headerActiveLink}`}
            href="./"
          >
            How it works
          </Link>
        </FbtHeaderItem>

        <FbtHeaderItem>
          <Link
            onClick={() => {
              handleLinkClick('Our Hospitals');
              scrollToSection(ourHospitalRef);
            }}
            className={`${headerStyle.headerLink} ${activeLink === 'Our Hospitals' && headerStyle.headerActiveLink}`}
            href="./"
          >
            Our Hospitals
          </Link>
        </FbtHeaderItem>

        <FbtHeaderItem>
          <Link
            onClick={() => {
              handleLinkClick('FAQS');
              scrollToSection(faqsRef);
            }}
            className={`${headerStyle.headerLink} ${activeLink === 'FAQS' && headerStyle.headerActiveLink}`}
            href="./"
          >
            FAQS
          </Link>
        </FbtHeaderItem>
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
          >
            Log in
          </FbtButton>
        </FbtHeaderItem>
      </FbtHeaderContent>

      <FbtHeaderMenuToggle
        clickHandler={() => setIsHeaderMenuOpen(!isHeaderMenuOpen)}
        isMenuOpen={isHeaderMenuOpen}
      />

      {isHeaderMenuOpen && (
        <FbtHeaderMenu className={headerStyle.headerMobileMenuContainer}>
          <FbtHeaderMenuItem className={headerStyle.headerMobile}>
            <FbtHeaderBrand>
              <Image src={brandLogo} alt="branch icon" width={80} height={32} />
            </FbtHeaderBrand>

            <FbtHeaderMenuToggle
              clickHandler={() => setIsHeaderMenuOpen(!isHeaderMenuOpen)}
              isMenuOpen={isHeaderMenuOpen}
            />
          </FbtHeaderMenuItem>

          {menuItems.map((menu) => {
            return (
              <FbtHeaderMenuItem className={headerStyle.liWrapper} key={menu}>
                <Link
                  onClick={() => {
                    setIsHeaderMenuOpen(false);
                    if (menu === 'How it works') {
                      scrollToSection(howItWorksRef);
                    } else if (menu === 'Our Hospitals') {
                      scrollToSection(ourHospitalRef);
                    } else if (menu === 'FAQs') {
                      scrollToSection(faqsRef);
                    }
                  }}
                  className={headerStyle.menuItem}
                  href="./"
                >
                  {menu}
                </Link>
              </FbtHeaderMenuItem>
            );
          })}

          <FbtHeaderMenuItem className={headerStyle.liWrapper}>
            <Link className={headerStyle.menuItemBtn} href="./">
              Log in
            </Link>
          </FbtHeaderMenuItem>
        </FbtHeaderMenu>
      )}
    </FbtHeader>
  );
}

export default Header;
