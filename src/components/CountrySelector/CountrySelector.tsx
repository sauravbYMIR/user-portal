import Image from 'next/image';
import React from 'react';

import { countryData } from '@/utils/global';

import { FbtButton } from '../ui';

const CountrySelector = () => {
  return (
    <div className="flex flex-col items-start justify-center gap-2 sm:items-center">
      <h3 className="font-poppins text-5xl font-medium text-primary-1">
        Tell us which country you will be claiming this policy from
      </h3>
      <p className="mt-2 font-lexend text-2xl font-light text-gray77">
        To begin we are piloting with a limited number of countries, more
        countries will be added in the near future.
      </p>
      <div className="mb-44 mt-20 flex flex-col items-start sm:grid sm:grid-cols-2 sm:gap-4">
        {countryData.map((country) => {
          return (
            <FbtButton
              key={country.name}
              variant="outline"
              className="my-4 flex !h-16 w-[320px] cursor-pointer items-start !justify-start !rounded-lg !border-2 !border-neutral-5 !px-5 !py-6 hover:!border-primary-2 hover:!bg-primary-2 hover:!text-white active:!border-2 active:!border-primary-2 sm:my-0 sm:w-[262px]"
            >
              <Image
                alt="flag"
                src={country.flagIcon}
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="ml-4 font-poppins text-2xl font-normal">
                {country.name}
              </span>
            </FbtButton>
          );
        })}
      </div>
    </div>
  );
};

export { CountrySelector };
