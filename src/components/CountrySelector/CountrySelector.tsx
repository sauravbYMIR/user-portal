import Image from 'next/image';
import React from 'react';

import { useScreenWidth } from '@/hooks/useScreenWidth';
import useTranslation from '@/hooks/useTranslation';
import { useAppStore } from '@/libs/store';
import {
  countryData,
  handleGetLocalStorage,
  handleSetLocalStorage,
} from '@/utils/global';

import { FbtButton } from '../ui';

const CountrySelector = () => {
  const selectedLangFromLocalStorage = handleGetLocalStorage({
    tokenKey: 'selected_language',
  });
  const { setSelectedCountry, selectedCountry } = useAppStore();
  const { t } = useTranslation();
  React.useEffect(() => {
    if (selectedLangFromLocalStorage) {
      const selectedCountryFound = countryData.find(
        (d) => d.locale === selectedLangFromLocalStorage,
      );
      if (selectedCountryFound) {
        setSelectedCountry(selectedCountryFound.countryCode);
        handleSetLocalStorage({
          tokenKey: 'selected_country',
          tokenValue: selectedCountryFound.countryCode,
        });
      }
    }
    return () => {};
  }, [selectedLangFromLocalStorage, setSelectedCountry]);

  const { matches } = useScreenWidth(640);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 overflow-scroll pb-10">
      <div className="w-11/12 lg:w-7/12">
        <h3 className="mt-32 text-center font-onsite text-[24px] font-medium text-dark-green sm:mt-0 sm:text-[32px] sm:leading-12 md:text-5xl md:leading-15">
          {t('Tell-us-which-country-you-will-be-claiming-this-policy-from')}
        </h3>
        <p className="mt-6 hidden text-center font-onsite text-base font-normal leading-7 text-dark-green sm:block sm:text-xl">
          {t('To-begin-we-are-piloting-with-a')}
        </p>
      </div>
      <div className="mb-11 mt-[40px] grid grid-cols-1 items-start gap-6 sm:mb-44 sm:mt-[60px] sm:grid-cols-2 sm:gap-4">
        {countryData
          .sort((a, b) => {
            if (a.locale === selectedLangFromLocalStorage) return -1;
            if (b.locale === selectedLangFromLocalStorage) return 1;
            return 0;
          })
          .map((country) => {
            return (
              <FbtButton
                key={country.name}
                variant="outline"
                className={`${country.countryCode === selectedCountry ? 'bg-dark-green !text-white hover:!bg-dark-green hover:!text-white' : 'bg-base-light text-dark-green hover:!bg-dark-green hover:!text-white'} flex !h-[139.51px] !w-[136px] cursor-pointer flex-col !items-center !justify-center gap-y-4 !rounded-2xl !border-none sm:my-0 sm:!h-[179.5px] sm:!w-[294px] md:my-4`}
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
                  width={!matches ? 58.5 : 40.59}
                  height={!matches ? 58.5 : 40.59}
                  className="rounded-full"
                />
                <span className="font-onsite text-base font-medium sm:text-2xl">
                  {country.name}
                </span>
              </FbtButton>
            );
          })}
      </div>
      <p className="mt-6 block text-center font-onsite text-base font-normal leading-7 text-dark-green sm:hidden sm:text-xl">
        {t('To-begin-we-are-piloting-with-a')}
      </p>
    </div>
  );
};

export { CountrySelector };
