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
import { useScreenWidth } from '@/hooks/useScreenWidth';
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
  const { matches } = useScreenWidth(640);
  const { t } = useTranslation();
  const router = useRouter();
  const { selectedHospital } = useAppStore();
  return (
    <footer className="fixed bottom-0 flex h-24 w-screen items-start justify-between bg-secondary-green">
      <div className="flex h-full items-start">
        {steppers.map((info) => {
          const bgColor = `rgba(65, 135, 121, ${info.stepNo / 100})`;
          const border = `1px solid rgba(0, 70, 70, ${info.stepNo / 10})`;
          return (
            <button
              type="button"
              className="flex h-full w-[55.39px] items-center gap-x-[6px] rounded-r-lg p-6 sm:w-[165px]"
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
              onClick={() => {
                if (handleCountueBtnDisableStatus()) {
                  return;
                }
                setStepNumber(info.stepNo);
              }}
            >
              <div
                className={`${stepNum > 1 && stepNum !== info.stepNo && info.stepNo < stepNum ? 'bg-white' : ''} flex ${matches ? 'size-[20.89px]' : 'size-[29px]'} items-center justify-center rounded-full border-2 border-white p-1`}
              >
                <span className="text-[11.52px] font-normal text-white sm:text-xl">
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
              {!matches && (
                <span className="text-xl font-normal text-white">
                  {info.name}
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div className="flex items-center gap-x-6 py-4 pr-6">
        {!matches && (
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
        )}
        <button
          type="button"
          className={`${isDisable() ? 'cursor-not-allowed' : 'cursor-pointer'} flex w-[128px] items-center justify-center rounded-[40px] bg-dark-green py-4 text-white sm:w-[251px]`}
          disabled={isDisable()}
          onClick={() => {
            console.log({ stepNum });
            if (handleCountueBtnDisableStatus()) {
              return;
            }
            if (stepNum === 4) {
              router.push(`/hospital/${selectedHospital}`);
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
  const { matches } = useScreenWidth(640);
  const { t } = useTranslation();
  const {
    selectedCountry,
    selectedGender,
    selectedProcedure,
    selectedHospital,
    setStepNumber,
    stepNumber,
  } = useAppStore();
  const router = useRouter();
  const handleCountueBtnDisableStatus = () => {
    switch (stepNumber) {
      case 1:
        if (selectedCountry.length === 0) {
          toast.error(t('Please-select-country-to-proceed'));
          return true;
        }
        return false;
      case 2:
        if (selectedGender.length === 0) {
          toast.error(t('Please-select-gender-to-proceed'));
          return true;
        }
        return false;
      case 3:
        if (selectedProcedure.length === 0) {
          toast.error(t('Please-select-procedure-to-proceed'));
          return true;
        }
        return false;
      case 4:
        if (selectedHospital.length === 0) {
          toast.error(t('Please-select-hospital-to-proceed'));
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
      case 4:
        if (selectedHospital.length === 0) {
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
        <nav className="flex w-screen items-start justify-between px-5 sm:px-12">
          <button type="button" onClick={() => router.push('/book-procedure')}>
            <Image
              src={brand}
              width={matches ? 133.37 : 190.47}
              height={matches ? 32.21 : 46}
              alt="brand-with-name"
            />
            <p className="hidden">brand name</p>
          </button>
          <button
            type="button"
            className="flex items-center gap-x-3"
            onClick={() => router.push('/')}
          >
            <span className="font-onsite text-sm font-normal text-dark-green sm:block sm:text-xl">
              {t('Close')}
            </span>
            <div className="flex items-center justify-center rounded-full border-[1.5px] border-dark-green p-1">
              <CloseIcon
                className={matches ? 'size-4' : 'size-8'}
                stroke="rgba(0, 70, 70, 1)"
              />
            </div>
          </button>
        </nav>
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
