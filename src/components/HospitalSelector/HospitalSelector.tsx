import Image from 'next/image';
import React from 'react';

import type { HospitalImageType } from '@/hooks/useHospital';
import { useGetHospitalByProcedureId } from '@/hooks/useHospital';
import useTranslation from '@/hooks/useTranslation';
import { useAppStore } from '@/libs/store';
import {
  convertToValidCurrency,
  countryData,
  handleGetLocalStorage,
  handleSetLocalStorage,
} from '@/utils/global';

import { CheckIcon, ExclamationCircleIcon, HospitalIcon } from '../Icons/Icons';
import { FbtButton } from '../ui';

const HospitalCard = ({
  id,
  selectedHospital,
  waitTime,
  hospitalName,
  city,
  country,
  hospitalDesc,
  costOfProcedure,
  reimBursementCost,
  hospitalLogo,
  hospitalImages,
}: {
  selectedHospital: string;
  id: string;
  waitTime: string;
  hospitalName: string;
  city: string;
  country: string;
  hospitalDesc: string;
  costOfProcedure: string;
  reimBursementCost: string;
  hospitalLogo: false | string;
  hospitalImages: Array<HospitalImageType>;
}) => {
  const { t } = useTranslation();
  const { setSelectedHospital, setSelectedHospitalName } = useAppStore();
  return (
    <button
      type="button"
      className={`bg-base-light ${selectedHospital === id ? 'border-primary-2' : 'border-neutral-5'} flex h-[444px] flex-1 flex-col items-start rounded-xl border px-3 py-4`}
      style={{
        boxShadow: '2px 2px 4px 1px rgba(9, 111, 144, 0.1)',
      }}
      onClick={() => {
        setSelectedHospital(id);
        setSelectedHospitalName(hospitalName);
        handleSetLocalStorage({
          tokenKey: 'selected_hospital',
          tokenValue: id,
        });
        handleSetLocalStorage({
          tokenKey: 'selected_hospital_name',
          tokenValue: hospitalName,
        });
      }}
    >
      <div className="relative h-[209px] w-full rounded-xl">
        {hospitalImages.length > 0 && hospitalImages[0] && (
          <Image
            src={hospitalImages[0].imageUrl}
            alt={hospitalImages[0].fileName}
            fill
            unoptimized
            priority
            className="rounded-xl"
            objectFit="cover"
          />
        )}
        <FbtButton
          variant="outline"
          className="absolute right-2 top-2 !h-[40px] gap-x-[6px] !rounded-[42.81px] !border-none bg-secondary-green text-white hover:!bg-secondary-green hover:!text-white"
        >
          {selectedHospital === id ? (
            <>
              <CheckIcon stroke="#fff" className="size-5" />
              <span className="text-base font-medium text-white">
                {t('Selected')}
              </span>
            </>
          ) : (
            <span className="text-base font-medium text-white">
              {t('Select')}
            </span>
          )}
        </FbtButton>
      </div>

      <div className="my-[14.89px] flex w-full items-start justify-between gap-x-3">
        <div className="flex items-start justify-between">
          {hospitalLogo && typeof hospitalLogo === 'string' ? (
            <Image
              src={hospitalLogo}
              unoptimized
              priority
              className="size-12 rounded-full border-2 border-neutral-5"
              alt="hospital-logo"
              height={48}
              width={48}
            />
          ) : (
            <HospitalIcon className="size-12 rounded-full border-2 border-neutral-5" />
          )}
          <div className="ml-3 flex flex-col items-start">
            <h3 className="font-onsite text-sm font-bold text-dark-green sm:text-base">
              {hospitalName}
            </h3>
            <p className="font-onsite text-sm font-normal text-dark-green sm:text-base">
              {city}, {country}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start justify-center rounded-lg bg-light-purple px-3 py-2 font-onsite text-sm font-normal text-info-1">
          <p className="text-xs font-normal text-accent-purple sm:text-base">
            {t('Wait-time')}
          </p>
          <p className="text-sm font-medium text-accent-purple sm:text-base">
            {waitTime} days
          </p>
        </div>
      </div>
      <div className="mb-1 flex w-full items-start justify-between">
        <div className="flex w-2/5 flex-col items-start">
          <span className="mb-1 text-start font-onsite text-sm font-normal text-dark-green">
            {t('Cost-of-procedure')}
          </span>
          <span className="text-start font-onsite text-sm font-bold text-dark-green">
            {costOfProcedure}
          </span>
        </div>
        <div className="flex w-2/5 flex-col items-start">
          <span className="mb-1 text-start font-onsite text-sm font-normal text-dark-green">
            {t('Reimbursement-offered')}
          </span>
          <span className="text-start font-onsite text-sm font-bold text-dark-green">
            {reimBursementCost}
          </span>
        </div>
      </div>
      <p className="mb-6 mt-2 text-start font-onsite text-base font-normal text-dark-green">
        {hospitalDesc.length > 50
          ? `${hospitalDesc.slice(0, 50)}...`
          : hospitalDesc}
      </p>
    </button>
  );
};

const HospitalSelector = () => {
  const { t } = useTranslation();
  const { selectedProcedure, selectedCountry, selectedHospital } =
    useAppStore();
  const allHospitals = useGetHospitalByProcedureId({
    hospitalId: selectedProcedure,
  });
  const nameType = {
    en: '',
    nb: '',
    da: '',
    sv: '',
  };
  const selectedReimbursementCountry = selectedCountry as keyof typeof nameType;
  const selectedLanguageFromUserDropdown = handleGetLocalStorage({
    tokenKey: 'selected_language',
  });
  const selectedCountryInfo = countryData.find(
    (countryInfo) => countryInfo.countryCode === selectedReimbursementCountry,
  );
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="w-8/12">
        <h3 className="mt-20 text-center font-onsite text-[24px] font-medium text-primary-1 sm:mt-0 sm:text-[32px] sm:leading-12 md:text-5xl md:leading-15">
          {t('Select-a-hospital-for-your-procedure')}
        </h3>
      </div>
      <div className="w-full pb-20">
        <div className="mt-[40px] flex flex-col content-center justify-items-center gap-[24px] sm:mt-[60px] sm:grid sm:grid-cols-3">
          {allHospitals.data &&
            Array.isArray(allHospitals.data.data) &&
            allHospitals.data.data.length > 0 &&
            allHospitals.data.data.map((hospital) => {
              return (
                <HospitalCard
                  selectedHospital={selectedHospital}
                  id={hospital.id}
                  key={hospital.id}
                  waitTime={hospital.waitTime}
                  hospitalName={hospital.hospitalName}
                  city={hospital.city}
                  country={hospital.country}
                  hospitalDesc={
                    hospital.hospitalDesc[
                      (selectedLanguageFromUserDropdown as keyof typeof nameType) ??
                        'en'
                    ]
                  }
                  costOfProcedure={convertToValidCurrency({
                    price: hospital.costOfProcedure.price,
                    locale: selectedLanguageFromUserDropdown ?? 'en',
                    currency: hospital.costOfProcedure.currency,
                  })}
                  reimBursementCost={`${
                    selectedCountryInfo?.countryCode
                      ? convertToValidCurrency({
                          price:
                            hospital.reimBursementCost[
                              (selectedCountry as keyof typeof hospital.reimBursementCost) ??
                                'ie'
                            ],
                          currency: selectedCountryInfo.currency,
                          locale: selectedCountryInfo.locale,
                        })
                      : ''
                  }`}
                  hospitalLogo={hospital.hospitalLogo}
                  hospitalImages={hospital.hospitalImages}
                />
              );
            })}
        </div>
        {!(
          allHospitals.data &&
          Array.isArray(allHospitals.data.data) &&
          allHospitals.data.data.length > 0
        ) && (
          <div className="flex w-full flex-col items-center justify-center">
            <div className="flex w-8/12 flex-col items-center justify-center">
              <ExclamationCircleIcon
                className="size-12"
                stroke="rgba(0, 70, 70, 1)"
              />
              <p className="text-center font-onsite text-2xl font-normal text-neutral-2">
                {t('The-selected-procedure-is-not-associated')}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export { HospitalSelector };
