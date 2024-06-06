'use client';

import React from 'react';

import { useScreenWidth } from '@/hooks/useScreenWidth';

const ProfileWrapper = ({ children }: { children: React.ReactNode }) => {
  const { matches } = useScreenWidth(1180);
  return (
    <div
      className={`mb-8 mt-[100px] flex ${matches ? 'flex-col' : 'flex-row'} gap-16 px-5 sxl:px-20`}
    >
      {children}
    </div>
  );
};

export default ProfileWrapper;
