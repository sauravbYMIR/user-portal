/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-nested-ternary */

'use client';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import DatePicker from 'react-datepicker';
import { ClipLoader } from 'react-spinners';
import { toast } from 'sonner';

import BankIdModal from '@/components/Auth/BankIdModal';
import { CreateAccount } from '@/components/Auth/CreateAccount';
import { VerifyOtp } from '@/components/Auth/VerifyOtp';
import {
  CalendarIcon,
  CloseIcon,
  ExternalLinkIcon,
} from '@/components/Icons/Icons';
import { getBankIdStatus } from '@/hooks/useAuth';
import { useCreateBooking } from '@/hooks/useBooking';
import { useClickOutside } from '@/hooks/useClickOutside';
import type { HospitalProcedureByIdType } from '@/hooks/useHospital';
import { useScreenWidth } from '@/hooks/useScreenWidth';
import useTranslation from '@/hooks/useTranslation';
import { useAppStore } from '@/libs/store';
import brand from '@/public/assets/icons/brand.svg';
import type { LocaleType } from '@/types/component';
import {
  BOOKING,
  convertToValidCurrency,
  countryData,
  getMonth,
  handleGetLocalStorage,
  handleSetLocalStorage,
} from '@/utils/global';

function HospitalDetailsPage({
  hospitalProcedureId,
}: {
  hospitalProcedureId: { success: boolean; data: HospitalProcedureByIdType };
}) {
  const { matches } = useScreenWidth(640);
  const selectedLanguage = (handleGetLocalStorage({
    tokenKey: 'selected_language',
  }) ?? 'en') as LocaleType;
  const selectedCountryFromLocalStorage = handleGetLocalStorage({
    tokenKey: 'selected_country',
  });
  const { t } = useTranslation();
  const router = useRouter();
  const {
    setIsLoginModalActive,
    isLoginModalActive,
    isOtpVerifyModalActive,
    isBankIdModalActive,
    setIsBankIdModalActive,
    selectedHospitalName,
    setStepNumber,
  } = useAppStore();
  const accessToken = handleGetLocalStorage({ tokenKey: 'access_token' });
  const createBooking = useCreateBooking({ selectedHospitalName });
  const [isBankidVerificationLoading, setIsBankidVerificationLoading] =
    React.useState<boolean>(false);
  const [startDate, setStartDate] = React.useState<null | Date>(null);
  const [endDate, setEndDate] = React.useState<null | Date>(null);
  const [error, setError] = React.useState<string>('');
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  React.useEffect(() => {
    if (startDate && !endDate) {
      setError('Please select end date');
      return;
    }
    if (startDate && endDate && startDate.getTime() > endDate.getTime()) {
      setError('Start date cannot be greater than end date');
      return;
    }
    if (endDate && startDate) {
      const days = Math.round(
        (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24),
      );
      if (days < 14) {
        setError('Please select a range of minimum 14 days');
        return;
      }
    }
    setError('');
  }, [endDate, startDate]);
  const { selectedProcedure, selectedGender, selectedCountry } = useAppStore();
  const sliderRef = React.useRef<HTMLDivElement | null>(null);
  useClickOutside({
    ref: sliderRef,
    callback: () => {
      setIsOpen(false);
    },
  });

  const handleCreateBooking = () => {
    if (!startDate || !endDate) {
      toast.error('Please select treatment date to continue');
      return;
    }
    createBooking.mutate({
      procedureId: selectedProcedure,
      gender: selectedGender,
      claimCountry: selectedCountry,
      patientPreferredStartDate: startDate,
      patientPreferredEndDate: endDate,
    });
  };
  const handleRequestAppointment = async () => {
    handleSetLocalStorage({ tokenKey: 'flow_type', tokenValue: BOOKING });
    if (!startDate || !endDate) {
      toast.error('Please select treatment date to continue');
      return;
    }
    if (!accessToken) {
      setIsLoginModalActive(true);
      return;
    }
    setIsBankidVerificationLoading(true);
    try {
      const r = await getBankIdStatus();
      setIsBankidVerificationLoading(false);
      if (r.success && !r.bankIdStatus) {
        setIsBankIdModalActive(true);
        return;
      }
    } catch (e) {
      const err = e as unknown as {
        response: { status: number; data: { message: string } };
      };
      toast.error(
        `${err.response.data.message || 'Error-while-bankid-verfication'}`,
      );
    } finally {
      setIsBankidVerificationLoading(false);
    }
    handleCreateBooking();
  };
  return (
    <div className="relative h-screen w-screen">
      {isOpen && (
        <div className="absolute left-0 top-0 h-screen w-full bg-black/50" />
      )}
      <div className="flex size-full flex-col items-center justify-between overflow-y-scroll bg-primary-green px-0 py-9 pb-48 sm:px-12">
        <nav className="flex w-screen items-start justify-between px-5 sm:px-12">
          <button type="button" onClick={() => router.push(`/book-procedure`)}>
            <Image
              src={brand}
              width={matches ? 133.37 : 190.47}
              height={matches ? 32.21 : 46}
              alt="brand-with-name"
            />
            <p className="hidden">brand name</p>
          </button>
          <button
            type="button"
            className="flex items-center gap-x-3"
            onClick={() => {
              setStepNumber(1);
              router.push('/');
            }}
          >
            <span className="font-onsite text-sm font-normal text-dark-green sm:block sm:text-xl">
              {t('Close')}
            </span>
            <div className="flex items-center justify-center rounded-full border-[1.5px] border-dark-green p-1">
              <CloseIcon
                className={matches ? 'size-4' : 'size-8'}
                stroke="rgba(0, 70, 70, 1)"
              />
            </div>
          </button>
        </nav>
        <div className="w-8/12">
          <h3 className="mt-28 text-center font-onsite text-[24px] font-medium text-primary-1 sm:mt-0 sm:text-[32px] sm:leading-12 md:text-5xl md:leading-15">
            {t('Your-procedure')}
          </h3>
        </div>
        <div className="mt-10 flex w-full flex-col rounded-lg bg-base-light px-[22px] pb-12 pt-6 sm:p-[52px]">
          <div className="flex w-full flex-col items-start justify-between sm:flex-row">
            <div className="mb-9 flex flex-col items-start gap-y-1 sm:mb-0 sm:gap-y-4">
              {hospitalProcedureId.success && (
                <h2 className="text-2xl font-medium text-dark-green sm:text-[32px]">
                  {hospitalProcedureId.data.procedure.name[selectedLanguage]
                    ? hospitalProcedureId.data.procedure.name[selectedLanguage]
                    : hospitalProcedureId.data.procedure.name.en}
                </h2>
              )}
              <div className="flex items-center gap-x-1 sm:gap-x-2">
                {hospitalProcedureId.success && (
                  <span className="text-lg font-normal text-dark-green sm:text-xl">
                    {hospitalProcedureId.data.hospital.name}
                  </span>
                )}
                /
                <span className="text-xl font-normal text-dark-green/40">
                  Details
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 sm:justify-end">
              {hospitalProcedureId.success && (
                <div className="flex max-w-[161px] flex-1 flex-col rounded-xl bg-light-purple p-3 sm:w-[161px] sm:p-5">
                  <p className="text-sm font-normal text-accent-purple sm:text-base">
                    {t('Wait-time')}
                  </p>
                  <p className="text-lg font-medium text-accent-purple sm:text-xl">
                    {hospitalProcedureId.data.waitingTime} days
                  </p>
                </div>
              )}
              {hospitalProcedureId.success && (
                <div className="flex max-w-[161px] flex-1 flex-col rounded-xl bg-light-purple p-3 sm:w-[161px] sm:p-5">
                  <p className="text-sm font-normal text-accent-purple sm:text-base">
                    {t('Duration-of-stay')}
                  </p>
                  <p className="text-lg font-medium text-accent-purple sm:text-xl">
                    {hospitalProcedureId.data.stayInCity} days
                  </p>
                </div>
              )}
              {hospitalProcedureId.success && (
                <div className="flex max-w-[161px] flex-1 flex-col rounded-xl bg-light-purple p-3 sm:w-[161px] sm:p-5">
                  <p className="text-sm font-normal text-accent-purple sm:text-base">
                    {t('hospital-stay')}
                  </p>
                  <p className="text-lg font-medium text-accent-purple sm:text-xl">
                    {hospitalProcedureId.data.stayInHospital} days
                  </p>
                </div>
              )}
            </div>
            <div className="mt-2 block w-full sm:hidden">
              <div className="flex w-full flex-col items-start gap-y-3 rounded-xl bg-dark-grey-1 p-5">
                <p className="text-sm font-normal text-black-52 sm:text-base">
                  {t('Your-cost-after-reimbursement')}
                </p>
                <div className="flex w-full items-center justify-between">
                  {hospitalProcedureId.success &&
                    hospitalProcedureId.data.procedure &&
                    hospitalProcedureId.data.procedure.reimbursement && (
                      <p className="text-xl font-medium text-black-52 sm:text-2xl">
                        {convertToValidCurrency({
                          price:
                            hospitalProcedureId.data.procedure.reimbursement[
                              (selectedCountry ||
                                selectedCountryFromLocalStorage) as keyof typeof hospitalProcedureId.data.procedure.reimbursement
                            ],
                          locale: selectedLanguage ?? 'en',
                          currency:
                            countryData.find(
                              (d) => d.locale === selectedLanguage,
                            )?.currency ?? 'EUR',
                        })}
                      </p>
                    )}
                  {/* <QuestionIcon /> */}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 flex w-full flex-col items-start justify-between border-b border-dark-grey-1 pb-9 sm:mt-24 sm:flex-row sm:items-center">
            <div className="flex flex-1 flex-col items-start">
              <h3 className="text-xl font-medium text-dark-green sm:text-2xl">
                {t('About-the-procedure')}
              </h3>
              {hospitalProcedureId.success && (
                <p className="text-lg font-normal text-dark-green sm:text-xl">
                  {hospitalProcedureId.data.description[selectedLanguage]
                    ? hospitalProcedureId.data.description[selectedLanguage]
                    : hospitalProcedureId.data.description.en}
                </p>
              )}
            </div>
            <div className="flex w-full flex-col items-end sm:flex-1">
              <div
                className="flex w-[83%] flex-col items-start gap-y-3 rounded-xl bg-dark-grey-1 p-5"
                style={matches ? { display: 'none' } : { display: 'block' }}
              >
                <p className="text-base font-normal text-black-52">
                  {t('Your-cost-after-reimbursement')}
                </p>
                <div className="flex w-full items-center justify-between">
                  {hospitalProcedureId.success &&
                    hospitalProcedureId.data.procedure &&
                    hospitalProcedureId.data.procedure.reimbursement && (
                      <p className="text-2xl font-medium text-black-52">
                        {convertToValidCurrency({
                          price:
                            hospitalProcedureId.data.procedure.reimbursement[
                              (selectedCountry ||
                                selectedCountryFromLocalStorage) as keyof typeof hospitalProcedureId.data.procedure.reimbursement
                            ],
                          locale: selectedLanguage ?? 'en',
                          currency:
                            countryData.find(
                              (d) => d.locale === selectedLanguage,
                            )?.currency ?? 'EUR',
                        })}
                      </p>
                    )}
                  {/* <QuestionIcon /> */}
                </div>
              </div>
              <div className="mt-10 flex w-full flex-col items-start sm:w-[90%]">
                <h3 className="text-sm font-bold text-dark-green sm:text-base">
                  {t('Procedure-team')}
                </h3>
                {hospitalProcedureId.success && (
                  <div className="flex w-full flex-col items-start gap-x-3">
                    {hospitalProcedureId.data.procedureMembers &&
                      hospitalProcedureId.data.procedureMembers.map((d) => (
                        <div
                          className="flex w-full items-center gap-x-8 rounded-xl py-8 pr-8 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-dark-grey-1"
                          key={d.id}
                        >
                          <Image
                            src={d.profile}
                            alt={d.name}
                            className="rounded-xl"
                            width={matches ? 80 : 102.08}
                            height={matches ? 80 : 102}
                            unoptimized
                            priority
                          />
                          <div className="flex flex-col items-start">
                            <p className="text-xl font-medium text-dark-green sm:text-2xl">
                              {d.name}
                            </p>
                            <p className="text-base font-normal text-dark-green">
                              {d.position[selectedLanguage ?? 'en']}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start py-16">
            <h2 className="text-2xl font-medium text-dark-green">
              {t('About-the-hospital')}
            </h2>
            {hospitalProcedureId.success &&
              hospitalProcedureId.data.hospitalDescription && (
                <p className="text-xl font-normal text-dark-green">
                  {
                    hospitalProcedureId.data.hospitalDescription[
                      selectedLanguage ?? 'en'
                    ]
                  }
                </p>
              )}
            {hospitalProcedureId.success &&
              hospitalProcedureId.data.hospital.externalLink && (
                <a
                  href={`http://${hospitalProcedureId.data.hospital.externalLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 flex items-center gap-x-2"
                >
                  <span className="text-base font-normal text-dark-green">
                    {t('Go-to-the-hospitals-website')}
                  </span>
                  <ExternalLinkIcon
                    className="size-5"
                    stroke="rgba(0, 70, 70, 1)"
                  />
                </a>
              )}
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {hospitalProcedureId.success &&
              hospitalProcedureId.data &&
              hospitalProcedureId.data.hospitalImages &&
              Array.isArray(hospitalProcedureId.data.hospitalImages) &&
              hospitalProcedureId.data.hospitalImages.length > 0 &&
              hospitalProcedureId.data.hospitalImages.map((img) => (
                <div key={img.id} className="h-[404px] rounded-xl">
                  <img
                    key={img.id}
                    src={img.imageUrl}
                    className="size-full overflow-hidden rounded-xl object-cover"
                    alt={img.fileName}
                  />
                </div>
              ))}
          </div>
        </div>
        <div className="fixed bottom-0 flex w-screen items-center justify-between bg-secondary-green px-4 py-[18px] sm:p-8">
          <div className="hidden sm:block">
            <div className="flex flex-col">
              {hospitalProcedureId.success && (
                <h3 className="text-xl font-medium text-white">
                  {
                    hospitalProcedureId.data.procedure.name[
                      selectedLanguage ?? 'en'
                    ]
                  }
                </h3>
              )}
              <p className="text-base font-normal text-white/60">
                {t('Please-select-desired-date-for-procedure')}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-x-4">
            <div
              className={`fixed inset-x-0 bottom-28 z-50 bg-base-light sm:bottom-32 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-[430px] opacity-0'}`}
            >
              <div
                className="flex h-[312px] flex-col items-start justify-between overflow-y-scroll px-6 py-8 sm:flex-row"
                ref={sliderRef}
              >
                <div className="flex h-full flex-col items-start justify-between">
                  <div className="flex flex-col gap-y-2">
                    <h2 className="text-lg font-medium text-dark-green sm:text-xl">
                      {t('When-do-you-want-to-get-your-treatment-done')}
                    </h2>
                    <p className="text-sm font-normal text-dark-green sm:text-base">
                      {t('Select-a-range-of-minimum-14-days')}
                    </p>
                  </div>
                  {startDate &&
                    endDate &&
                    Math.round(
                      (endDate.getTime() - startDate.getTime()) /
                        (1000 * 3600 * 24),
                    ) < 14 && (
                      <p className="text-base font-normal text-bold-red">
                        {t('Select-a-range-of-minimum-14-days')}
                      </p>
                    )}
                </div>
                <div className="mt-6 flex w-full flex-col items-start justify-end gap-x-3 gap-y-4 sm:mt-0 sm:flex-row sm:gap-y-0">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => {
                      if (date) {
                        setStartDate(date);
                        setEndDate(
                          new Date(new Date(date).getTime() + 12096e5),
                        );
                        handleSetLocalStorage({
                          tokenKey: 'start_date',
                          tokenValue: JSON.stringify(date),
                        });
                      }
                    }}
                    minDate={new Date()}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    className="w-full rounded-[10px] bg-base-light px-3 py-4 slg:w-[200px]"
                    inline
                  />
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => {
                      if (date) {
                        setEndDate(date);
                        handleSetLocalStorage({
                          tokenKey: 'end_date',
                          tokenValue: JSON.stringify(date),
                        });
                      }
                    }}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    className="w-full rounded-[10px] bg-base-light px-3 py-4 slg:w-[200px]"
                    inline
                    // rangeColors={['#f33e5b', '#3ecf8e', '#fed14c']}
                  />
                </div>
              </div>
            </div>
            {matches ? (
              <button
                type="button"
                className="flex items-center gap-x-4 rounded-xl bg-base-light px-5 py-4"
                onClick={() => setIsOpen((prevState) => !prevState)}
              >
                <CalendarIcon />
                <div className="flex flex-col items-start">
                  {!(startDate && endDate) && (
                    <span className="text-base font-normal text-dark-green">
                      {t('Select-date')}
                    </span>
                  )}
                  <div className="flex items-start gap-x-2">
                    {startDate && (
                      <span className="text-sm font-medium text-dark-green sm:text-base">
                        {startDate.getDate()}.{getMonth(startDate)}
                      </span>
                    )}
                    {endDate && (
                      <span className="text-sm font-medium text-dark-green sm:text-base">
                        {endDate.getDate()}.{getMonth(endDate)}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="flex items-center gap-x-4 rounded-xl bg-base-light px-5 py-4"
                  onClick={() => setIsOpen((prevState) => !prevState)}
                >
                  <CalendarIcon />
                  <div className="flex w-full flex-col items-start">
                    <span className="text-base font-normal text-dark-green">
                      {t('From')} - {t('To')}
                    </span>
                    <div className="flex w-full items-center gap-x-2">
                      {startDate && (
                        <span className="text-base font-medium text-dark-green">
                          {startDate.getDate()}.{getMonth(startDate)}{' '}
                          {startDate.getFullYear()} -
                        </span>
                      )}
                      {endDate && (
                        <span className="text-base font-medium text-dark-green">
                          {endDate.getDate()}.{getMonth(endDate)}{' '}
                          {endDate.getFullYear()}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
                {/* <button
                  type="button"
                  className="flex items-center gap-x-4 rounded-xl bg-base-light px-5 py-4"
                >
                  <CalendarIcon />
                  <div className="flex flex-col items-start">
                    <span className="text-base font-normal text-dark-green">
                      {t('To')}
                    </span>
                  </div>
                </button> */}
              </>
            )}

            <button
              type="button"
              className={`${error.length > 0 ? 'cursor-not-allowed bg-dark-primary-green text-dark-green' : 'bg-dark-green text-white'} flex w-[183px] items-center justify-center rounded-[40px] px-6 py-3 sm:w-[267px] sm:px-8 sm:py-5`}
              disabled={error.length > 0}
              onClick={handleRequestAppointment}
            >
              {createBooking.isPending || isBankidVerificationLoading ? (
                <ClipLoader
                  loading={
                    createBooking.isPending || isBankidVerificationLoading
                  }
                  color="#fff"
                  size={20}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                <span className="text-lg font-medium sm:text-2xl">
                  {t('Book-procedure')}
                </span>
              )}
            </button>
          </div>
        </div>
        {isLoginModalActive && <CreateAccount type="HOSPITAL_DETAILS" />}
        {isOtpVerifyModalActive && <VerifyOtp />}
        {isBankIdModalActive && <BankIdModal />}
      </div>
    </div>
  );
}

export default HospitalDetailsPage;
