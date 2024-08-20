'use client';

import Image from 'next/image';
import React from 'react';

import Authlayout from '@/components/Auth/Authlayout';
import { ProcedureCard } from '@/components/ProcedureCard/ProcedureCard';
import { TaskListSkeleton } from '@/components/Skeleton';
import { useGetBookingByUserId } from '@/hooks/useBooking';
import useTranslation from '@/hooks/useTranslation';
import noHospital from '@/public/assets/images/noHospital.png';
import type { LocaleType } from '@/types/component';
import { handleGetLocalStorage } from '@/utils/global';

import ProfileLayout from '../profile/profile-layout';

const Procedure = () => {
  const bookingsByUserId = useGetBookingByUserId();

  const selectedLanguage = (handleGetLocalStorage({
    tokenKey: 'selected_language',
  }) ?? 'en') as LocaleType;
  const { t } = useTranslation();
  return (
    <ProfileLayout heading="My-procedures">
      <Authlayout>
        <main className="flex w-full flex-col gap-4">
          {bookingsByUserId.isLoading ? (
            <TaskListSkeleton />
          ) : (
            <div className="flex w-full flex-col items-start gap-y-5">
              {bookingsByUserId.data &&
              Array.isArray(bookingsByUserId.data.data) &&
              bookingsByUserId.data.data.length > 0 ? (
                bookingsByUserId.data.data.map((booking) => {
                  return (
                    <ProcedureCard
                      key={booking.id}
                      bookingId={booking.id}
                      procedureName={booking.procedureName[selectedLanguage]}
                      hospitalName={booking.hospitalName}
                      city={booking.city}
                      country={booking.country}
                      hospitalStay={booking.hospitalStay}
                      applicationStatus={booking.applicationStatus}
                      waitTime={booking.waitTime}
                      elfSightStatus={booking.elfsightStatus}
                    />
                  );
                })
              ) : (
                <div className="flex w-full flex-col items-center justify-center">
                  <div className="flex w-8/12 flex-col items-center">
                    <Image
                      src={noHospital}
                      className="mb-[8px] size-64"
                      alt="hospital-logo"
                    />
                    <p className="text-center font-onsite text-2xl font-normal text-neutral-2">
                      {t('The-selected-procedure-is-not-associated-with-any')}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </Authlayout>
    </ProfileLayout>
  );
};

export default Procedure;
