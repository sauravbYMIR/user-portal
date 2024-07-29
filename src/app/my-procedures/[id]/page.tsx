/* eslint-disable tailwindcss/no-custom-classname */

'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

import { BackArrowIcon } from '@/components/Icons/Icons';
import { FacebookStyleLoader } from '@/components/Loader/FacebookStyleLoader';
import type { ApplicationBookingStatusType } from '@/hooks/useBooking';
import { updateElfsightStatus, useGetBookingDetails } from '@/hooks/useBooking';
import useTranslation from '@/hooks/useTranslation';
import type { LocaleType } from '@/types/component';
import { axiosInstance } from '@/utils/axiosInstance';
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
          Your application has been sent to Hospital, after the hospital accepts
          your request, you will be notified of your status and must fill up
          your declaration form
        </span>
      );
    case 'rejected':
      return (
        <span className="w-4/5 font-poppins text-xl font-normal text-neutral-1">
          Your application has been declined by the Hospital, please apply to
          different hospital that offers the same procedure
        </span>
      );
    case 'requested':
      return (
        <span className="w-4/5 font-poppins text-xl font-normal text-neutral-1">
          Your application has been sent to the Hospital, after the hospital
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
  elfSightScript,
}: {
  status: ApplicationBookingStatusType;
  elfSightScript: string;
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  switch (status) {
    case 'accepted':
      return (
        <button
          type="button"
          className="mt-8 w-full rounded-[6.4px] bg-primary-2 py-4 font-poppins text-base font-normal text-white sm:mt-0 sm:w-[348px] md:mt-2 md:text-2xl"
          data-elfsight-show-form={elfSightScript}
        >
          {t('Add-case-details')}
        </button>
      );
    case 'rejected':
      return (
        <button
          type="button"
          className="mt-8 w-full rounded-[6.4px] bg-primary-2 py-4 font-poppins text-base font-normal text-white sm:mt-0 sm:w-[348px] md:mt-2 md:text-2xl"
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
  const [elfsightSuccess, setElfsightSuccess] = React.useState<boolean>(false);
  const bookingDetails = useGetBookingDetails(params.id);
  const router = useRouter();

  const createNewHubspotTicket = async (tickerDetails: {
    subject: string;
    hs_pipeline_stage: string;
    hs_ticket_priority: string;
    hubspotCompanyId: string;
    hubspotUserId: string;
    country: string;
    gender: string;
    selectedProcedure: string;
    selectedHospital: string;
    periodOfOperation: string;
    email: string;
    phoneNumber: string;
    name: string;
  }) => {
    try {
      await axiosInstance.post(`bookings/hubspot-ticker`, {
        ...tickerDetails,
      });
      setElfsightSuccess(false);
    } catch (e) {
      const err = e as unknown as {
        response: { status: number; data: { message: string } };
      };
      toast.error(
        `${err.response.data.message || 'Error while creating hubspot ticket'}`,
      );
    }
  };

  React.useEffect(() => {
    if (elfsightSuccess) {
      if (bookingDetails.data?.data) {
        createNewHubspotTicket({
          subject: `${bookingDetails.data?.data.procedureName.en}-${bookingDetails.data.data.hospitalName}-${bookingDetails.data.data.user.email}`,
          hs_pipeline_stage: '1',
          hs_ticket_priority: 'HIGH',
          hubspotCompanyId: bookingDetails.data.data.hubspotCompanyId,
          hubspotUserId: bookingDetails.data.data.user.hubspotUserId,
          country: bookingDetails.data.data.claimCountry,
          gender: bookingDetails.data.data.gender,
          selectedProcedure: bookingDetails.data.data.procedureName.en,
          selectedHospital: bookingDetails.data.data.hospitalName,
          periodOfOperation: bookingDetails.data.data.applicationDate,
          email: bookingDetails.data.data.user.email,
          phoneNumber: bookingDetails.data.data.user.phoneNumber,
          name: `${bookingDetails.data.data.user.firstName} ${bookingDetails.data.data.user.lastName}`,
        });
      }
    }
  }, [elfsightSuccess, bookingDetails.data?.data]);

  React.useEffect(() => {
    setTimeout(() => {
      if (typeof window !== undefined) {
        window.document.addEventListener('elfsight-on-submit', () => {
          setElfsightSuccess(true);
          updateElfsightStatus({
            bookingId: params.id,
            status: true,
          });
        });
      }
    }, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <div className="sxl:py-15 mt-3 h-[650px] overflow-y-scroll px-5 sxl:px-[75px]">
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
          <div className="mt-5">
            <div className={style.titleContainer}>
              <div className={style.titleBreadCrumbContainer}>
                {bookingDetails.isSuccess && bookingDetails.data.data && (
                  <h3 className="font-poppins text-xl font-medium text-neutral-1 sxl:text-5xl">
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
          {bookingDetails.data && bookingDetails.data.data && (
            <div className="mb-[47px] mt-[62px] w-full items-center justify-between rounded-[6.4px] border border-primary-3 bg-neutral-7 px-[32px] py-[45px] text-neutral-1 sm:flex">
              <BookingStatus
                status={bookingDetails.data.data.applicationStatus}
              />
              {!bookingDetails.data.data.elfSightFormSubmitStatus && (
                <BookingStatusButton
                  status={bookingDetails.data.data.applicationStatus}
                  elfSightScript={
                    bookingDetails &&
                    bookingDetails.data &&
                    bookingDetails.data.data &&
                    bookingDetails.data.data.elfSightScript
                      ? bookingDetails.data.data.elfSightScript[
                          selectedLanguage
                        ]
                      : ''
                  }
                />
              )}
            </div>
          )}
          {bookingDetails.isSuccess && bookingDetails.data.data && (
            <div className="flex flex-col items-start gap-x-6 gap-y-12 md:grid md:grid-cols-2">
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
