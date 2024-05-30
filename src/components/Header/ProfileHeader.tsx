'use client';

import Image from 'next/image';
import React, { useState } from 'react';

import headerStyles from '@/components/Header/header.module.scss';
import brandTitle from '@/public/assets/icons/brandTitle.svg';

import { ArrowDownIcon, ProfileIcon } from '../Icons/Icons';

const ProfileHeader = ({
  showLogo,
  className,
}: {
  showLogo?: boolean;
  className?: string;
}) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  return (
    <nav
      className={`${className}  flex items-center justify-between px-20 py-6`}
    >
      {showLogo && (
        <Image src={brandTitle} alt="brand-title" width={120} height={48} />
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
                <span className="font-poppins text-[20px] text-neutral-2">
                  <a href="/book-procedure" className="font-[16px] leading-6">
                    Book procedure
                  </a>
                </span>
              </div>
            </div>
            <div className="px-[20px]">
              <div className="my-[20px] flex items-center justify-start gap-[20px]">
                <span className="font-poppins text-[20px] text-neutral-2">
                  <a href="/" className="font-[16px] leading-6">
                    Logout
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export { ProfileHeader };
