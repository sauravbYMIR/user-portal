'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePostHog } from 'posthog-js/react';
import React from 'react';

import useTranslation from '@/hooks/useTranslation';
import cookieImg from '@/public/assets/images/cookie.svg';

import { ModalWrapper } from '../ModalWrapper/ModalWrapper';
import { FbtButton } from '../ui';

export function cookieConsentGiven(): string {
  if (typeof window !== 'undefined') {
    if (!localStorage.getItem('cookie_consent')) {
      return 'undecided';
    }
    return localStorage.getItem('cookie_consent') ?? '';
  }
  return '';
}

const CookieModal = () => {
  const [consentGiven, setConsentGiven] = React.useState('');
  const posthog = usePostHog();

  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
    setConsentGiven(cookieConsentGiven());
  }, []);

  React.useEffect(() => {
    if (consentGiven !== '') {
      posthog.set_config({
        persistence: consentGiven === 'yes' ? 'localStorage+cookie' : 'memory',
      });
    }
  }, [consentGiven, posthog]);

  const handleAcceptCookies = () => {
    localStorage.setItem('cookie_consent', 'yes');
    setConsentGiven('yes');
  };

  const handleDeclineCookies = () => {
    localStorage.setItem('cookie_consent', 'no');
    setConsentGiven('no');
  };

  const { t } = useTranslation();
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {consentGiven === 'undecided' && (
        <ModalWrapper
          parentStyle="z-[9990] fixed top-0 left-0 after:backdrop-blur bg-zinc-900/70 flex items-center justify-center"
          childrenStyle="overflow-scroll max-w-[700px] w-full relative z-[9999] flex flex-col items-center justify-center rounded-[20px] bg-white px-12 py-[42px] shadow-colorPickerShadow"
        >
          <div className="flex flex-col">
            <Image src={cookieImg} alt="cookie" width={60} height={60} />
            <h2 className="mt-3 font-onsite text-2xl font-medium text-neutral-1">
              {t('We-use-cookies')}
            </h2>
            <p className="mb-3 mt-5 font-onsite text-sm font-normal text-neutral-3">
              {t('Cookies-enhance-your-experience')}
            </p>
            <div className="mb-9 flex items-center gap-x-1">
              <p className="font-onsite text-sm font-normal text-neutral-3">
                {t('Learn-more-from-our')}
              </p>
              <Link
                href="/"
                className="font-onsite text-sm font-normal text-primary-2"
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
                onClick={handleDeclineCookies}
              >
                <span className="font-onsite text-sm font-semibold text-neutral-2">
                  {t('Refuse-non-essential')}
                </span>
              </FbtButton>
              <FbtButton
                size="sm"
                variant="solid"
                className="!rounded-lg !px-[25px] !py-[27px]"
                onClick={handleAcceptCookies}
              >
                <span className="font-onsite text-sm font-semibold text-white">
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
