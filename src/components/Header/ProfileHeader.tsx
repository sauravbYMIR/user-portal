'use client';

import Image from 'next/image';
import React from 'react';

import brandTitle from '@/public/assets/icons/brandTitle.svg';

import { ArrowDownIcon, ProfileIcon } from '../Icons/Icons';
import {
  FbtButton,
  FbtDropdownMenu,
  FbtDropdownMenuContent,
  FbtDropdownMenuGroup,
  FbtDropdownMenuItem,
  FbtDropdownMenuLabel,
  FbtDropdownMenuSeparator,
  FbtDropdownMenuTrigger,
} from '../ui';

const ProfileHeader = () => {
  return (
    <nav className="flex items-center justify-between px-20 py-6">
      <Image src={brandTitle} alt="brand-title" width={120} height={48} />
      <div className="flex items-center">
        <ProfileIcon
          className="size-12 rounded-full bg-primary-2 p-3"
          stroke="#fff"
        />
        <FbtDropdownMenu>
          <FbtDropdownMenuTrigger asChild>
            <FbtButton variant="link">
              <ArrowDownIcon />
            </FbtButton>
          </FbtDropdownMenuTrigger>
          <FbtDropdownMenuContent>
            <FbtDropdownMenuGroup className="!px-6 !py-2">
              <FbtDropdownMenuItem>
                <span className="font-lexend text-xl font-light text-neutral-2">
                  Home Page
                </span>
              </FbtDropdownMenuItem>
              <FbtDropdownMenuItem>
                <span className="font-lexend text-xl font-light text-neutral-2">
                  How it works
                </span>
              </FbtDropdownMenuItem>
              <FbtDropdownMenuItem>
                <span className="font-lexend text-xl font-light text-neutral-2">
                  Our hospitals
                </span>
              </FbtDropdownMenuItem>
              <FbtDropdownMenuItem>
                <span className="font-lexend text-xl font-light text-neutral-2">
                  FAQs
                </span>
              </FbtDropdownMenuItem>
            </FbtDropdownMenuGroup>
            <FbtDropdownMenuSeparator />
            <FbtDropdownMenuLabel className="!px-6 !py-2">
              <span className="font-lexend text-xl font-light text-neutral-2">
                Book a procedure
              </span>
            </FbtDropdownMenuLabel>
            <FbtDropdownMenuSeparator />
            <FbtDropdownMenuItem className="!px-6 !py-2">
              <span className="font-lexend text-xl font-light text-neutral-2">
                Log out
              </span>
            </FbtDropdownMenuItem>
          </FbtDropdownMenuContent>
        </FbtDropdownMenu>
      </div>
    </nav>
  );
};

export { ProfileHeader };
