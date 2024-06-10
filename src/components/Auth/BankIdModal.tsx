import axios from 'axios';
import Image from 'next/image';
import React from 'react';
import { toast } from 'sonner';

import useTranslation from '@/hooks/useTranslation';
import { useAppStore } from '@/libs/store';
import { countryData } from '@/utils/global';

import { CloseIcon } from '../Icons/Icons';
import { ModalWrapper } from '../ModalWrapper/ModalWrapper';
import { FbtButton } from '../ui';

const BankIdModal = () => {
  const { t } = useTranslation();
  const { setIsBankIdModalActive, selectedPhoneNumber } = useAppStore();
  const handleCallBankId = async ({
    workflowId,
    countryCode,
  }: {
    workflowId: string;
    countryCode: string;
  }) => {
    try {
      await axios.post(
        `https://api.bits.bi/applications`,
        {
          workflowId,
          countryCode: countryCode.toLocaleUpperCase(),
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.BANK_CLIENT_SECRET}`,
          },
        },
      );
    } catch (e) {
      toast.error('BankId service error');
    }
  };
  return (
    <ModalWrapper
      parentStyle="z-[9990] fixed top-0 left-0 after:backdrop-blur bg-zinc-900/70 flex items-center justify-center"
      childrenStyle="overflow-scroll relative z-[9999] flex flex-col items-center justify-center rounded-lg bg-white px-12 py-[42px] shadow-colorPickerShadow"
    >
      <FbtButton
        variant="link"
        className="!absolute !right-4 !top-2 !p-0"
        onClick={() => setIsBankIdModalActive(false)}
      >
        <CloseIcon className="size-10" stroke="#333" />
      </FbtButton>
      <h1 className="font-poppins text-3xl font-medium text-primary-1 sxl:text-5xl">
        {t('Select-an-electronic-ID')}
      </h1>
      <p className="text-center font-lexend text-lg font-light text-neutral-2 sxl:text-xl">
        {t('A-6-digit-code-has-been-sent-to')} {selectedPhoneNumber}
      </p>
      <div className="mt-12 w-4/5 rounded-lg border border-neutral-6 bg-neutral-7 px-4 py-5">
        <div className="flex flex-col items-start gap-y-5">
          {countryData.map((countryInfo) => (
            <button
              type="button"
              className="flex cursor-pointer items-center gap-x-4"
              key={countryInfo.countryCode}
              onClick={() =>
                handleCallBankId({
                  workflowId: countryInfo.workflowId,
                  countryCode: countryInfo.countryCode,
                })
              }
            >
              <Image
                src={countryInfo.bankIdIcon}
                alt={countryInfo.countryCode}
                width={60}
                height={60}
                className="rounded-lg border border-neutral-7"
              />
              <div className="flex flex-col items-start gap-y-2">
                <p className="font-poppins text-xl font-medium text-neutral-1">
                  {countryInfo.name}
                </p>
                <p className="font-lexend text-base font-normal text-neutral-2">
                  Use bankID-app
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </ModalWrapper>
  );
};

export default BankIdModal;
