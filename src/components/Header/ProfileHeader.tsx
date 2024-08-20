'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import headerStyles from '@/components/Header/header.module.scss';
import brandTitle from '@/public/assets/icons/brandTitle.svg';
import { handleGetLocalStorage, handleLogOut } from '@/utils/global';

import { ArrowDownIcon, ProfileIcon } from '../Icons/Icons';

const ProfileHeader = ({
  showLogo,
  className,
}: {
  showLogo?: boolean;
  className?: string;
}) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const router = useRouter();
  const selectedLanguage = handleGetLocalStorage({
    tokenKey: 'selected_language',
  });
  return (
    <nav
      className={`${className} flex items-center justify-between px-5 py-6 sxl:px-20`}
    >
      {showLogo && (
        <button
          type="button"
          onClick={() =>
            router.push(
              process.env.NEXT_PUBLIC_WEBFLOW_URL ??
                `/book-procedure/?lang=${selectedLanguage ?? 'en'}`,
            )
          }
        >
          <Image src={brandTitle} alt="brand-title" width={120} height={48} />
        </button>
      )}
      <div className="flex items-center">
        <div className="relative inline-block pl-[16px]">
          <button type="button" onClick={() => setDropdownOpen(!dropdownOpen)}>
            <div className="flex items-center gap-[10px]">
              <ProfileIcon
                className="size-12 rounded-full bg-primary-2 p-3"
                stroke="#fff"
              />
              <ArrowDownIcon
                className={`${dropdownOpen ? 'rotate-180' : 'rotate-0'} h-[20px]`}
                stroke="rgba(9, 111, 144, 1)"
                width="2"
              />
            </div>
            <p className="hidden">d</p>
          </button>
          <div
            style={{
              display: dropdownOpen === true ? 'block' : 'none',
            }}
            className={`absolute right-[-30px] z-[2px] mt-[10px] w-[220px] rounded-[8px] bg-white ${headerStyles.boxShadow} `}
          >
            <div className="px-[20px]">
              <div className="my-[20px] flex items-center justify-start gap-[20px]">
                <span className="font-onsite text-[20px] text-neutral-2">
                  <Link
                    href="/book-procedure"
                    className="font-[16px] leading-6"
                  >
                    Book procedure
                  </Link>
                </span>
              </div>
            </div>
            <div className="px-[20px]">
              <button
                type="button"
                className="my-[20px] flex items-center justify-start gap-[20px]"
                onClick={() => {
                  const iframeEl = document.getElementById(
                    'myIframe',
                  ) as HTMLIFrameElement;
                  if (iframeEl && iframeEl.contentWindow) {
                    const message = { action: 'clearData' };
                    iframeEl.contentWindow.postMessage(
                      JSON.stringify(message),
                      `${process.env.NEXT_PUBLIC_WEBFLOW_URL}`,
                    );
                  }
                  handleLogOut();
                  router.push(
                    process.env.NEXT_PUBLIC_WEBFLOW_URL ??
                      `/book-procedure/?lang=${selectedLanguage}`,
                  );
                }}
              >
                <span className="font-onsite text-[20px] text-neutral-2">
                  <span className="font-[16px] leading-6">Logout</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export { ProfileHeader };
