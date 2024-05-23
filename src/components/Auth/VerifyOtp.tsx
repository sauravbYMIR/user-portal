import { useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react';
import { ClipLoader } from 'react-spinners';
import { toast } from 'sonner';

import { resendOtp, verifyOtp } from '@/hooks/useAuth';
import useTranslation from '@/hooks/useTranslation';
import { useAppStore } from '@/libs/store';
import { handleGetLocalStorage, handleSetLocalStorage } from '@/utils/global';

import { CloseIcon } from '../Icons/Icons';
import { ModalWrapper } from '../ModalWrapper/ModalWrapper';
import { FbtButton } from '../ui';
import OTPInputWrapper from './OtpInputWrapper';

const VerifyOtp = () => {
  const { t } = useTranslation();
  const { setIsOtpVerifyModalActive } = useAppStore();
  const searchParams = useSearchParams();
  const phoneNumber = searchParams.get('phonenumber');
  const [otp, setOtp] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isResendOtpLoader, setIsResendOtpLoader] =
    React.useState<boolean>(false);
  const handleResendOtp = async () => {
    setIsResendOtpLoader(true);
    try {
      const response = await resendOtp();
      if (response.success) {
        setIsResendOtpLoader(false);
        toast('Please check your mail for new otp');
      }
    } catch (e) {
      setIsResendOtpLoader(false);
    } finally {
      setIsResendOtpLoader(false);
    }
  };
  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error('Please enter otp to proceed');
      return;
    }
    const token = handleGetLocalStorage({ tokenKey: 'otp_verify_token' });
    if (!token) {
      toast.error('Token not found, please try again');
      return;
    }
    setIsLoading(true);
    try {
      const response = await verifyOtp({
        otp,
        token,
      });
      if (response.success) {
        setIsLoading(false);
        setIsOtpVerifyModalActive(false);
        handleSetLocalStorage({
          tokenKey: 'access_token',
          tokenValue: response.data.accessToken,
        });
        handleSetLocalStorage({
          tokenKey: 'refresh_token',
          tokenValue: response.data.refreshToken,
        });
        handleSetLocalStorage({
          tokenKey: 'user_id',
          tokenValue: response.data.userId,
        });
      }
    } catch (e) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <ModalWrapper
      parentStyle="z-[9990] fixed top-0 left-0 after:backdrop-blur bg-zinc-900/70 flex items-center justify-center"
      childrenStyle="overflow-scroll relative z-[9999] flex flex-col items-center justify-center rounded-lg bg-white px-[24px] py-[42px] shadow-colorPickerShadow"
    >
      <FbtButton
        variant="link"
        className="!absolute !right-4 !top-2 !p-0"
        onClick={() => setIsOtpVerifyModalActive(false)}
      >
        <CloseIcon className="size-10" stroke="#333" />
      </FbtButton>
      <h1 className="font-poppins text-5xl font-medium text-primary-1">
        {t('Verify-with-OTP')}
      </h1>
      <Suspense>
        <p className="text-center font-lexend text-xl font-light text-neutral-2">
          {t('A-6-digit-code-has-been-sent-to')} {phoneNumber}
        </p>
      </Suspense>
      <div className="mt-12 flex flex-col items-start">
        <p className="font-lexend text-xl font-light">OTP</p>
        <OTPInputWrapper otp={otp} setOtp={setOtp} />
        <div className="mb-6 mt-12 flex w-full items-center justify-center">
          <span className="font-poppins text-xl font-normal text-primary-2">
            {t('Didnt-receive-OTP')}
          </span>
          <button
            type="button"
            className="ml-1 underline"
            onClick={handleResendOtp}
            disabled={isResendOtpLoader}
          >
            {isResendOtpLoader ? (
              <ClipLoader
                loading={isResendOtpLoader}
                color="#fff"
                size={10}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              <span className="font-poppins text-xl font-medium text-primary-2">
                {t('Resend')}
              </span>
            )}
          </button>
        </div>
        <FbtButton
          type="submit"
          variant="solid"
          disabled={isLoading}
          className="!h-[64px] !w-full !rounded-[6.4px]"
          onClick={handleVerifyOtp}
        >
          {isLoading ? (
            <ClipLoader
              loading={isLoading}
              color="#fff"
              size={30}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            <p className="font-poppins text-2xl font-normal text-neutral-7">
              {t('Verify-code')}
            </p>
          )}
        </FbtButton>
      </div>
    </ModalWrapper>
  );
};

export { VerifyOtp };
