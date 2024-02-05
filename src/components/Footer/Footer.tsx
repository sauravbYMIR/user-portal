import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import facebookLogo from '../../../public/assets/icons/facebook.svg';
import instagramLogo from '../../../public/assets/icons/instagram.svg';
import twitterLogo from '../../../public/assets/icons/twitter.svg';
import brandLogoWhite from '../../../public/assets/images/brandLogoWhite.svg';
import footerStyle from './footer.module.scss';

function Footer() {
  return (
    <div className={footerStyle.footerContainer}>
      <div>
        <Image src={brandLogoWhite} alt="brand logo" />
        <p className={footerStyle.footerRightsText}>
          © 2024 Dr Fasttrack. All rights reserved
        </p>
      </div>

      <div className={footerStyle.footerLinkContainer}>
        <Link className={footerStyle.footerLink} href="./">
          Terms and conditions
        </Link>
        <Link className={footerStyle.footerLink} href="./">
          Privacy policy
        </Link>
      </div>

      <div className={footerStyle.footerSocialContainer}>
        <p className={footerStyle.footerSocialText}>Social</p>
        <div className={footerStyle.socialIcon}>
          <Image src={facebookLogo} alt="facebook logo" />
          <Image src={twitterLogo} alt="twitter logo" />
          <Image src={instagramLogo} alt="instagram logo" />
        </div>
      </div>

      <p className={footerStyle.footerSupportText}>
        For any queries contact us on
        <br />
        <a
          className={footerStyle.footerSupportMail}
          href="mailto:support@fasttrack.com"
        >
          support@fasttrack.com
        </a>
      </p>
    </div>
  );
}

export default Footer;
