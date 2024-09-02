'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect } from 'react';

import BankIdModal from '@/components/Auth/BankIdModal';
import { CreateAccount } from '@/components/Auth/CreateAccount';
import { VerifyOtp } from '@/components/Auth/VerifyOtp';
import { useAppStore } from '@/libs/store';
import { handleGetLocalStorage, handleSetLocalStorage } from '@/utils/global';

function LandingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');
  const selectedLanguage = handleGetLocalStorage({
    tokenKey: 'selected_language',
  });
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
      return;
    }
    handleSetLocalStorage({
      tokenKey: 'selected_language',
      tokenValue: 'en',
    });
  }, [lang]);
  useEffect(() => {
    if (accessToken) {
      router.push(`/book-procedure`);
      return;
    }
    setIsLoginModalActive(true);
  }, [accessToken, router, selectedLanguage, setIsLoginModalActive]);
  // useEffect(() => {
  //   if (accessToken) {
  //     router.push(`/profile`);
  //   }
  // }, [accessToken, router]);
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      console.log(event.origin, event.data);
      if (event.origin === process.env.NEXT_PUBLIC_WEBFLOW_URL) {
        const { data } = event;
        localStorage.setItem('sharedDataFromWebflow', data);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);
  return (
    <div>
      {isLoginModalActive && <CreateAccount />}
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
