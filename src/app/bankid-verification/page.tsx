'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { BarLoader } from 'react-spinners';
import { toast } from 'sonner';

import BankIdModal from '@/components/Auth/BankIdModal';
import { ModalWrapper } from '@/components/ModalWrapper/ModalWrapper';
import { FbtButton } from '@/components/ui';
import { useVerifyBankId } from '@/hooks/useAuth';
import useTranslation from '@/hooks/useTranslation';
import { useAppStore } from '@/libs/store';
import { handleGetLocalStorage } from '@/utils/global';

const BankIdVerification = () => {
  const router = useRouter();
  const verifyBankIdStatus = useVerifyBankId();
  const { t } = useTranslation();
  const { setIsBankIdModalActive, isBankIdModalActive } = useAppStore();
  React.useEffect(() => {
    if (verifyBankIdStatus.data?.isBankIdVerify) {
      const selectedHospital = handleGetLocalStorage({
        tokenKey: 'selected_hospital',
      });
      if (!selectedHospital) {
        toast.info(
          'Booking data not found, please wait while we are restarting the process',
        );
        setTimeout(() => {
          router.push('/');
        }, 1000);
        return;
      }
      router.push(`/hospital/${selectedHospital}`);
    }
  }, [verifyBankIdStatus.data?.isBankIdVerify, router]);

  return (
    <ModalWrapper
      parentStyle="z-[9990] fixed top-0 left-0 after:backdrop-blur bg-zinc-900/40 flex items-center justify-center"
      childrenStyle="overflow-scroll relative z-[9999] flex flex-col items-center justify-center rounded-lg bg-white px-12 py-[42px] shadow-colorPickerShadow"
    >
      {!verifyBankIdStatus.data?.isBankIdVerify ? (
        <div className="flex w-full flex-col items-center gap-y-8 sxl:w-[500px]">
          <p className="font-poppins text-2xl font-medium">
            {t('Authentication-Failed')}
          </p>
          <div className="flex items-center gap-x-8">
            <FbtButton
              type="submit"
              variant="solid"
              className="!w-full !rounded-[6.4px] !px-6 !py-4"
              onClick={() => setIsBankIdModalActive(true)}
            >
              <p className="font-poppins text-md font-normal text-neutral-7 sxl:text-2xl">
                {t('Retry')}
              </p>
            </FbtButton>
            <FbtButton
              type="submit"
              variant="outline"
              className="!w-full !rounded-[6.4px] !border-2 !border-primary-2 !px-6 !py-4"
              onClick={() => router.push('/')}
            >
              <p className="font-poppins text-lg font-normal text-primary-2 sxl:text-2xl">
                {t('Go-to-home')}
              </p>
            </FbtButton>
          </div>
        </div>
      ) : (
        <div className="flex w-full items-center gap-x-8 sxl:w-[500px]">
          <BarLoader
            loading
            color="#333"
            // size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <p className="font-poppins text-2xl font-medium">
            {t('Please-wait-while-we-redirect-you-to-booking-page')}
          </p>
        </div>
      )}
      {isBankIdModalActive && <BankIdModal />}
    </ModalWrapper>
  );
};

export default BankIdVerification;
