'use client';

import React, { Suspense } from 'react';

import { useGetUserDetails } from '@/hooks/useAuth';

import ProfileLayout from './profile-layout';

const Profile = () => {
  const getUserDetails = useGetUserDetails();

  return (
    <ProfileLayout heading="My profile">
      <main className="flex flex-col">
        <div className="flex items-start">
          <div className="flex flex-col items-start">
            <div className="flex flex-col gap-4">
              <h3 className="font-onsite text-2xl font-medium text-gray77">
                Personal
              </h3>
              {getUserDetails.isSuccess && getUserDetails.data.data && (
                <div className="mt-10 flex flex-col gap-y-6 pb-10 md:grid md:grid-cols-2 md:gap-x-60">
                  <div className="flex flex-col items-start">
                    <p className="font-onsite text-sm font-normal text-neutral-2 lg:text-xl">
                      Email
                    </p>
                    <p className="font-onsite text-lg font-normal text-neutral-2 lg:text-3xl">
                      {getUserDetails.data.data.email}
                    </p>
                  </div>
                  <div className="flex flex-col items-start">
                    <p className="font-onsite text-sm font-normal text-neutral-2 lg:text-xl">
                      Mobile number
                    </p>
                    <p className="font-onsite text-lg font-normal text-neutral-2 lg:text-3xl">
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
