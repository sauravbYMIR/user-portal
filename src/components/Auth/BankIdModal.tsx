import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

import useTranslation from '@/hooks/useTranslation';
import { useAppStore } from '@/libs/store';
import {
  countryData,
  handleGetLocalStorage,
  handleRemoveFromLocalStorage,
  handleSetLocalStorage,
} from '@/utils/global';

import { CloseIcon } from '../Icons/Icons';
import { ModalWrapper } from '../ModalWrapper/ModalWrapper';
import { FbtButton } from '../ui';

const BankIdModal = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { setIsBankIdModalActive } = useAppStore();
  const generateBitsToken = async () => {
    const clientId = process.env.BANK_CLIENT_ID;
    const clientSecret = process.env.BANK_CLIENT_SECRET;
    try {
      handleRemoveFromLocalStorage({ tokenKey: 'bits_access_token' });
      const r = await axios.post(
        `https://api.bits.bi/v1/oauth2/token`,
        {
          grant_type: 'client_credentials',
        },
        {
          headers: {
            Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      if (r.data.access_token) {
        handleSetLocalStorage({
          tokenKey: 'bits_access_token',
          tokenValue: r.data.access_token,
        });
      }
    } catch (e) {
      toast.error('BankId service error');
    }
  };
  React.useEffect(() => {
    const bitsAccessToken = handleGetLocalStorage({
      tokenKey: 'bits_access_token',
    });
    if (!bitsAccessToken) {
      generateBitsToken();
    }
  }, []);

  const handleCreateBitsApplication = async ({
    workflowId,
    countryCode,
  }: {
    workflowId: string;
    countryCode: string;
  }) => {
    const bitsAccessToken = handleGetLocalStorage({
      tokenKey: 'bits_access_token',
    });
    try {
      const r = await axios.post(
        `https://api.bits.bi/v1/applications.create`,
        {
          workflowId,
          countryCode: countryCode.toLocaleUpperCase(),
          redirectUrl: 'http://localhost:3001/',
        },
        {
          headers: {
            Authorization: `Bearer ${bitsAccessToken}`,
          },
        },
      );
      if (r.data.sessionToken) {
        handleSetLocalStorage({
          tokenKey: 'bits_session_token',
          tokenValue: r.data.sessionToken,
        });
        handleSetLocalStorage({
          tokenKey: 'bits_session_id',
          tokenValue: r.data.id,
        });
        router.push(`https://nocode.bits.bi?token=${r.data.sessionToken}`);
      }
    } catch (e) {
      const err = e as unknown as {
        response: { status: number; data: { message: string } };
      };
      toast.error(`${err.response.data.message || 'Bits application error'}`);
    }
  };

  const handleCallBankId = async ({
    workflowId,
    countryCode,
  }: {
    workflowId: string;
    countryCode: string;
  }) => {
    try {
      handleCreateBitsApplication({
        workflowId,
        countryCode,
      });
    } catch (e) {
      const err = e as unknown as {
        response: { status: number; data: { message: string } };
      };
      if (err.response.status === 403 || err.response.status === 401) {
        handleRemoveFromLocalStorage({ tokenKey: 'bits_access_token' });
        handleCreateBitsApplication({
          workflowId,
          countryCode,
        });
      }
      toast.error(`${err.response.data.message || 'Bits error'}`);
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
