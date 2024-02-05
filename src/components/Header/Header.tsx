import {
  FbtButton,
  FbtHeader,
  FbtHeaderBrand,
  FbtHeaderContent,
  FbtHeaderItem,
  FbtHeaderMenu,
  FbtHeaderMenuItem,
  FbtHeaderMenuToggle,
} from '@frontbase/components-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

import brandLogo from '../../../public/assets/images/brandLogo.svg';
import headerStyle from './header.module.scss';

const menuItems = ['How it works', 'Our Hospitals', 'FAQs'];

function Header() {
  const [isHeaderMenuOpen, setIsHeaderMenuOpen] = useState(false);

  return (
    <FbtHeader className={headerStyle.headerContainer}>
      <FbtHeaderBrand>
        <Image src={brandLogo} alt="branch icon" />
      </FbtHeaderBrand>

      <FbtHeaderContent className={headerStyle.headerLinkContainer}>
        <FbtHeaderItem>
          <Link className={headerStyle.headerLink} href="./">
            How it works
          </Link>
        </FbtHeaderItem>

        <FbtHeaderItem>
          <Link className={headerStyle.headerLink} href="./">
            Our Hospitals
          </Link>
        </FbtHeaderItem>

        <FbtHeaderItem>
          <Link className={headerStyle.headerLink} href="./">
            FAQS
          </Link>
        </FbtHeaderItem>
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
        <FbtHeaderMenu>
          {menuItems.map((menu) => {
            return (
              <FbtHeaderMenuItem className={headerStyle.liWrapper} key={menu}>
                <Link className={headerStyle.menuItem} href="./">
                  {menu}
                </Link>
              </FbtHeaderMenuItem>
            );
          })}

          <FbtHeaderMenuItem className={headerStyle.liWrapper}>
            <Link className={headerStyle.menuItem} href="./">
              Log in
            </Link>
          </FbtHeaderMenuItem>
        </FbtHeaderMenu>
      )}
    </FbtHeader>
  );
}

export default Header;
