/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import 'react-phone-number-input/style.css';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import Select from 'react-select';
import { ClipLoader } from 'react-spinners';
import { toast } from 'sonner';
import { z } from 'zod';

import { createUser, userlogin } from '@/hooks/useAuth';
import useTranslation from '@/hooks/useTranslation';
import { useAppStore } from '@/libs/store';
import {
  countryData,
  handleSetLocalStorage,
  LOGIN,
  SIGNUP,
} from '@/utils/global';

import { CloseIcon } from '../Icons/Icons';
import { ModalWrapper } from '../ModalWrapper/ModalWrapper';
import { FbtButton } from '../ui';

export const preferredLanguageTypeSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export type PreferredLanguageType = {
  value: string;
  label: string;
};

const createUserAccountSchema = z.object({
  email: z.string().email(),
  phoneNumber: z
    .string()
    .min(10, { message: 'Must be a valid mobile number' })
    .max(14, { message: 'Must be a valid mobile number' }),
  preferredLanguage: preferredLanguageTypeSchema,
});
export type CreateUserAccountFormFields = z.infer<
  typeof createUserAccountSchema
>;
const LoginUserAccountSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, { message: 'Must be a valid mobile number' })
    .max(14, { message: 'Must be a valid mobile number' }),
});
export type LoginUserAccountFormFields = z.infer<typeof LoginUserAccountSchema>;
const CreateAccount = () => {
  const [isLogin, setIsLogin] = React.useState<boolean>(false);
  const {
    setIsLoginModalActive,
    setIsOtpVerifyModalActive,
    setSelectedPhoneNumber,
  } = useAppStore();
  const languageList: Array<PreferredLanguageType> = countryData.map(
    (data) => ({
      label: data.language,
      value: data.locale,
    }),
  );
  const [selectedOption, setSelectedOption] = React.useState<{
    label: string;
    value: string;
  } | null>(null);
  const createUserRHF = useForm<CreateUserAccountFormFields>({
    resolver: zodResolver(createUserAccountSchema),
  });
  const loginUserRHF = useForm<CreateUserAccountFormFields>({
    resolver: zodResolver(LoginUserAccountSchema),
  });
  const onCreateAccountFormSubmit: SubmitHandler<
    CreateUserAccountFormFields
  > = async (data: CreateUserAccountFormFields) => {
    try {
      const response = await createUser({
        email: data.email,
        phoneNumber: data.phoneNumber,
        preferedLanguage: data.preferredLanguage.value,
      });
      if (response.success) {
        handleSetLocalStorage({
          tokenKey: 'otp_verify_token',
          tokenValue: response.data.token,
        });
        handleSetLocalStorage({ tokenKey: 'flow_type', tokenValue: SIGNUP });
        setIsOtpVerifyModalActive(true);
        setIsLoginModalActive(false);
        setSelectedPhoneNumber(createUserRHF.getValues('phoneNumber'));
      }
    } catch (error) {
      toast.error(error as string);
    }
  };
  const onLoginFormSubmit: SubmitHandler<LoginUserAccountFormFields> = async (
    data: LoginUserAccountFormFields,
  ) => {
    try {
      const response = await userlogin({
        phoneNumber: data.phoneNumber,
      });
      if (response.success) {
        handleSetLocalStorage({
          tokenKey: 'otp_verify_token',
          tokenValue: response.data.token,
        });
        handleSetLocalStorage({ tokenKey: 'flow_type', tokenValue: LOGIN });
        setIsOtpVerifyModalActive(true);
        setIsLoginModalActive(false);
        setSelectedPhoneNumber(loginUserRHF.getValues('phoneNumber'));
      }
    } catch (error) {
      toast.error(error as string);
    }
  };
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <ModalWrapper
      parentStyle="z-[9990] fixed top-0 left-0 after:backdrop-blur bg-zinc-900/70 flex items-center justify-center"
      childrenStyle={`${isLogin ? 'overflow-hidden' : 'overflow-scroll'} relative z-[9999] flex flex-col items-center justify-center w-full sm:w-[547px] ${isLogin ? 'h-[500px]' : 'h-[775px]'} rounded-lg bg-white px-[24px] py-[42px] shadow-colorPickerShadow`}
    >
      <FbtButton
        variant="link"
        className="!absolute right-4 top-2 z-10 !p-0"
        onClick={() => setIsLoginModalActive(false)}
      >
        <CloseIcon className="size-8" stroke="#333" />
      </FbtButton>
      <div className="flex w-[547px] items-center justify-center bg-white px-5">
        <h1 className="font-poppins text-2xl font-medium text-primary-1 sxl:text-[40px]">
          {!isLogin ? (
            <span>{t('Create-an-account')}</span>
          ) : (
            <span>{t('Welcome-back')}</span>
          )}
        </h1>
      </div>
      <p className="text-center font-lexend text-base font-light text-neutral-2 sxl:text-lg">
        {t('Empowering-EU-&-EEC')}
      </p>
      {!isLogin ? (
        <form
          onSubmit={createUserRHF.handleSubmit(onCreateAccountFormSubmit)}
          className="mt-6 flex w-full flex-col items-center px-2 sxl:my-12 sxl:px-5"
        >
          <div className="mb-4 flex w-full flex-col items-start sxl:mb-8">
            <label
              className="font-inter text-lg font-normal text-black sxl:text-xl"
              htmlFor="email"
            >
              {t('Email')}
            </label>
            <input
              placeholder="Enter your email"
              className="mt-2 w-full rounded-[10.67px] border-2 border-lightsilver p-3 sxl:py-5"
              id="email"
              type="text"
              {...createUserRHF.register('email')}
            />
            {createUserRHF.formState.errors.email && (
              <div className="mt-2 text-center font-lexend text-base font-normal text-error">
                {createUserRHF.formState.errors.email.message}
              </div>
            )}
          </div>
          <div className="mb-4 w-full flex-col items-start sxl:mb-8">
            <label
              htmlFor="phoneNumber"
              className="font-inter text-lg font-normal text-black sxl:text-xl"
            >
              {t('Phone-Number')}
            </label>
            <Controller
              name="phoneNumber"
              control={createUserRHF.control}
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
                  className="mt-2"
                />
              )}
            />
            {createUserRHF.formState.errors.phoneNumber && (
              <p className="mt-2 font-lexend text-base font-normal text-error">
                {createUserRHF.formState.errors.phoneNumber.message}
              </p>
            )}
          </div>
          <div className="mb-4 flex w-full flex-col items-start sxl:mb-8">
            <label
              className="font-inter text-lg font-normal text-black sxl:text-xl"
              htmlFor="preferredLanguage"
            >
              {t('Preferred-language-of-communication')}
            </label>
            <Controller
              name="preferredLanguage"
              control={createUserRHF.control}
              defaultValue={
                selectedOption?.label
                  ? selectedOption
                  : { label: '', value: '' }
              }
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder={<div>Type to search</div>}
                  className="mt-2 w-full"
                  options={languageList}
                  onChange={(value) => {
                    setSelectedOption(value);
                    field.onChange(value);
                  }}
                />
              )}
            />
            {createUserRHF.formState.errors.preferredLanguage && (
              <div className="mt-1 text-start font-lexend text-base font-normal text-error">
                {createUserRHF.formState.errors.preferredLanguage.message}
              </div>
            )}
          </div>
          <div className="mb-4 flex items-center">
            <span className="font-lexend text-lg font-normal text-primary-2 sxl:text-xl">
              {t('Already-have-an-account')}
            </span>
            <button
              type="button"
              className="ml-1 underline decoration-primary-2 underline-offset-4"
              onClick={() => setIsLogin(true)}
            >
              <span className="font-lexend text-lg font-medium text-primary-2 sxl:text-xl">
                {t('Login')}
              </span>
            </button>
          </div>
          <FbtButton
            type="submit"
            variant="solid"
            disabled={createUserRHF.formState.isSubmitting}
            className="!h-[64px] !w-full !rounded-[6.4px]"
          >
            {createUserRHF.formState.isSubmitting ? (
              <ClipLoader
                loading={createUserRHF.formState.isSubmitting}
                color="#fff"
                size={30}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              <p className="font-poppins text-lg font-normal text-neutral-7 sxl:text-2xl">
                {t('Get-code-via-sms')}
              </p>
            )}
          </FbtButton>
        </form>
      ) : (
        <form
          onSubmit={loginUserRHF.handleSubmit(onLoginFormSubmit)}
          className="mt-12 flex w-full flex-col items-center px-2 sxl:px-10"
        >
          <div className="mb-8 w-full flex-col items-start">
            <label
              htmlFor="phoneNumber"
              className="font-inter text-lg font-normal text-black sxl:text-xl"
            >
              {t('Phone-Number')}
            </label>
            <Controller
              name="phoneNumber"
              control={loginUserRHF.control}
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
                  className="mt-2"
                />
              )}
            />
            {loginUserRHF.formState.errors.phoneNumber && (
              <p className="mt-2 font-lexend text-base font-normal text-error">
                {loginUserRHF.formState.errors.phoneNumber.message}
              </p>
            )}
          </div>
          <div className="mb-4 flex items-center justify-center">
            <span className="font-lexend text-base font-normal text-primary-2">
              {t('Dont-have-an-account')}
            </span>
            <button
              type="button"
              className="ml-1 underline decoration-primary-2 underline-offset-4"
              onClick={() => router.push('/book-procedure')}
            >
              <span className="font-lexend text-base font-medium text-primary-2">
                {t('Book-a-procedure-first')}
              </span>
            </button>
          </div>
          <FbtButton
            type="submit"
            variant="solid"
            disabled={loginUserRHF.formState.isSubmitting}
            className="!h-[64px] !w-full !rounded-[6.4px]"
          >
            {loginUserRHF.formState.isSubmitting ? (
              <ClipLoader
                loading={loginUserRHF.formState.isSubmitting}
                color="#fff"
                size={30}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              <p className="font-poppins text-lg font-normal text-neutral-7 sxl:text-2xl">
                {t('Get-code-via-sms')}
              </p>
            )}
          </FbtButton>
        </form>
      )}
    </ModalWrapper>
  );
};

export { CreateAccount };
