'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

import pageStyle from '@/app/page.module.scss';
import { CountrySelector } from '@/components/CountrySelector/CountrySelector';
import { GenderSelector } from '@/components/GenderSelector/GenderSelector';
import { HospitalSelector } from '@/components/HospitalSelector/HospitalSelector';
import {
  ArrowBackIcon,
  ArrowNextIcon,
  CloseIcon,
} from '@/components/Icons/Icons';
import { ProcedureSelector } from '@/components/ProcedureSelector/ProcedureSelector';
import { FbtProgress } from '@/components/ui';
import useTranslation from '@/hooks/useTranslation';
import { useAppStore } from '@/libs/store';
import brandTitle from '@/public/assets/icons/brandTitle.svg';

const BookingFlow = ({ stepNumber }: { stepNumber: number }) => {
  switch (stepNumber) {
    case 1:
      return <CountrySelector />;
    case 2:
      return <GenderSelector />;
    case 3:
      return <ProcedureSelector />;
    case 4:
      return <HospitalSelector />;
    default:
      return <div />;
  }
};

const BookProcedure = () => {
  const { t } = useTranslation();
  const {
    selectedCountry,
    selectedGender,
    selectedProcedure,
    stepNumber,
    setStepNumber,
  } = useAppStore();
  const router = useRouter();
  const handleCountueBtnDisableStatus = () => {
    switch (stepNumber) {
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
    switch (stepNumber) {
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
    <div className="relative flex w-screen flex-col items-center justify-between px-[20px] py-[27px] md:px-[60px] md:py-[32px] lg:px-[87px] lg:py-[43px] xl:justify-center">
      <Image
        src={brandTitle}
        className=" w-[120px] sm:w-auto"
        alt="brand-title"
        width={160}
        height={64}
      />
      <button
        type="button"
        className="absolute right-0 top-8  flex items-center justify-between pr-[32px] md:top-16  md:pr-[100px]"
        onClick={() => router.push('/')}
      >
        <span className="mr-4 hidden font-poppins text-2xl font-medium text-primary-2 sm:block">
          {t('Close')}
        </span>
        <CloseIcon className="size-8" />
      </button>

      <div className="relative mt-[50px] flex w-full items-baseline justify-between">
        <FbtProgress
          value={Number(stepNumber) * 25}
          className="!h-2 w-[92%] sm:w-[95%] "
        />
        <span className="top-10 text-base sm:right-[-40px] sm:text-xl">
          {stepNumber}/4
        </span>
      </div>
      {stepNumber < 4 && (
        <div className="relative flex w-full items-center justify-between py-[27px] ">
          {/* min-[420]:w-2/5   min-[560px]:w-1/3  min-[560]:w-3/12 */}
          <button
            className={` ${pageStyle.previousBtn} ${pageStyle.btn}`}
            type="button"
            onClick={() => {
              if (stepNumber > 1) {
                setStepNumber(stepNumber - 1);
                return;
              }
              router.back();
            }}
          >
            <ArrowBackIcon stroke="rgba(9, 111, 144, 1)" width="2.5" />
            {t('Previous')}
          </button>
          <button
            className={`${handleClassNameCountueBtnDisableStatus() ? 'cursor-not-allowed' : 'cursor-pointer'} ${pageStyle.nextBtn} ${pageStyle.btn}`}
            type="button"
            onClick={() => {
              if (handleCountueBtnDisableStatus()) {
                return;
              }
              if (stepNumber < 4) {
                setStepNumber(stepNumber + 1);
              }
            }}
          >
            {t('Next')}
            <ArrowNextIcon stroke="rgba(246, 248, 249, 1)" width="2.5" />
          </button>
        </div>
      )}
      <div className="m-5 w-full">
        <BookingFlow stepNumber={stepNumber} />
      </div>
    </div>
  );
};

export default BookProcedure;
