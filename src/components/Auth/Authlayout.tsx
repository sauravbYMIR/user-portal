'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { handleGetLocalStorage } from '@/utils/global';

const Authlayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const accessToken = handleGetLocalStorage({ tokenKey: 'access_token' });
  React.useEffect(() => {
    if (!accessToken) {
      router.push(`/`);
    }
  }, [accessToken, router]);

  return children;
};

export default Authlayout;
