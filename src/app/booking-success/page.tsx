'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

import { useScreenWidth } from '@/hooks/useScreenWidth';
import brandLogo from '@/public/assets/images/brandLogo.svg';

const BookingSuccess = ({ hospitalName }: { hospitalName: string | null }) => {
  const { matches } = useScreenWidth(500);
  const router = useRouter();
  return (
    <div className="flex h-screen w-screen flex-col items-start bg-primary-5">
      <nav className="w-full items-start px-20 py-6">
        <Image
          src={brandLogo}
          alt="branch icon"
          width={!matches ? 160 : 80}
          height={!matches ? 64 : 32}
        />
      </nav>
      <div className="flex w-full items-center justify-center">
        <div className="mt-40 flex w-2/3 flex-col items-center text-center">
          <h1 className="font-poppins text-6xl font-medium text-primary-1">
            We are fast-tracking your process!
          </h1>
          <p className="mb-[60px] mt-8 font-lexend text-2xl font-normal">
            You will hear from us within 48 hours to let you know if your
            application to
            {hospitalName && (
              <span className="font-lexend text-2xl font-bold">
                {' '}
                {hospitalName}{' '}
              </span>
            )}
            has been approved after which you can fill in your patient forms
          </p>
          <button
            type="button"
            className="flex cursor-pointer items-center justify-between rounded-[6.4px] bg-primary-2 px-[88px] py-[14px] text-white"
            onClick={() => router.push(`/profile?view=${'procedures'}`)}
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

const BookingSuccessSuspense = () => {
  const searchParams = useSearchParams();
  const hospitalName = searchParams.get('name');
  return <BookingSuccess hospitalName={hospitalName} />;
};

export default BookingSuccessSuspense;
