'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import useTranslation from '@/hooks/useTranslation';

const ApplicationStatusRenderer = ({ status }: { status: string }) => {
  const { t } = useTranslation();
  switch (status) {
    case 'accepted':
      return (
        <div
          style={{
            backgroundColor: 'rgba(230, 237, 255, 1)',
          }}
          className="rounded-lg px-3 py-2"
        >
          <p
            className="font-lexend text-sm font-normal"
            style={{
              color: 'rgba(0, 59, 212, 1)',
            }}
          >
            {t('Request-accepted')}
          </p>
        </div>
      );
    case 'rejected':
      return (
        <div
          style={{
            backgroundColor: 'rgba(253, 237, 237, 1)',
          }}
          className="rounded-lg px-3 py-2"
        >
          <p
            className="font-lexend text-sm font-normal"
            style={{
              color: 'rgba(203, 0, 25, 1)',
            }}
          >
            {t('Request-rejected')}
          </p>
        </div>
      );
    case 'requested':
      return (
        <div
          style={{
            backgroundColor: 'rgba(254, 240, 199, 1)',
          }}
          className="rounded-lg px-3 py-2"
        >
          <p
            className="font-lexend text-sm font-normal"
            style={{
              color: 'rgba(220, 104, 3, 1)',
            }}
          >
            {t('Application-sent')}
          </p>
        </div>
      );
    default:
      return <div />;
  }
};
const ElfSightStatusRenderer = ({
  applicationStatus,
  elfSightStatus,
}: {
  applicationStatus: string;
  elfSightStatus: boolean;
}) => {
  const { t } = useTranslation();
  if (elfSightStatus) {
    if (applicationStatus === 'accepted') {
      return (
        <div
          style={{
            backgroundColor: 'rgba(220, 104, 3, 1)',
          }}
          className="rounded-lg px-3 py-2"
        >
          <p
            className="font-lexend text-sm font-normal"
            style={{
              color: 'rgba(0, 59, 212, 1)',
            }}
          >
            {t('Form-submitted')}
          </p>
        </div>
      );
    }
  }
  return (
    <div>
      {applicationStatus === 'accepted' ? (
        <div
          style={{
            backgroundColor: 'rgba(253, 237, 237, 1)',
          }}
          className="rounded-lg px-3 py-2"
        >
          <p
            className="font-lexend text-sm font-normal"
            style={{
              color: 'rgba(144, 0, 18, 1)',
            }}
          >
            {t('Form-pending')}
          </p>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

const ProcedureCard = ({
  bookingId,
  procedureName,
  hospitalName,
  city,
  country,
  hospitalStay,
  applicationStatus,
  waitTime,
  elfSightStatus,
}: {
  bookingId: string;
  procedureName: string;
  hospitalName: string;
  city: string;
  country: string;
  hospitalStay: string;
  applicationStatus: string;
  waitTime: string;
  elfSightStatus: boolean;
}) => {
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <button
      type="button"
      className="flex w-full cursor-pointer flex-col items-start rounded-xl border border-neutral-6 px-4 py-5 sxl:px-9 sxl:py-[33px] xl:w-[834px]"
      style={{
        boxShadow: '2px 2px 4px 1px rgba(9, 111, 144, 0.1)',
      }}
      onClick={() => router.push(`/my-procedures/${bookingId}`)}
    >
      <div className="flex w-full flex-col items-start">
        <div className="flex w-full items-center justify-between">
          <h3 className="text-start font-poppins text-lg font-medium text-neutral-1 sxl:text-2xl">
            {procedureName}
          </h3>
          <p className="hidden font-lexend text-base font-normal text-neutral-2 sxl:block">
            {t('Hospital-stay')}
          </p>
        </div>
        <div className="flex w-full items-center justify-between">
          <div className="mt-2 flex flex-col items-start gap-x-1 sxl:mt-0 sxl:flex-row sxl:items-center">
            <span className="mr-2 font-lexend text-base font-light text-neutral-2">
              {hospitalName}
            </span>
            <div className="my-1 h-[1.35px] w-[32px] bg-neutral-2 sxl:my-0" />
            <span className="ml-0 font-lexend text-base font-light text-neutral-2 sxl:ml-2">
              {city},
            </span>
            <span className="font-lexend text-base font-light text-neutral-2">
              {country}
            </span>
          </div>
          <span className="hidden font-lexend text-base font-light text-neutral-2 sxl:block">
            {hospitalStay} {t('days')}
          </span>
        </div>
      </div>
      <div className="mt-6 flex w-full items-center justify-between sxl:mt-[45px]">
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-3">
            <ApplicationStatusRenderer status={applicationStatus} />
            <ElfSightStatusRenderer
              applicationStatus={applicationStatus}
              elfSightStatus={elfSightStatus}
            />
          </div>
          <div className="mt-7 flex items-center gap-x-14 sxl:hidden">
            <div className="flex flex-col items-start gap-y-2">
              <h3 className="font-lexend text-sm font-normal text-neutral-2">
                {t('Hospital-stay')}
              </h3>
              <p className="font-lexend text-sm font-light text-neutral-2">
                {hospitalStay} {t('days')}
              </p>
            </div>
            <div className="flex flex-col items-start gap-y-2">
              <h3 className="font-lexend text-sm font-normal text-neutral-2">
                {t('Wait-time')}
              </h3>
              <p className="font-lexend text-sm font-light text-neutral-2">
                {waitTime} {t('days')}
              </p>
            </div>
          </div>
        </div>
        <div className="hidden flex-col items-end sxl:flex">
          <span className="font-lexend text-base font-normal text-neutral-2">
            {t('Wait-time')}
          </span>
          <span className="font-lexend text-base font-light text-neutral-2">
            {waitTime} {t('days')}
          </span>
        </div>
      </div>
    </button>
  );
};

export { ProcedureCard };
