import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

import brandLogo from '@/public/assets/images/brandLogo.svg';

import { FbtButton } from '../ui';

const hospitalDummyArray = [
  {
    waitTime: '2-3 weeks wait',
    hospitalName: 'PSH Avanti Hospital',
    city: 'Oslo',
    country: 'Norway',
    hospitalDesc:
      'The hospital offers specialized treatment to the population. In addition, the hospital has tasks in research, education of health personnel and training of patients and relatives.',
    costOfProcedure: '€ 1,000,000',
    reimBursementCost: '€ 1,000,000',
  },
  {
    waitTime: '2-3 weeks wait',
    hospitalName: 'Privathospitalet Kollund',
    city: 'Oslo',
    country: 'Norway',
    hospitalDesc:
      'The hospital offers specialized treatment to the population. In addition, the hospital has tasks in research, education of health personnel and training of patients and relatives.',
    costOfProcedure: '€ 1,000,000',
    reimBursementCost: '€ 1,000,000',
  },
  {
    waitTime: '2-3 weeks wait',
    hospitalName: 'CPH Privathospital',
    city: 'Oslo',
    country: 'Norway',
    hospitalDesc:
      'The hospital offers specialized treatment to the population. In addition, the hospital has tasks in research, education of health personnel and training of patients and relatives.',
    costOfProcedure: '€ 1,000,000',
    reimBursementCost: '€ 1,000,000',
  },
];

const HospitalCard = ({
  waitTime,
  hospitalName,
  city,
  country,
  hospitalDesc,
  costOfProcedure,
  reimBursementCost,
}: {
  waitTime: string;
  hospitalName: string;
  city: string;
  country: string;
  hospitalDesc: string;
  costOfProcedure: string;
  reimBursementCost: string;
}) => {
  const router = useRouter();
  return (
    <div
      className="flex w-[357px] flex-col items-start rounded-xl border border-neutral-5 px-6 py-4"
      style={{
        boxShadow: '2px 2px 4px 1px rgba(9, 111, 144, 0.1)',
      }}
    >
      <div className="flex items-center justify-center rounded-lg bg-info-2 px-3 py-2 font-lexend text-sm font-normal text-info-1">
        {waitTime}
      </div>
      <div className="mt-[21px] flex items-center justify-between">
        <Image
          src={brandLogo}
          className="size-12 rounded-full"
          alt="hospital-logo"
        />
        <div className="flex flex-col items-start">
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
        onClick={() =>
          router.push(`/hospital/${'58d2deca-3aec-4692-ac0d-a5943041a390'}`)
        }
      >
        Select Hospital
      </FbtButton>
    </div>
  );
};

const HospitalSelector = () => {
  return (
    <div className="flex flex-col items-start justify-center gap-2 sm:items-center">
      <h3 className="font-poppins text-5xl font-medium text-primary-1">
        Select a hospital for your procedure
      </h3>
      <div className="mt-[109px] flex flex-wrap items-center gap-[17px]">
        {hospitalDummyArray.map((hospital) => {
          return (
            <HospitalCard
              key={hospital.hospitalName}
              waitTime={hospital.waitTime}
              hospitalName={hospital.hospitalName}
              city={hospital.city}
              country={hospital.country}
              hospitalDesc={hospital.hospitalDesc}
              costOfProcedure={hospital.costOfProcedure}
              reimBursementCost={hospital.reimBursementCost}
            />
          );
        })}
      </div>
    </div>
  );
};

export { HospitalSelector };
