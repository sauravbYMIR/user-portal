import React from 'react';

import { FbtButton } from '../ui';

const genderData = [
  {
    label: 'Male',
    value: 'male',
  },
  {
    label: 'Female',
    value: 'female',
  },
];

const GenderSelector = () => {
  return (
    <div className="flex flex-col items-start justify-center gap-2 sm:items-center">
      <h3 className="font-poppins text-5xl font-medium text-primary-1">
        Select your gender
      </h3>
      <div className="mb-44 mt-20 flex flex-col items-start sm:grid sm:grid-cols-2 sm:gap-4">
        {genderData.map((gender) => {
          return (
            <FbtButton
              key={gender.value}
              variant="outline"
              className="my-4 flex !h-16 w-[320px] cursor-pointer !items-center !justify-center !rounded-lg !border-2 !border-neutral-5 !text-neutral-2 hover:!border-primary-2 hover:!bg-primary-6 hover:!text-primary-2 active:!border-2 active:!border-primary-2 active:!bg-primary-6 active:!text-primary-2 sm:my-0 sm:w-[262px]"
            >
              <span className="!py-5 font-poppins text-2xl font-normal">
                {gender.label}
              </span>
            </FbtButton>
          );
        })}
      </div>
    </div>
  );
};

export { GenderSelector };
