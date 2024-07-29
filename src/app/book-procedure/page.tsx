'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

import { CountrySelector } from '@/components/CountrySelector/CountrySelector';
import { GenderSelector } from '@/components/GenderSelector/GenderSelector';
import { HospitalSelector } from '@/components/HospitalSelector/HospitalSelector';
import {
  BackShortArrowIcon,
  CheckIcon,
  CloseIcon,
} from '@/components/Icons/Icons';
import { ProcedureSelector } from '@/components/ProcedureSelector/ProcedureSelector';
import useTranslation from '@/hooks/useTranslation';
import { useAppStore } from '@/libs/store';
import brand from '@/public/assets/icons/brand.svg';

const steppers = [
  {
    name: 'Country',
    stepNo: 1,
  },
  {
    name: 'Gender',
    stepNo: 2,
  },
  {
    name: 'Procedure',
    stepNo: 3,
  },
  {
    name: 'Hospital',
    stepNo: 4,
  },
];

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

const Stepper = ({
  stepNum,
  isDisable,
  handleCountueBtnDisableStatus,
  setStepNumber,
}: {
  stepNum: number;
  isDisable: () => boolean;
  handleCountueBtnDisableStatus: () => boolean;
  setStepNumber: (stepNumber: number) => void;
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <footer className="fixed bottom-0 flex h-24 w-screen items-start justify-between bg-secondary-green">
      <div className="flex h-full items-start">
        {steppers.map((info) => {
          const bgColor = `rgba(65, 135, 121, ${info.stepNo / 100})`;
          const border = `1px solid rgba(0, 70, 70, ${info.stepNo / 10})`;
          return (
            <div
              className="flex h-full items-center gap-x-[6px] rounded-r-lg p-6"
              key={info.stepNo}
              style={
                stepNum === info.stepNo
                  ? {
                      backgroundColor: 'rgba(0, 70, 70, 1)',
                    }
                  : {
                      backgroundColor: bgColor,
                      borderRight: border,
                    }
              }
            >
              <div
                className={`${stepNum > 1 && stepNum !== info.stepNo && info.stepNo < stepNum ? 'bg-white' : ''} flex size-[29px] items-center justify-center rounded-full border-2 border-white p-1`}
              >
                <span className="text-xl font-normal text-white">
                  {stepNum > 1 &&
                  stepNum !== info.stepNo &&
                  info.stepNo < stepNum ? (
                    <CheckIcon
                      stroke="rgba(0, 70, 70, 1)"
                      className="size-4"
                      strokeWidth="3"
                    />
                  ) : (
                    `${info.stepNo}`
                  )}
                </span>
              </div>
              <span className="text-xl font-normal text-white">
                {info.name}
              </span>
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-x-6 py-4 pr-6">
        <button
          type="button"
          className="flex items-center justify-center gap-x-[6px] border-none bg-transparent"
          onClick={() => {
            if (stepNum > 1) {
              setStepNumber(stepNum - 1);
              return;
            }
            router.back();
          }}
        >
          <BackShortArrowIcon
            stroke="rgba(255, 255, 255, 1)"
            strokeWidth="2.5"
          />
          <span className="text-xl font-normal text-white">{t('back')}</span>
        </button>
        <button
          type="button"
          className={`${isDisable() ? 'cursor-not-allowed' : 'cursor-pointer'} flex w-[128px] items-center justify-center rounded-[40px] bg-dark-green py-4 text-white sm:w-[251px]`}
          disabled={isDisable()}
          onClick={() => {
            if (handleCountueBtnDisableStatus()) {
              return;
            }
            if (stepNum < 4) {
              setStepNumber(stepNum + 1);
            }
          }}
        >
          <span className="text-xl font-normal text-white">
            {t('Next-step')}
          </span>
        </button>
      </div>
    </footer>
  );
};

const BookProcedure = () => {
  const { t } = useTranslation();
  const {
    selectedCountry,
    selectedGender,
    selectedProcedure,
    setStepNumber,
    stepNumber,
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
      default:
        break;
    }
    return false;
  };
  return (
    <div className="h-screen">
      <div className="relative flex w-screen flex-col items-center justify-between bg-primary-green px-[20px] py-[27px] md:px-[60px] md:py-[32px] lg:px-[87px] lg:py-[43px] xl:justify-center">
        {/* <Image
        src={brandTitle}
        className=" w-[120px] sm:w-auto"
        alt="brand-title"
        width={160}
        height={64}
      /> */}
        <nav className="flex w-screen items-start justify-between px-12">
          <button type="button" onClick={() => router.push('/book-procedure')}>
            <Image
              src={brand}
              width={190.47}
              height={46}
              alt="brand-with-name"
            />
            <p className="hidden">brand name</p>
          </button>
          <button
            type="button"
            className="flex items-center gap-x-3"
            onClick={() => router.push('/')}
          >
            <span className="font-poppins text-xl font-normal text-dark-green sm:block">
              {t('Close')}
            </span>
            <div className="flex items-center justify-center rounded-full border-[1.5px] border-dark-green p-1">
              <CloseIcon className="size-8" stroke="rgba(0, 70, 70, 1)" />
            </div>
          </button>
        </nav>
        {/* 
      <div className="relative mt-[50px] flex w-full items-baseline justify-between">
        <FbtProgress
          value={Number(stepNumber) * 25}
          className="!h-2 w-[92%] sm:w-[95%] "
        />
        <span className="top-10 text-base sm:right-[-40px] sm:text-xl">
          {stepNumber}/4
        </span>
      </div> */}
        {/* {stepNumber < 4 && (
        <div className="relative flex w-full items-center justify-between py-[27px] ">
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
      )} */}
        <div
          className="m-5 w-full overflow-y-scroll"
          style={{
            height: 'calc(100vh - 200px)',
          }}
        >
          <BookingFlow stepNumber={stepNumber} />
        </div>
      </div>
      <Stepper
        stepNum={stepNumber}
        isDisable={() => handleClassNameCountueBtnDisableStatus()}
        handleCountueBtnDisableStatus={handleCountueBtnDisableStatus}
        setStepNumber={setStepNumber}
      />
    </div>
  );
};

export default BookProcedure;
