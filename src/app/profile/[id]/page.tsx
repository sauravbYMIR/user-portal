/* eslint-disable tailwindcss/no-custom-classname */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

import { FacebookStyleLoader } from '@/components/Loader/FacebookStyleLoader';
import { updateElfsightStatus, useGetBookingDetails } from '@/hooks/useBooking';
import backArrow from '@/public/assets/icons/backArrow.svg';
import { handleGetLocalStorage } from '@/utils/global';

import style from '../../hospital/[id]/style.module.scss';

function HospitalDetailsPage({ params }: { params: { id: string } }) {
  const [isMounted, setIsMounted] = React.useState<boolean>(false);
  const bookingDetails = useGetBookingDetails(params.id);
  const userId = handleGetLocalStorage({ tokenKey: 'user_id' });
  const router = useRouter();
  React.useEffect(() => {
    setTimeout(() => {
      if (typeof window !== undefined) {
        window.document.addEventListener('elfsight-on-submit', () => {
          updateElfsightStatus({
            bookingId: params.id,
            status: true,
            userId: userId ?? '',
          });
        });
      }
    }, 0);
  }, [params.id, userId]);
  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <div className={style.hospitalDetailPageContainer}>
      {!bookingDetails.isLoading &&
        bookingDetails.data &&
        bookingDetails.data.data && (
          <div>
            {!bookingDetails.data.data.elfSightFormSubmitStatus && (
              <div
                // TODO: CHANGE LANG
                className={`elfsight-app-${bookingDetails.data.data.elfSightScript.en}`}
                data-elfsight-app-lazy
              />
            )}
          </div>
        )}
      <button
        type="button"
        className="cursor-pointer"
        onClick={() => router.back()}
      >
        <Image src={backArrow} alt="back arrow icon" />
      </button>

      {bookingDetails.isLoading ? (
        <FacebookStyleLoader />
      ) : (
        <>
          <div className={style.headerSection}>
            <div className={style.titleContainer}>
              <div className={style.titleBreadCrumbContainer}>
                {bookingDetails.isSuccess && bookingDetails.data.data && (
                  <h3>{bookingDetails.data.data.procedureName.en}</h3>
                )}

                {bookingDetails.isSuccess && bookingDetails.data.data && (
                  <div className={style.breadcrumb}>
                    <Link href="/">Orthopedic department</Link>
                    <span>/</span>
                    <Link href="/">Procedure details</Link>
                  </div>
                )}
              </div>
            </div>
          </div>
          {!bookingDetails.data.data.elfSightFormSubmitStatus && (
            <div className="mb-[47px] mt-[62px] w-full items-center justify-between rounded-[6.4px] border border-neutral-7 bg-neutral-7 px-9 py-[34px] sm:flex">
              <span className="w-[90%] font-poppins text-xl font-normal text-neutral-1">
                Your application has been approved by PSH Hospitall, please
                complete the information capture form to continue with the
                booking process
              </span>
              <button
                type="button"
                className="mt-2 w-full rounded-[6.4px] bg-primary-1 py-4 font-poppins text-2xl font-normal text-white sm:mt-0 sm:w-[348px]"
                data-elfsight-show-form={`${bookingDetails.data.data.elfSightScript.en}`}
              >
                Add case details
              </button>
            </div>
          )}
          {bookingDetails.isSuccess && bookingDetails.data.data && (
            <div className="grid grid-cols-2 gap-20">
              <div className="flex flex-col items-start justify-start">
                <p className="font-lexend text-xl font-normal text-neutral-2">
                  Cost of procedure
                </p>
                <p className="font-lexend text-base font-light text-neutral-2">
                  {bookingDetails.data.data.costOfProcedure.en}
                </p>
              </div>
              <div className="flex flex-col items-start justify-start">
                <p className="font-lexend text-xl font-normal text-neutral-2">
                  Wait of procedure
                </p>
                <p className="font-lexend text-base font-light text-neutral-2">
                  {bookingDetails.data.data.waitTime}
                </p>
              </div>
              <div className="flex flex-col items-start justify-start">
                <p className="font-lexend text-xl font-normal text-neutral-2">
                  Duration of city stay
                </p>
                <p className="font-lexend text-base font-light text-neutral-2">
                  {bookingDetails.data.data?.stayInCity ?? 8}
                </p>
              </div>
              <div className="flex flex-col items-start justify-start">
                <p className="font-lexend text-xl font-normal text-neutral-2">
                  Duration of hospital stay
                </p>
                <p className="font-lexend text-base font-light text-neutral-2">
                  {bookingDetails.data.data.hospitalStay}
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default HospitalDetailsPage;
