import React from 'react';

import { ProfileHeader } from '@/components/Header/ProfileHeader';

function MyProedurelayout(props: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <ProfileHeader showLogo />
      <main>{props.children}</main>
    </div>
  );
}

export default MyProedurelayout;
