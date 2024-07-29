import Image from 'next/image';
import React from 'react';

import useTranslation from '@/hooks/useTranslation';
import { useAppStore } from '@/libs/store';
import { countryData, handleSetLocalStorage } from '@/utils/global';

import { FbtButton } from '../ui';

const CountrySelector = () => {
  const { setSelectedCountry, selectedCountry } = useAppStore();
  const { t } = useTranslation();
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 overflow-scroll pb-10">
      <div className="w-11/12 lg:w-7/12">
        <h3 className="text-center font-poppins text-[24px] font-medium text-dark-green sm:text-[32px] sm:leading-12 md:text-5xl md:leading-15">
          {t('Tell-us-which-country-you-will-be-claiming-this-policy-from')}
        </h3>
        <p className="mt-6 text-center font-lexend text-base font-normal leading-7 text-dark-green sm:text-xl">
          {t('To-begin-we-are-piloting-with-a')}
        </p>
      </div>
      <div className="mb-44 mt-[40px] flex flex-col items-start gap-x-6 sm:mt-[60px] sm:grid sm:grid-cols-2 sm:gap-4">
        {countryData.map((country) => {
          return (
            <FbtButton
              key={country.name}
              variant="outline"
              className={`${country.countryCode === selectedCountry ? 'bg-dark-green !text-white hover:!bg-white hover:!text-dark-green' : 'bg-base-light text-dark-green hover:!bg-white hover:!text-dark-green'} flex !h-[139.51px] !w-[136px] cursor-pointer flex-col !items-center !justify-center gap-y-4 !rounded-2xl !border-none sm:my-0 sm:!h-[179.5px] sm:!w-[294px] md:my-4`}
              onClick={() => {
                setSelectedCountry(country.countryCode);
                handleSetLocalStorage({
                  tokenKey: 'selected_country',
                  tokenValue: country.countryCode,
                });
              }}
            >
              <Image
                alt="flag"
                src={country.flagIcon}
                width={58.5}
                height={58.5}
                className="rounded-full"
              />
              <span className="font-poppins text-2xl font-medium">
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
