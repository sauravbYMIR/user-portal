'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect } from 'react';

import BankIdModal from '@/components/Auth/BankIdModal';
import { CreateAccount } from '@/components/Auth/CreateAccount';
import { VerifyOtp } from '@/components/Auth/VerifyOtp';
import { useAppStore } from '@/libs/store';
import {
  countryData,
  handleGetLocalStorage,
  handleSetLocalStorage,
} from '@/utils/global';

function LandingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');
  const accessToken = handleGetLocalStorage({
    tokenKey: 'access_token',
  });
  const {
    isLoginModalActive,
    setIsLoginModalActive,
    isOtpVerifyModalActive,
    isBankIdModalActive,
  } = useAppStore();
  useEffect(() => {
    if (lang) {
      handleSetLocalStorage({
        tokenKey: 'selected_language',
        tokenValue: lang,
      });
    }
  }, [lang]);
  useEffect(() => {
    if (accessToken) {
      router.push(`/book-procedure`);
      return;
    }
    setIsLoginModalActive(true);
  }, [accessToken, router, setIsLoginModalActive]);
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (`${event.origin}/` === process.env.NEXT_PUBLIC_WEBFLOW_URL) {
        const { data } = event;
        const r = data ? JSON.parse(data) : { lang: '', type: '' };
        const selectedLang = handleGetLocalStorage({
          tokenKey: 'selected_language',
        });
        if (r.type === 'DEFAULT' && !selectedLang) {
          handleSetLocalStorage({
            tokenKey: 'selected_language',
            tokenValue: r.lang,
          });
          return;
        }
        if (r.lang && r.type === 'SELECTOR') {
          const reqdCountry =
            countryData.find((cInfo) => cInfo.countryCode === r.lang)?.locale ??
            'en';
          handleSetLocalStorage({
            tokenKey: 'selected_language',
            tokenValue: reqdCountry,
          });
        }
      }
    };
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);
  return (
    <div>
      {isLoginModalActive && <CreateAccount type="LANDING" />}
      {isOtpVerifyModalActive && <VerifyOtp />}
      {isBankIdModalActive && <BankIdModal />}
    </div>
  );
}

function LandingPageSuspense() {
  return (
    <Suspense>
      <LandingPage />
    </Suspense>
  );
}

export default LandingPageSuspense;
