import React from 'react';

import useTranslation from '@/hooks/useTranslation';
import { useAppStore } from '@/libs/store';
import { handleSetLocalStorage } from '@/utils/global';

import { FbtButton } from '../ui';

const genderData = [
  {
    label: 'Male',
    value: 'men',
  },
  {
    label: 'Female',
    value: 'women',
  },
];

const GenderSelector = () => {
  const { t } = useTranslation();
  const { selectedGender, setSelectedGender } = useAppStore();
  return (
    <div className="flex w-full flex-col  items-center justify-center gap-2">
      <div className="w-8/12">
        <h3 className="text-center font-poppins text-[24px] font-medium text-primary-1 sm:text-[32px] sm:leading-12 md:text-5xl md:leading-15">
          {t('Select-your-gender')}
        </h3>
      </div>
      <div className="mt-[40px] flex flex-col items-start gap-4 sm:mb-44 sm:mt-20 sm:grid sm:grid-cols-2">
        {genderData.map((gender) => {
          return (
            <FbtButton
              key={gender.value}
              variant="outline"
              className={`${selectedGender === gender.value ? '!border-2 !border-primary-2 !bg-primary-6' : ''} flex !h-16 w-[320px] cursor-pointer !items-center !justify-center !rounded-lg !border-2 !border-neutral-5 !text-neutral-2 hover:!border-primary-2 hover:!bg-primary-6 hover:!text-primary-2 active:!border-2 active:!border-primary-2 active:!bg-primary-6 active:!text-primary-2 sm:my-4 sm:w-[262px]`}
              onClick={() => {
                setSelectedGender(gender.value);
                handleSetLocalStorage({
                  tokenKey: 'selected_gender',
                  tokenValue: gender.value,
                });
              }}
            >
              <span className="!py-5 font-poppins text-2xl font-normal">
                {t(gender.label)}
              </span>
            </FbtButton>
          );
        })}
      </div>
    </div>
  );
};

export { GenderSelector };
