'use client';

import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import posthog from 'posthog-js';
import React from 'react';

import useTranslation from '@/hooks/useTranslation';
import cookieImg from '@/public/assets/images/cookie.svg';

import { ModalWrapper } from '../ModalWrapper/ModalWrapper';
import { FbtButton } from '../ui';

const CookieModal = () => {
  const cookieConsent = Cookies.get('CookieConsent');
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [delayed, setDelayed] = React.useState(true);

  React.useEffect(() => {
    if (typeof cookieConsent === 'undefined') {
      window.scrollTo(0, 0);
      document.body.style.overflow = 'hidden';
      setIsOpenModal(true);
    } else {
      setIsOpenModal(false);
    }
  }, [cookieConsent]);

  React.useEffect(() => {
    const timeout = setTimeout(() => setDelayed(false), 1000);
    return () => clearTimeout(timeout);
  }, []);
  const expiryDate24hr = new Date();
  expiryDate24hr.setTime(expiryDate24hr.getTime() + 24 * 60 * 60 * 1000);

  const expiryDate1y = new Date();
  expiryDate1y.setFullYear(expiryDate1y.getFullYear() + 1);
  const { t } = useTranslation();
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isOpenModal && !delayed && (
        <ModalWrapper
          parentStyle="z-[9990] fixed top-0 left-0 after:backdrop-blur bg-zinc-900/70 flex items-center justify-center"
          childrenStyle="overflow-scroll max-w-[700px] w-full relative z-[9999] flex flex-col items-center justify-center rounded-[20px] bg-white px-12 py-[42px] shadow-colorPickerShadow"
        >
          <div className="flex flex-col">
            <Image src={cookieImg} alt="cookie" width={60} height={60} />
            <h2 className="mt-3 font-poppins text-2xl font-medium text-neutral-1">
              {t('We-use-cookies')}
            </h2>
            <p className="mb-3 mt-5 font-lexend text-sm font-normal text-neutral-3">
              {t('Cookies-enhance-your-experience')}
            </p>
            <div className="mb-9 flex items-center gap-x-1">
              <p className="font-lexend text-sm font-normal text-neutral-3">
                {t('Learn-more-from-our')}
              </p>
              <Link
                href="/"
                className="font-lexend text-sm font-normal text-primary-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('cookie-policy')}
              </Link>
            </div>
            <div className="flex flex-col gap-y-5 sm:flex-row sm:gap-x-9">
              <FbtButton
                size="sm"
                variant="outline"
                className="!rounded-lg !px-[23px] !py-[25px]"
                onClick={() => {
                  Cookies.set('CookieConsent', 'true', {
                    path: '/',
                    expires: expiryDate1y,
                  });
                  Cookies.set('CookieConsentNonEssential', 'false', {
                    path: '/',
                    expires: expiryDate1y,
                  });
                  posthog.opt_out_capturing();
                  setIsOpenModal(false);
                }}
              >
                <span className="font-poppins text-sm font-semibold text-neutral-2">
                  {t('Refuse-non-essential')}
                </span>
              </FbtButton>
              <FbtButton
                size="sm"
                variant="solid"
                className="!rounded-lg !px-[25px] !py-[27px]"
                onClick={() => {
                  Cookies.set('CookieConsent', 'true', {
                    path: '/',
                    expires: expiryDate1y,
                  });
                  Cookies.set('CookieConsentNonEssential', 'true', {
                    path: '/',
                    expires: expiryDate1y,
                  });
                  setIsOpenModal(false);
                }}
              >
                <span className="font-poppins text-sm font-semibold text-white">
                  {t('Accept-cookies')}
                </span>
              </FbtButton>
            </div>
          </div>
        </ModalWrapper>
      )}
    </>
  );
};

export default CookieModal;
