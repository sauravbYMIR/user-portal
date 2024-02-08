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
import React, { useEffect, useState } from 'react';

import { useScreenWidth } from '@/hooks/useWindowWidth';
import denmarkFlag from '@/public/assets/icons/denmarkFlag.svg';
import irelandFlag from '@/public/assets/icons/ireland.svg';
import norwayFlag from '@/public/assets/icons/norwayFlag.svg';

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
  const [activeLink, setActiveLink] = useState('');
  const { matches } = useScreenWidth(500);

  const scrollToSection = (ref: any) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  useEffect(() => {
    document.body.style.overflow = isHeaderMenuOpen ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isHeaderMenuOpen]);

  return (
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
                  <span className={headerStyle.dropdownOptionDesc}>Norway</span>
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
