'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react';

import { ProfileHeader } from '@/components/Header/ProfileHeader';
import { ProcedureCard } from '@/components/ProcedureCard/ProcedureCard';
import { useGetUserDetails } from '@/hooks/useAuth';
import { useGetBookingByUserId } from '@/hooks/useBooking';

const Profile = ({ view }: { view: string | null }) => {
  const router = useRouter();
  const bookingsByUserId = useGetBookingByUserId();
  const getUserDetails = useGetUserDetails();
  return (
    <main className="flex w-screen flex-col">
      <ProfileHeader />
      <div className="flex items-start px-20 py-28">
        <aside className="mt-[148px] flex flex-col items-start gap-4">
          <button
            className={`flex w-[262px] items-start rounded-xl ${view === 'procedures' ? 'bg-neutral-6' : ''} px-5 py-4 font-poppins text-xl font-medium text-primary-2`}
            type="button"
            onClick={() => router.push(`/profile/?view=${'procedures'}`)}
          >
            My procedures
          </button>
          <button
            className={`flex w-[262px] items-start rounded-xl ${view === 'profile' ? 'bg-neutral-6' : ''} px-5 py-4 font-poppins text-xl font-medium text-primary-2`}
            type="button"
            onClick={() => router.push(`/profile/?view=${'profile'}`)}
          >
            My profile
          </button>
        </aside>

        {view === 'procedures' ? (
          <div className="flex flex-col items-start px-20">
            <h2 className="mb-[73px] text-start font-poppins text-5xl font-normal text-neutral-1">
              My procedures
            </h2>
            <div className="flex flex-col gap-4">
              {bookingsByUserId.data &&
                Array.isArray(bookingsByUserId.data.data) &&
                bookingsByUserId.data.data.length > 0 &&
                bookingsByUserId.data.data.map((booking) => {
                  return (
                    <ProcedureCard
                      key={booking.id}
                      bookingId={booking.id}
                      procedureName={booking.procedureName.en}
                      hospitalName={booking.hospitalName}
                      city={booking.city}
                      country={booking.country}
                      hospitalStay={booking.hospitalStay}
                      applicationStatus={booking.applicationStatus}
                      waitTime={booking.waitTime}
                      elfSightStatus={booking.elfsightStatus}
                    />
                  );
                })}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-start px-20">
            <h2 className="mb-[73px] text-start font-poppins text-5xl font-normal text-neutral-1">
              My profile
            </h2>
            <div className="flex flex-col gap-4">
              <h3 className="font-poppins text-2xl font-medium text-gray77">
                Personal
              </h3>
              {getUserDetails.isSuccess && getUserDetails.data.data && (
                <div className="mt-[70px] grid grid-cols-2 gap-x-60 gap-y-16">
                  <div className="flex flex-col items-start">
                    <p className="font-lexend text-xl font-normal text-neutral-2">
                      Email
                    </p>
                    <p className="font-lexend text-4xl font-normal text-neutral-2">
                      {getUserDetails.data.data.email}
                    </p>
                  </div>
                  <div className="flex flex-col items-start">
                    <p className="font-lexend text-xl font-normal text-neutral-2">
                      Mobile number
                    </p>
                    <p className="font-lexend text-4xl font-normal text-neutral-2">
                      {getUserDetails.data.data.phoneNumber}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

const ProfileSuspense = () => {
  const searchParams = useSearchParams();
  const view = searchParams.get('view');
  return (
    <Suspense>
      <Profile view={view} />
    </Suspense>
  );
};

export default ProfileSuspense;
