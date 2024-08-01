import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

import { useScreenWidth } from '@/hooks/useScreenWidth';
import useTranslation from '@/hooks/useTranslation';

const itemsList = [
  {
    name: 'My procedures',
    route: '/my-procedures',
  },
  {
    name: 'My profile',
    route: '/profile',
  },
];

const Sidebar = (): JSX.Element => {
  const router = useRouter();
  const { t } = useTranslation();
  const pathname = usePathname();
  return (
    <div className="mt-4 flex w-1/5 flex-col gap-[20px]">
      {itemsList.map((item) => (
        <button
          type="button"
          key={item.name}
          onClick={() => router.push(item.route)}
          className={`${item.route === pathname ? 'bg-neutral-6' : ''} flex w-[262px] items-start rounded-xl px-5 py-4`}
        >
          <span className="font-onsite text-xl font-medium text-primary-2">
            {t(item.name)}
          </span>
        </button>
      ))}
    </div>
  );
};

export { Sidebar };

export const SidebarMobile = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const pathname = usePathname();
  return (
    <div className="flex w-full items-center gap-4">
      {itemsList.map((item) => (
        <button
          type="button"
          key={item.name}
          onClick={() => router.push(item.route)}
          className={`flex w-[147px] items-start rounded-xl sxl:w-[262px] ${item.route === pathname ? 'bg-neutral-6' : ''} p-3 sxl:px-5 sxl:py-4`}
        >
          <span className="font-onsite text-base font-medium text-primary-2 sxl:text-xl">
            {t(item.name)}
          </span>
        </button>
      ))}
    </div>
  );
};

export const SidebarWrapper = () => {
  const { matches } = useScreenWidth(1180);

  return <aside>{matches ? <SidebarMobile /> : <Sidebar />}</aside>;
};
