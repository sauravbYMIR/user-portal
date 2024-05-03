/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import 'react-phone-number-input/style.css';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import { ClipLoader } from 'react-spinners';
import { z } from 'zod';

import { CloseIcon } from '../Icons/Icons';
import { ModalWrapper } from '../ModalWrapper/ModalWrapper';
import { FbtButton } from '../ui';

const createUserAccountSchema = z.object({
  email: z.string().email(),
  phoneNumber: z
    .string()
    .min(10, { message: 'Must be a valid mobile number' })
    .max(14, { message: 'Must be a valid mobile number' }),
  preferredLanguage: z
    .string()
    .min(1, { message: 'Please enter preferred language' }),
});
export type CreateUserAccountFormFields = z.infer<
  typeof createUserAccountSchema
>;
const CreateAccount = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserAccountFormFields>({
    resolver: zodResolver(createUserAccountSchema),
  });
  const onFormSubmit: SubmitHandler<
    CreateUserAccountFormFields
  > = async () => {};
  return (
    <ModalWrapper
      parentStyle="z-[9990] fixed top-0 left-0 after:backdrop-blur bg-zinc-900/70 flex items-center justify-center"
      childrenStyle="overflow-scroll relative z-[9999] flex flex-col items-center justify-center w-full sm:w-[547px] rounded-lg bg-white px-[24px] py-[32px] shadow-colorPickerShadow"
    >
      <FbtButton variant="link" className="!absolute !right-2 !top-2 !p-0">
        <CloseIcon stroke="#333" />
      </FbtButton>
      <div className="flex flex-col items-center">
        <h1 className="font-poppins text-5xl font-medium text-primary-1">
          Create an account
        </h1>
        <p className="text-center font-lexend text-xl font-light text-neutral-2">
          Empowering EU & EEC citizens awaiting medical treatments to take
          charge of their own health.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="my-12 flex w-full flex-col items-center px-12"
      >
        <div className="mb-8 flex w-full flex-col items-start">
          <label
            className="font-inter text-xl font-normal text-black"
            htmlFor="email"
          >
            Email
          </label>
          <input
            placeholder="Enter your email"
            className="mt-2 w-full rounded-[10.67px] border-2 border-lightsilver px-3 py-5"
            id="email"
            type="text"
            {...register('email')}
          />
          {errors.email && (
            <div className="mt-2 text-center font-lexend text-base font-normal text-error">
              {errors.email.message}
            </div>
          )}
        </div>
        <div className="mb-8 w-full flex-col items-start">
          <label
            htmlFor="phoneNumber"
            className="font-inter text-xl font-normal text-black"
          >
            Phone Number
          </label>
          <Controller
            name="phoneNumber"
            control={control}
            rules={{
              validate: (value) => isValidPhoneNumber(value),
            }}
            render={({ field: { onChange, value } }) => (
              <PhoneInput
                placeholder="+47 000 00 00"
                value={value}
                onChange={onChange}
                international
                defaultCountry="NO"
                id="phoneNumber"
                className="mt-2 h-[64px]"
              />
            )}
          />
          {errors.phoneNumber && (
            <p className="mt-2 font-lexend text-base font-normal text-error">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>
        <div className="mb-8 flex w-full flex-col items-start">
          <label
            className="font-inter text-xl font-normal text-black"
            htmlFor="preferredLanguage"
          >
            Preferred language of communication
          </label>
          <input
            placeholder="Enter your email"
            className="mt-2 w-full rounded-[10.67px] border-2 border-lightsilver px-3 py-5"
            id="preferredLanguage"
            type="text"
            {...register('preferredLanguage')}
          />
          {errors.preferredLanguage && (
            <div className="mt-2 text-center font-lexend text-base font-normal text-error">
              {errors.preferredLanguage.message}
            </div>
          )}
        </div>
        <div className="mb-4 flex items-center">
          <span className="font-lexend text-xl font-normal text-primary-2">
            Already have an account?
          </span>
          <button type="button" className="ml-1 underline">
            <span className="font-lexend text-xl font-medium text-primary-2">
              Login
            </span>
          </button>
        </div>
        <FbtButton
          type="submit"
          variant="solid"
          disabled={isSubmitting}
          className="!h-[64px] !w-full !rounded-[6.4px]"
        >
          {isSubmitting ? (
            <ClipLoader
              loading={isSubmitting}
              color="#fff"
              size={30}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            <p className="font-poppins text-2xl font-normal text-neutral-7">
              Get code via sms
            </p>
          )}
        </FbtButton>
      </form>
    </ModalWrapper>
  );
};

export { CreateAccount };
