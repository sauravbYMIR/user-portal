import Image from 'next/image';
import React from 'react';

import useTranslation from '@/hooks/useTranslation';
import { useAppStore } from '@/libs/store';
import { countryData, handleSetLocalStorage } from '@/utils/global';

import { FbtButton } from '../ui';

const CountrySelector = () => {
  const { selectedCountry, setSelectedCountry } = useAppStore();
  const { t } = useTranslation();
  return (
    <div className="flex  w-full flex-col items-center justify-center gap-2  ">
      <div className="w-11/12 lg:w-9/12">
        <h3 className="text-center font-poppins text-[24px] font-medium text-primary-1 sm:text-[32px] sm:leading-12 md:text-5xl md:leading-15">
          {t('Tell-us-which-country-you-will-be-claiming-this-policy-from')}
        </h3>
        <p className="mt-2 text-center font-lexend text-base font-light leading-7 text-gray77 sm:text-2xl">
          {t('To-begin-we-are-piloting-with-a')}
        </p>
      </div>
      <div className="mb-44 mt-[40px] flex flex-col items-start gap-[20px] sm:mt-[60px] sm:grid sm:grid-cols-2 sm:gap-4">
        {countryData.map((country) => {
          return (
            <FbtButton
              key={country.name}
              variant="outline"
              className={`${selectedCountry === country.locale ? '!border-2 !border-primary-2 !bg-primary-6' : ''} flex !h-16 w-[320px] cursor-pointer items-start !justify-start !rounded-lg !border-2 !border-neutral-5 hover:!border-primary-2  hover:!bg-primary-2 hover:!text-white active:!border-2 active:!border-primary-2 sm:my-0 sm:w-[262px] md:my-4`}
              onClick={() => {
                setSelectedCountry(country.locale);
                handleSetLocalStorage({
                  tokenKey: 'selected_country',
                  tokenValue: country.locale,
                });
              }}
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
