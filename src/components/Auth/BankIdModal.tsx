import parsePhoneNumberFromString from 'libphonenumber-js';
import Image from 'next/image';
import React from 'react';
import { SyncLoader } from 'react-spinners';
import { toast } from 'sonner';

import { initBankId } from '@/hooks/useAuth';
import useTranslation from '@/hooks/useTranslation';
import { useAppStore } from '@/libs/store';
import {
  bankIdModalMsg,
  countryData,
  handleGetLocalStorage,
  handleRemoveFromLocalStorage,
} from '@/utils/global';

import { CloseIcon } from '../Icons/Icons';
import { ModalWrapper } from '../ModalWrapper/ModalWrapper';
import { FbtButton } from '../ui';

const BankIdSelectContainer = ({
  countryCode,
  isBankIdInitLoading,
  bankIdIcon,
  setIsBankIdInitLoading,
  name,
}: {
  countryCode: string;
  isBankIdInitLoading: boolean;
  bankIdIcon: string;
  setIsBankIdInitLoading: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
}) => {
  const handleCallBankId = async ({ cc }: { cc: string }) => {
    setIsBankIdInitLoading(true);
    try {
      const r = await initBankId({ countryCode: cc.toUpperCase() });
      if (r.success) {
        window.open(r.bankIdUrl, '_blank', 'noopener,noreferrer');
      }
    } catch (e) {
      const err = e as unknown as {
        response: { status: number; data: { message: string } };
      };
      toast.error(`${err.response.data.message || 'Bits error'}`);
    } finally {
      setIsBankIdInitLoading(false);
    }
  };
  return (
    <button
      type="button"
      className={`flex ${isBankIdInitLoading ? 'cursor-not-allowed' : 'cursor-pointer'} items-center gap-x-6`}
      key={countryCode}
      onClick={() =>
        handleCallBankId({
          cc: countryCode,
        })
      }
      disabled={isBankIdInitLoading}
    >
      <Image
        src={bankIdIcon}
        alt={countryCode}
        width={60}
        height={60}
        className="rounded-lg border border-neutral-7"
      />
      <div className="flex flex-col items-start gap-y-2">
        <p className="font-onsite text-xl font-medium text-neutral-1">{name}</p>
        <p className="font-onsite text-base font-normal text-neutral-2">
          {bankIdModalMsg[countryCode as keyof typeof bankIdModalMsg]}
        </p>
      </div>
    </button>
  );
};

const BankIdModal = () => {
  const { t } = useTranslation();
  const { setIsBankIdModalActive } = useAppStore();
  const phoneNumber = handleGetLocalStorage({ tokenKey: 'phone_number' });
  const [isBankIdInitLoading, setIsBankIdInitLoading] =
    React.useState<boolean>(false);
  const countryCodeFromPhonenumber = phoneNumber
    ? parsePhoneNumberFromString(phoneNumber)?.country
    : '';
  const selectedCountry = countryCodeFromPhonenumber
    ? countryData
        .filter(
          (countryInfo) =>
            countryInfo.countryCode.toLowerCase() ===
            countryCodeFromPhonenumber?.toLowerCase(),
        )
        .filter((countryInfo) => !!countryInfo.workflowId)
    : countryData;
  return (
    <ModalWrapper
      parentStyle="z-[9990] fixed top-0 left-0 after:backdrop-blur bg-zinc-900/70 flex items-center justify-center"
      childrenStyle="overflow-scroll relative z-[9999] flex flex-col items-center justify-center rounded-lg bg-white px-12 py-[42px] shadow-colorPickerShadow"
    >
      {isBankIdInitLoading && (
        <div className="pointer-events-none absolute left-0 top-0 flex size-full flex-col items-center justify-center bg-black/70">
          <SyncLoader
            loading={isBankIdInitLoading}
            color="#fff"
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <span className="mt-5 w-3/4 text-center font-onsite text-base font-normal text-white">
            {t('Please-wait-while-we-redirect-you-to-bankid-verification')}
          </span>
        </div>
      )}
      <FbtButton
        variant="link"
        className="!absolute !right-4 !top-2 !p-0"
        onClick={() => {
          handleRemoveFromLocalStorage({ tokenKey: 'bits_access_token' });
          setIsBankIdModalActive(false);
        }}
      >
        <CloseIcon className="size-8" stroke="#333" />
      </FbtButton>
      <h1 className="font-onsite text-3xl font-medium text-primary-1 sxl:text-5xl">
        {t('Select-an-electronic-ID')}
      </h1>
      <div className="mt-12 w-[90%] rounded-lg border border-neutral-6 bg-neutral-7 px-4 py-5">
        <div className="flex flex-col items-start gap-y-5">
          {selectedCountry.length > 0
            ? selectedCountry.map((countryInfo) => (
                <BankIdSelectContainer
                  key={countryInfo.countryCode}
                  countryCode={countryInfo.countryCode}
                  isBankIdInitLoading={isBankIdInitLoading}
                  bankIdIcon={countryInfo.bankIdIcon}
                  setIsBankIdInitLoading={setIsBankIdInitLoading}
                  name={countryInfo.name}
                />
              ))
            : countryData
                .filter((countryInfo) => !!countryInfo.workflowId)
                .map((countryInfo) => (
                  <BankIdSelectContainer
                    key={countryInfo.countryCode}
                    countryCode={countryInfo.countryCode}
                    isBankIdInitLoading={isBankIdInitLoading}
                    bankIdIcon={countryInfo.bankIdIcon}
                    setIsBankIdInitLoading={setIsBankIdInitLoading}
                    name={countryInfo.name}
                  />
                ))}
        </div>
      </div>
    </ModalWrapper>
  );
};

export default BankIdModal;
