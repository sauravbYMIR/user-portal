import React from 'react';

const ProcedureCard = ({
  procedureName,
  hospitalName,
  city,
  country,
  hospitalStay,
  applicationStatus,
  waitTime,
}: {
  procedureName: string;
  hospitalName: string;
  city: string;
  country: string;
  hospitalStay: string;
  applicationStatus: string;
  waitTime: string;
}) => {
  return (
    <div
      className="flex w-full flex-col items-start rounded-xl border border-neutral-6 px-9 py-[33px] sm:w-[834px]"
      style={{
        boxShadow: '2px 2px 4px 1px rgba(9, 111, 144, 0.1)',
      }}
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
            <span className="font-lexend text-base font-light text-neutral-2">
              {hospitalName}
            </span>
            -----
            <span className="font-lexend text-base font-light text-neutral-2">
              {city},
            </span>
            <span className="font-lexend text-base font-light text-neutral-2">
              {country}
            </span>
          </div>
          <span className="font-lexend text-base font-light text-neutral-2">
            {hospitalStay}
          </span>
        </div>
      </div>
      <div className="mt-[45px] flex w-full items-center justify-between">
        <div
          style={{ background: 'rgba(254, 240, 199, 1)' }}
          className="rounded-lg px-3 py-2"
        >
          <span
            style={{
              color: 'rgba(220, 104, 3, 1)',
            }}
            className="font-lexend text-sm font-normal"
          >
            {applicationStatus}
          </span>
        </div>
        <div className="flex flex-col items-start">
          <span className="font-lexend text-base font-normal text-neutral-2">
            Wait time
          </span>
          <span className="font-lexend text-base font-normal text-neutral-2">
            {waitTime}
          </span>
        </div>
      </div>
    </div>
  );
};

export { ProcedureCard };
