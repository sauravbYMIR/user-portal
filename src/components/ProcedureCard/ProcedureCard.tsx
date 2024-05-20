'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

const ApplicationStatusRenderer = ({ status }: { status: string }) => {
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
            Request accepted
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
            Request rejected
          </p>
        </div>
      );
    case 'pending':
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
            Application sent
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
            Form submitted
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
            Form pending
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
  return (
    <button
      type="button"
      className="flex w-full cursor-pointer flex-col items-start rounded-xl border border-neutral-6 px-9 py-[33px] sm:w-[834px]"
      style={{
        boxShadow: '2px 2px 4px 1px rgba(9, 111, 144, 0.1)',
      }}
      onClick={() => router.push(`profile/${bookingId}`)}
    >
      <div className="flex w-full flex-col items-start">
        <div className="flex w-full items-center justify-between">
          <h3 className="font-poppins text-2xl font-medium text-neutral-1">
            {procedureName}
          </h3>
          <p className="font-lexend text-base font-normal text-neutral-2">
            Hospital stay
          </p>
        </div>
        <div className="flex w-full items-center justify-between">
          <div>
            <span className="mr-2 font-lexend text-base font-light text-neutral-2">
              {hospitalName}
            </span>
            -----
            <span className="ml-2 font-lexend text-base font-light text-neutral-2">
              {city},
            </span>
            <span className="font-lexend text-base font-light text-neutral-2">
              {country}
            </span>
          </div>
          <span className="font-lexend text-base font-light text-neutral-2">
            {hospitalStay} days
          </span>
        </div>
      </div>
      <div className="mt-[45px] flex w-full items-center justify-between">
        <div className="flex items-center gap-3">
          <ApplicationStatusRenderer status={applicationStatus} />
          <ElfSightStatusRenderer
            applicationStatus={applicationStatus}
            elfSightStatus={elfSightStatus}
          />
        </div>
        <div className="flex flex-col items-end">
          <span className="font-lexend text-base font-normal text-neutral-2">
            Wait time
          </span>
          <span className="font-lexend text-base font-light text-neutral-2">
            {waitTime} days
          </span>
        </div>
      </div>
    </button>
  );
};

export { ProcedureCard };
