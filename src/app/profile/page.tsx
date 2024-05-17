'use client';

import React from 'react';

import { ProfileHeader } from '@/components/Header/ProfileHeader';
import { ProcedureCard } from '@/components/ProcedureCard/ProcedureCard';
import { useGetBookingByUserId } from '@/hooks/useBooking';
import { handleGetLocalStorage } from '@/utils/global';

// const proceduresDummyArr = [
//   {
//     procedureName: 'Breast removal and reconstruction',
//     hospitalName: 'PSH Hospital',
//     city: 'Oslo',
//     country: 'Norway',
//     hospitalStay: '12',
//     applicationStatus: 'Application sent',
//     waitTime: '3-4 weeks',
//   },
//   {
//     procedureName: 'Breast removal and reconstruction',
//     hospitalName: 'PSH Hospital',
//     city: 'Oslo',
//     country: 'Norway',
//     hospitalStay: '12',
//     applicationStatus: 'Request accepted',
//     waitTime: '3-4 weeks',
//   },
//   {
//     procedureName: 'Breast removal and reconstruction',
//     hospitalName: 'PSH Hospital',
//     city: 'Oslo',
//     country: 'Norway',
//     hospitalStay: '12',
//     applicationStatus: 'Request rejected',
//     waitTime: '3-4 weeks',
//   },
//   {
//     procedureName: 'Breast removal and reconstruction',
//     hospitalName: 'PSH Hospital',
//     city: 'Oslo',
//     country: 'Norway',
//     hospitalStay: '12',
//     applicationStatus: 'Request accepted',
//     waitTime: '3-4 weeks',
//   },
// ];

const Profile = () => {
  const userId = handleGetLocalStorage({ tokenKey: 'user_id' });
  const bookingsByUserId = useGetBookingByUserId(userId ?? '');
  return (
    <main className="flex w-screen flex-col">
      <ProfileHeader />
      {/* <aside className="flex flex-col items-start">
        <button
          className="rounded-xl font-poppins text-xl font-medium text-primary-2"
          type="button"
        >
          My procedures
        </button>
        <button
          className="rounded-xl font-poppins text-xl font-medium text-primary-2"
          type="button"
        >
          My profile
        </button>
      </aside> */}
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
                  procedureName={booking.procedureName.en}
                  hospitalName={booking.hospitalName}
                  city={booking.city}
                  country={booking.country}
                  hospitalStay={booking.hospitalStay}
                  applicationStatus={booking.applicationStatus}
                  waitTime={booking.waitTime}
                />
              );
            })}
        </div>
      </div>
    </main>
  );
};

export default Profile;
