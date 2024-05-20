'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

import { CountrySelector } from '@/components/CountrySelector/CountrySelector';
import { GenderSelector } from '@/components/GenderSelector/GenderSelector';
import { HospitalSelector } from '@/components/HospitalSelector/HospitalSelector';
import { ArrowBackIcon, ArrowIcon, CloseIcon } from '@/components/Icons/Icons';
import { ProcedureSelector } from '@/components/ProcedureSelector/ProcedureSelector';
import { FbtButton, FbtProgress } from '@/components/ui';
import { useAppStore } from '@/libs/store';
import brandTitle from '@/public/assets/icons/brandTitle.svg';

const BookProcedure = () => {
  const { selectedCountry, selectedGender, selectedProcedure } = useAppStore();
  const router = useRouter();
  const [step, setStep] = React.useState<number>(1);
  const handleCountueBtnDisableStatus = () => {
    switch (step) {
      case 1:
        if (selectedCountry.length === 0) {
          toast.error('Please select country to proceed');
          return true;
        }
        return false;
      case 2:
        if (selectedGender.length === 0) {
          toast.error('Please select gender to proceed');
          return true;
        }
        return false;
      case 3:
        if (selectedProcedure.length === 0) {
          toast.error('Please select procedure to proceed');
          return true;
        }
        return false;
      // case 4:
      //   if (selectedHospital.length === 0) {
      //     return true;
      //   }
      //   return false;

      default:
        break;
    }
    return false;
  };
  const handleClassNameCountueBtnDisableStatus = () => {
    switch (step) {
      case 1:
        if (selectedCountry.length === 0) {
          return true;
        }
        return false;
      case 2:
        if (selectedGender.length === 0) {
          return true;
        }
        return false;
      case 3:
        if (selectedProcedure.length === 0) {
          return true;
        }
        return false;
      // case 4:
      //   if (selectedHospital.length === 0) {
      //     return true;
      //   }
      //   return false;

      default:
        break;
    }
    return false;
  };
  return (
    <div className="relative flex w-screen flex-col items-center justify-center px-[87px] py-[43px]">
      <button
        type="button"
        className="absolute left-8 top-16 flex items-center justify-between"
        onClick={() => setStep((prevState) => prevState - 1)}
      >
        <ArrowBackIcon stroke="rgba(9, 111, 144, 1)" />
        <span className="ml-4 font-poppins text-2xl font-medium text-primary-2">
          Back
        </span>
      </button>
      <Image src={brandTitle} alt="brand-title" width={160} height={64} />
      <button
        type="button"
        className="absolute right-8 top-16 flex items-center justify-between"
        onClick={() => router.push('/')}
      >
        <span className="mr-4 font-poppins text-2xl font-medium text-primary-2">
          Close
        </span>
        <CloseIcon />
      </button>
      <div className="relative flex w-full">
        <FbtProgress
          value={Number(step) * 25}
          className="mt-[50px] !h-2 w-full"
        />
        <span className="absolute right-[-30px] top-10">{step}/4</span>
      </div>
      <div className="m-20">
        {step === 1 && (
          <CountrySelector
          // selectedCountry={selectedCountry}
          // setSelectedCountry={setSelectedCountry}
          />
        )}
        {step === 2 && (
          <GenderSelector
          // selectedGender={selectedGender}
          // setSelectedGender={setSelectedGender}
          />
        )}

        {step === 3 && (
          <ProcedureSelector
          // selectedProcedure={selectedProcedure}
          // setSelectedProcedure={setSelectedProcedure}
          />
        )}
        {step === 4 && (
          <HospitalSelector
          // selectedCountry={selectedCountry}
          // selectedProcedure={selectedProcedure}
          // selectedHospital={selectedHospital}
          // setSelectedHospital={setSelectedHospital}
          />
        )}
      </div>

      {step < 4 && (
        <FbtButton
          type="button"
          className={`${handleClassNameCountueBtnDisableStatus() ? 'cursor-not-allowed' : 'cursor-pointer'} !flex !h-[64px] !w-[358px] !items-center !justify-center !rounded-[6.4px] !bg-primary-2 !py-[14px]`}
          onClick={() => {
            if (handleCountueBtnDisableStatus()) {
              return;
            }
            setStep((prevState) => prevState + 1);
          }}
        >
          <span className="mr-3 font-poppins text-2xl font-normal text-neutral-7">
            Continue
          </span>
          <ArrowIcon stroke="#fff" className="size-[25.6px]" />
        </FbtButton>
      )}
    </div>
  );
};

export default BookProcedure;
