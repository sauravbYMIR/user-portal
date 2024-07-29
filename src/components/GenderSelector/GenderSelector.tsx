import Image from 'next/image';
import React from 'react';

import useTranslation from '@/hooks/useTranslation';
import { useAppStore } from '@/libs/store';
import femaleGenderIcon from '@/public/assets/icons/female.svg';
import maleGenderIcon from '@/public/assets/icons/male.svg';
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
    <div className="flex w-full flex-col items-center justify-center gap-2">
      <div className="w-8/12">
        <h3 className="text-center font-poppins text-[24px] font-medium text-dark-green sm:text-[32px] sm:leading-12 md:text-5xl md:leading-15">
          {t('Select-your-gender')}
        </h3>
      </div>
      <div className="mt-[40px] flex flex-col items-start gap-4 sm:mb-44 sm:mt-20 sm:grid sm:grid-cols-2">
        {genderData.map((gender) => {
          return (
            <FbtButton
              key={gender.value}
              variant="outline"
              className={`${selectedGender === gender.value ? 'bg-dark-green !text-white hover:!bg-white hover:!text-dark-green' : 'bg-base-light text-dark-green hover:!bg-white hover:!text-dark-green'} flex !h-[139.51px] !w-[136px] cursor-pointer flex-col !items-center !justify-center gap-y-4 !rounded-2xl !border-none sm:my-0 sm:!h-[179.5px] sm:!w-[294px] md:my-4`}
              onClick={() => {
                setSelectedGender(gender.value);
                handleSetLocalStorage({
                  tokenKey: 'selected_gender',
                  tokenValue: gender.value,
                });
              }}
            >
              {gender.value === 'men' ? (
                <Image
                  src={maleGenderIcon}
                  alt="men-gender"
                  height={58.5}
                  width={58.5}
                />
              ) : (
                <Image
                  src={femaleGenderIcon}
                  alt="female-gender"
                  height={58.5}
                  width={58.5}
                />
              )}
              <span className="font-poppins text-2xl font-medium">
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
