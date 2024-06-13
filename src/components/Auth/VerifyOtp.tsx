import { useRouter } from 'next/navigation';
import React from 'react';
import { ClipLoader } from 'react-spinners';
import { toast } from 'sonner';

import { getBankIdStatus, resendOtp, verifyOtp } from '@/hooks/useAuth';
import useTranslation from '@/hooks/useTranslation';
import { useAppStore } from '@/libs/store';
import { handleGetLocalStorage, handleSetLocalStorage } from '@/utils/global';

import { CloseIcon } from '../Icons/Icons';
import { ModalWrapper } from '../ModalWrapper/ModalWrapper';
import { FbtButton } from '../ui';
import OTPInputWrapper from './OtpInputWrapper';

function Timer({
  time,
  msg,
  setIsShowTimer,
}: {
  time: number;
  msg: string;
  setIsShowTimer: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  // currently supports time in only seconds
  const [reqTime, setReqTime] = React.useState(time);

  React.useEffect(() => {
    let cleanup: string | number | NodeJS.Timeout | undefined;
    if (reqTime === 0) {
      setIsShowTimer(false);
    }
    if (reqTime > 0) {
      cleanup = setInterval(() => {
        setReqTime((prevState) => prevState - 1);
      }, 1000);
    }

    return () => {
      clearInterval(cleanup);
    };
  }, [reqTime, setIsShowTimer]);

  return (
    <p className="my-2 ml-2 font-poppins text-sm font-normal text-darkgray sxl:my-9">
      {msg}{' '}
      <span className="text-primary-2">
        00 : {reqTime === 0 ? '00' : reqTime}
      </span>
    </p>
  );
}

const VerifyOtp = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const {
    setIsOtpVerifyModalActive,
    selectedHospital,
    selectedPhoneNumber,
    setIsBankIdModalActive,
  } = useAppStore();
  const [isShowTimer, setIsShowTimer] = React.useState<boolean>(false);
  const [otp, setOtp] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isResendOtpLoader, setIsResendOtpLoader] =
    React.useState<boolean>(false);
  const handleResendOtp = async () => {
    setIsResendOtpLoader(true);
    setIsShowTimer(true);
    const token = handleGetLocalStorage({ tokenKey: 'otp_verify_token' });
    if (!token) {
      toast.error('Token not found, please try again');
      return;
    }
    try {
      const response = await resendOtp(token);
      if (response.success) {
        setIsResendOtpLoader(false);
        toast.success('Please check your phone for new otp');
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
        const r = await getBankIdStatus();
        if (r.success && !r.bankIdStatus) {
          setIsBankIdModalActive(true);
          return;
        }
        if (selectedHospital) {
          router.push(`/hospital/${selectedHospital}`);
        }
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
      <h1 className="font-poppins text-3xl font-medium text-primary-1 sxl:text-5xl">
        {t('Verify-with-OTP')}
      </h1>
      <p className="text-center font-lexend text-lg font-light text-neutral-2 sxl:text-xl">
        {t('A-6-digit-code-has-been-sent-to')} {selectedPhoneNumber}
      </p>
      <div className="mt-6 flex flex-col items-start sxl:mt-12">
        <p className="mb-2 font-lexend text-xl font-light">OTP</p>
        <OTPInputWrapper otp={otp} setOtp={setOtp} />
        <div className="my-6 flex w-full items-center justify-center sxl:mt-12">
          {isShowTimer ? (
            <Timer
              msg="Resend OTP in"
              time={60}
              setIsShowTimer={setIsShowTimer}
            />
          ) : (
            <>
              <span className="font-poppins text-sm font-normal text-primary-2 sxl:text-xl">
                {t('Didnt-receive-OTP')}
              </span>
              <button
                type="button"
                className="ml-1 underline decoration-primary-2 underline-offset-4"
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
                  <span className="font-poppins text-base font-medium text-primary-2 sxl:text-xl">
                    {t('Resend')}
                  </span>
                )}
              </button>
            </>
          )}
        </div>
        <FbtButton
          type="submit"
          variant="solid"
          disabled={isLoading}
          className="!w-full !rounded-[6.4px] px-4 py-5 sxl:!px-6 sxl:!py-7"
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
            <p className="font-poppins text-lg font-normal text-neutral-7 sxl:text-2xl">
              {t('Verify-code')}
            </p>
          )}
        </FbtButton>
      </div>
    </ModalWrapper>
  );
};

export { VerifyOtp };
