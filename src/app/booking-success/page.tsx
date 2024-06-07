'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react';

import { useScreenWidth } from '@/hooks/useScreenWidth';
import useTranslation from '@/hooks/useTranslation';
import brandLogo from '@/public/assets/images/brandLogo.svg';

const BookingSuccess = () => {
  const searchParams = useSearchParams();
  const hospitalName = searchParams.get('name');
  const { matches } = useScreenWidth(500);
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <div className="flex w-screen flex-col items-start bg-primary-5">
      <nav className="w-full items-start px-10 py-6 slg:px-20">
        <Image
          src={brandLogo}
          alt="branch icon"
          width={!matches ? 160 : 80}
          height={!matches ? 64 : 32}
        />
      </nav>
      <div className="flex h-screen w-full items-start justify-center">
        <div className="mt-10 flex w-2/3 flex-col items-center text-center slg:mt-40">
          <h1 className="font-poppins text-3xl font-medium text-primary-1 slg:text-6xl">
            {t('We-are-fast-tracking-your-process')}
          </h1>
          <p className="mb-5 mt-8 font-lexend text-xl font-normal slg:mb-[60px] slg:text-2xl">
            {t('You-will-hear')}
            {hospitalName && (
              <span className="font-lexend text-xl font-bold slg:text-2xl">
                {' '}
                {hospitalName}{' '}
              </span>
            )}
            {t('has-been-approved')}
          </p>
          <button
            type="button"
            className="flex cursor-pointer items-center justify-between rounded-[6.4px] bg-primary-2 px-[88px] py-[14px] text-white"
            onClick={() => router.push(`/my-procedures`)}
          >
            {t('Home')}
          </button>
        </div>
      </div>
    </div>
  );
};

const BookingSuccessSuspense = () => {
  return (
    <Suspense>
      <BookingSuccess />
    </Suspense>
  );
};

export default BookingSuccessSuspense;
