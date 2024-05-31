'use client';

import React, { Suspense } from 'react';

import { useGetUserDetails } from '@/hooks/useAuth';

import ProfileLayout from './profile-layout';

const Profile = () => {
  const getUserDetails = useGetUserDetails();

  return (
    <ProfileLayout heading="My profile">
      <main className="flex  flex-col">
        <div className="flex items-start ">
          <div className="flex flex-col items-start">
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
        </div>
      </main>
    </ProfileLayout>
  );
};

const ProfileSuspense = () => {
  return (
    <Suspense>
      <Profile />
    </Suspense>
  );
};

export default ProfileSuspense;
