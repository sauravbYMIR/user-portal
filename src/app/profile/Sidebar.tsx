import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

import useTranslation from '@/hooks/useTranslation';

const Sidebar = (): JSX.Element => {
  const router = useRouter();
  const { t } = useTranslation();
  const pathname = usePathname();
  const itemsList = [
    {
      name: 'My profile',
      route: '/profile',
    },
    {
      name: 'My procedures',
      route: '/my-procedures',
    },
  ];
  return (
    <div className="flex w-1/5 flex-col gap-[20px]">
      {itemsList.map((item) => (
        <button
          type="button"
          key={item.name}
          onClick={() => router.push(item.route)}
        >
          <span
            className={`flex w-[262px] items-start rounded-xl ${item.route === pathname ? 'bg-neutral-6' : ''} px-5 py-4 font-poppins text-xl font-medium text-primary-2`}
          >
            {t(item.name)}
          </span>
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
