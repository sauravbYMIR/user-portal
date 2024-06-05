/* eslint-disable tailwindcss/no-custom-classname */

'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

import { BackArrowIcon } from '@/components/Icons/Icons';
import { FacebookStyleLoader } from '@/components/Loader/FacebookStyleLoader';
import type { ApplicationBookingStatusType } from '@/hooks/useBooking';
import { updateElfsightStatus, useGetBookingDetails } from '@/hooks/useBooking';
import useTranslation from '@/hooks/useTranslation';
import type { LocaleType } from '@/types/component';
import {
  convertToValidCurrency,
  countryData,
  handleGetLocalStorage,
} from '@/utils/global';

import style from '../../hospital/[id]/style.module.scss';

const BookingStatus = ({
  status,
}: {
  status: ApplicationBookingStatusType;
}) => {
  switch (status) {
    case 'accepted':
      return (
        <span className="w-4/5 font-poppins text-xl font-normal text-neutral-1">
          Your application has been approved by PSH Hospitall, please complete
          the information capture form to continue with the booking process
        </span>
      );
    case 'rejected':
      return (
        <span className="w-4/5 font-poppins text-xl font-normal text-neutral-1">
          Your application has been declined by PSH Hospital, please apply to
          different hospital that offers the same procedure
        </span>
      );
    case 'requested':
      return (
        <span className="w-4/5 font-poppins text-xl font-normal text-neutral-1">
          Your application has been sent to PSH Hospital, after the hospital
          accepts your request, you will be notified of your status and must
          fill up your declaration form
        </span>
      );

    default:
      return <div />;
  }
};

const BookingStatusButton = ({
  status,
}: {
  status: ApplicationBookingStatusType;
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  switch (status) {
    case 'accepted':
      return (
        <button
          type="button"
          className="mt-2 w-full rounded-[6.4px] bg-primary-1 py-4 font-poppins text-2xl font-normal text-white sm:mt-0 sm:w-[348px]"
          data-elfsight-show-form="00e19ab8-b869-460e-ac3c-0aa9cbf597fb"
        >
          {t('Add-case-details')}
        </button>
      );

    case 'rejected':
      return (
        <button
          type="button"
          className="mt-2 w-full rounded-[6.4px] bg-primary-1 py-4 font-poppins text-2xl font-normal text-white sm:mt-0 sm:w-[348px]"
          onClick={() => router.push('/book-procedure')}
        >
          {t('Apply-for-another-procedure')}
        </button>
      );

    case 'requested':
      return <div />;

    default:
      return <div />;
  }
};

const BookingStatusText = {
  accepted: 'Application accepted',
  rejected: 'Application rejected',
  requested: 'Application requested',
};

function HospitalDetailsPage({ params }: { params: { id: string } }) {
  const [isMounted, setIsMounted] = React.useState<boolean>(false);
  const bookingDetails = useGetBookingDetails(params.id);
  const router = useRouter();
  React.useEffect(() => {
    setTimeout(() => {
      if (typeof window !== undefined) {
        window.document.addEventListener('elfsight-on-submit', () => {
          updateElfsightStatus({
            bookingId: params.id,
            status: true,
          });
        });
      }
    }, 0);
  }, [params.id]);
  const { t } = useTranslation();
  const selectedLanguage = (handleGetLocalStorage({
    tokenKey: 'selected_language',
  }) ?? 'en') as LocaleType;
  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  const selectedLanguageFromUserDropdown = handleGetLocalStorage({
    tokenKey: 'selected_language',
  });
  const countryInfo = countryData.find((c) => c.locale === selectedLanguage);
  return (
    <div className={style.hospitalDetailPageContainer}>
      {!bookingDetails.isLoading &&
        bookingDetails.data &&
        bookingDetails.data.data && (
          <div>
            {!bookingDetails.data.data.elfSightFormSubmitStatus && (
              <div>
                {bookingDetails.data.data?.elfSightScript && (
                  <div
                    className={`elfsight-app-${bookingDetails.data.data?.elfSightScript[selectedLanguage]}`}
                    data-elfsight-app-lazy
                  />
                )}
              </div>
            )}
          </div>
        )}
      <button
        type="button"
        className="cursor-pointer"
        onClick={() => router.back()}
      >
        <span style={{ display: 'none' }}>back arrow</span>
        <BackArrowIcon strokeWidth="2" stroke="rgba(17, 17, 17, 0.8)" />
      </button>

      {bookingDetails.isLoading ? (
        <FacebookStyleLoader />
      ) : (
        <>
          <div className={style.headerSection}>
            <div className={style.titleContainer}>
              <div className={style.titleBreadCrumbContainer}>
                {bookingDetails.isSuccess && bookingDetails.data.data && (
                  <h3>
                    {bookingDetails.data.data.procedureName[selectedLanguage]}
                  </h3>
                )}

                {bookingDetails.isSuccess && bookingDetails.data.data && (
                  <div className="mt-[14.5px] flex items-center gap-x-2">
                    <Link
                      href="/my-procedures"
                      className="font-lexend text-base font-normal text-neutral-3"
                    >
                      My procedures
                    </Link>
                    <span>/</span>
                    <Link
                      href={`/my-procedures/${params.id}`}
                      className="font-lexend text-base font-normal text-primary-2"
                    >
                      Procedure details
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
          {bookingDetails.data &&
            bookingDetails.data.data &&
            !bookingDetails.data.data.elfSightFormSubmitStatus && (
              <div className="mb-[47px] mt-[62px] w-full items-center justify-between rounded-[6.4px] border border-primary-3 bg-neutral-7 px-[32px] py-[45px] text-neutral-1 sm:flex">
                <BookingStatus
                  status={bookingDetails.data.data.applicationStatus}
                />
                <BookingStatusButton
                  status={bookingDetails.data.data.applicationStatus}
                />
              </div>
            )}
          {bookingDetails.isSuccess && bookingDetails.data.data && (
            <div className="grid grid-cols-2 gap-x-6 gap-y-12">
              <div className="flex flex-col items-start justify-start">
                <p className="mb-3 font-lexend text-xl font-light text-neutral-2">
                  {t('Hospital-name')}
                </p>
                <p className="font-lexend text-2xl font-normal text-neutral-1">
                  {bookingDetails.data.data.hospitalName}
                </p>
              </div>
              <div className="flex flex-col items-start justify-start">
                <p className="mb-3 font-lexend text-xl font-light text-neutral-2">
                  {t('Application-status')}
                </p>
                <p className="font-lexend text-2xl font-normal text-neutral-1">
                  {
                    BookingStatusText[
                      bookingDetails.data.data.applicationStatus
                    ]
                  }
                </p>
              </div>
              <div className="flex flex-col items-start justify-start">
                <p className="mb-3 font-lexend text-xl font-light text-neutral-2">
                  {t('Hospital-stay')}
                </p>
                <p className="font-lexend text-2xl font-normal text-neutral-1">
                  {bookingDetails.data.data.hospitalStay} Days
                </p>
              </div>
              <div className="flex flex-col items-start justify-start">
                <p className="mb-3 font-lexend text-xl font-light text-neutral-2">
                  {t('Wait-time')}
                </p>
                <p className="font-lexend text-2xl font-normal text-neutral-1">
                  {bookingDetails.data.data.waitTime} Days
                </p>
              </div>
              <div className="flex flex-col items-start justify-start">
                <p className="mb-3 font-lexend text-xl font-light text-neutral-2">
                  {t('Cost-of-procedure')}
                </p>
                <p className="font-lexend text-2xl font-normal text-neutral-1">
                  {convertToValidCurrency({
                    price: bookingDetails.data.data.costOfProcedure.price,
                    locale: selectedLanguageFromUserDropdown ?? 'en',
                    currency: bookingDetails.data.data.costOfProcedure.currency,
                  })}
                </p>
              </div>
              <div className="flex flex-col items-start justify-start">
                <p className="mb-3 font-lexend text-xl font-light text-neutral-2">
                  {t('Reimbursement-offered')}
                </p>
                <p className="font-lexend text-2xl font-normal text-neutral-1">
                  {countryInfo ? (
                    <span>
                      {convertToValidCurrency({
                        price:
                          bookingDetails.data.data.reimbursementCost[
                            countryInfo.countryCode as keyof typeof bookingDetails.data.data.reimbursementCost
                          ],
                        locale: countryInfo.locale ?? 'en',
                        currency: countryInfo.currency,
                      })}
                    </span>
                  ) : (
                    <span>---</span>
                  )}
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
