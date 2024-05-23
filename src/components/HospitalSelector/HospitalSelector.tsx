import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

import { useGetHospitalByProcedureId } from '@/hooks/useHospital';
import useTranslation from '@/hooks/useTranslation';
import { useAppStore } from '@/libs/store';
import brandLogo from '@/public/assets/images/brandLogo.svg';

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
}) => {
  const { t } = useTranslation();
  const { setSelectedHospital, setSelectedHospitalName } = useAppStore();
  const router = useRouter();
  return (
    <div
      className={`${selectedHospital === id ? 'border-primary-2' : 'border-neutral-5'} flex w-[357px] flex-col items-start rounded-xl border  px-6 py-4`}
      style={{
        boxShadow: '2px 2px 4px 1px rgba(9, 111, 144, 0.1)',
      }}
    >
      <div className="flex items-center justify-center rounded-lg bg-info-2 px-3 py-2 font-lexend text-sm font-normal text-info-1">
        {waitTime} days
      </div>
      <div className="mt-[21px] flex items-center justify-between">
        <Image
          src={brandLogo}
          className="size-12 rounded-full border-2 border-neutral-5"
          alt="hospital-logo"
        />
        <div className="ml-3 flex flex-col items-start">
          <h3 className="font-poppins text-xl font-medium text-neutral-1">
            {hospitalName}
          </h3>
          <p className="font-lexend text-base font-light text-neutral-2">
            {city}, {country}
          </p>
        </div>
      </div>
      <p className="mb-6 mt-4 font-lexend text-sm font-light text-neutral-2">
        {hospitalDesc}
      </p>
      <div className="mb-8 flex w-full items-start justify-between">
        <div className="flex w-2/5 flex-col items-start">
          <span className="mb-2 font-lexend text-sm font-normal text-neutral-2">
            Cost of procedure
          </span>
          <span className="font-lexend text-sm font-light text-neutral-2">
            {costOfProcedure}
          </span>
        </div>
        <div className="flex w-2/5 flex-col items-start">
          <span className="mb-2 font-lexend text-sm font-normal text-neutral-2">
            Reimbursement offered
          </span>
          <span className="font-lexend text-sm font-light text-neutral-2">
            {reimBursementCost}
          </span>
        </div>
      </div>
      <FbtButton
        variant="outline"
        className="!h-[64px] !w-full !rounded-[6.4px] !border-2 !border-primary-2 !text-primary-2 hover:!bg-primary-2 hover:!text-white active:!bg-primary-2 active:!text-white"
        onClick={() => {
          setSelectedHospital(id);
          setSelectedHospitalName(hospitalName);
          router.push(`/hospital/${id}`);
        }}
      >
        {t('Select-Hospital')}
      </FbtButton>
    </div>
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
  const costType = {
    en: 0,
    nb: 0,
    da: 0,
    sv: 0,
  };
  const selectedLanguageName = selectedCountry as keyof typeof nameType;
  const selectedLanguageCost = selectedCountry as keyof typeof costType;
  return (
    <div className="flex flex-col items-start justify-center gap-2 sm:items-center">
      <h3 className="font-poppins text-5xl font-medium text-primary-1">
        {t('Select-a-hospital-for-your-procedure')}
      </h3>
      <div className="mt-[109px] flex flex-wrap items-center gap-[17px]">
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
                hospitalDesc={hospital.hospitalDesc[selectedLanguageName]}
                costOfProcedure={`${hospital.costOfProcedure[selectedLanguageCost]}`}
                reimBursementCost={`${hospital.reimBursementCost[selectedLanguageCost]}`}
              />
            );
          })}
      </div>
    </div>
  );
};

export { HospitalSelector };
