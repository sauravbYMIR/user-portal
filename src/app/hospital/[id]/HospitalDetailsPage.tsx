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
  QuestionIcon,
} from '@/components/Icons/Icons';
import { getBankIdStatus } from '@/hooks/useAuth';
import { useCreateBooking } from '@/hooks/useBooking';
import { useClickOutside } from '@/hooks/useClickOutside';
import type { HospitalProcedureByIdType } from '@/hooks/useHospital';
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
  } = useAppStore();
  const accessToken = handleGetLocalStorage({ tokenKey: 'access_token' });
  const createBooking = useCreateBooking({ selectedHospitalName });
  const [isMounted, setIsMounted] = React.useState<boolean>(false);
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
  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <div className="relative h-screen w-screen">
      {isOpen && (
        <div className="absolute left-0 top-0 h-screen w-full bg-black/50" />
      )}
      <div className="flex size-full flex-col items-center justify-between overflow-y-scroll bg-primary-green px-12 py-9 pb-48">
        <nav className="flex w-screen items-start justify-between px-12">
          <button type="button" onClick={() => router.push('/book-procedure')}>
            <Image
              src={brand}
              width={190.47}
              height={46}
              alt="brand-with-name"
            />
            <p className="hidden">brand name</p>
          </button>
          <button
            type="button"
            className="flex items-center gap-x-3"
            onClick={() => router.push('/')}
          >
            <span className="font-poppins text-xl font-normal text-dark-green sm:block">
              {t('Close')}
            </span>
            <div className="flex items-center justify-center rounded-full border-[1.5px] border-dark-green p-1">
              <CloseIcon className="size-8" stroke="rgba(0, 70, 70, 1)" />
            </div>
          </button>
        </nav>
        <div className="w-8/12">
          <h3 className="text-center font-poppins text-[24px] font-medium text-primary-1 sm:text-[32px] sm:leading-12 md:text-5xl md:leading-15">
            {t('Your-procedure')}
          </h3>
        </div>
        <div className="mt-10 flex w-full flex-col rounded-lg bg-base-light p-[52px]">
          <div className="flex items-start justify-between">
            <div className="flex flex-col items-start gap-y-4">
              {hospitalProcedureId.success && (
                <h2 className="text-[32px] font-medium text-dark-green">
                  {hospitalProcedureId.data.procedure.name[selectedLanguage]}
                </h2>
              )}
              <div className="flex items-center gap-x-2">
                {hospitalProcedureId.success && (
                  <p className="text-xl font-normal text-dark-green">
                    {hospitalProcedureId.data.hospital.name}
                  </p>
                )}{' '}
                /{' '}
                <p className="text-xl font-normal text-dark-green/40">
                  Details
                </p>
              </div>
            </div>
            <div className="flex items-center gap-x-4">
              {hospitalProcedureId.success && (
                <div className="flex w-[161px] flex-1 flex-col rounded-xl bg-light-purple p-5">
                  <p className="text-base font-normal text-accent-purple">
                    {t('Wait-time')}
                  </p>
                  <p className="text-xl font-medium text-accent-purple">
                    {hospitalProcedureId.data.waitingTime} days
                  </p>
                </div>
              )}
              {hospitalProcedureId.success && (
                <div className="flex w-[161px] flex-1 flex-col rounded-xl bg-light-purple p-5">
                  <p className="text-base font-normal text-accent-purple">
                    {t('Duration-of-stay')}
                  </p>
                  <p className="text-xl font-medium text-accent-purple">
                    {hospitalProcedureId.data.stayInCity} days
                  </p>
                </div>
              )}
              {hospitalProcedureId.success && (
                <div className="flex w-[161px] flex-1 flex-col rounded-xl bg-light-purple p-5">
                  <p className="text-base font-normal text-accent-purple">
                    {t('hospital-stay')}
                  </p>
                  <p className="text-xl font-medium text-accent-purple">
                    {hospitalProcedureId.data.stayInHospital} days
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="mt-24 flex w-full items-center justify-between border-b border-dark-grey-1 pb-9">
            <div className="flex flex-1 flex-col items-start">
              <h3 className="text-2xl font-medium text-dark-green">
                {t('About-the-procedure')}
              </h3>
              {hospitalProcedureId.success && (
                <p className="text-xl font-normal text-dark-green">
                  {hospitalProcedureId.data.description[selectedLanguage]}
                </p>
              )}
            </div>
            <div className="flex flex-1 flex-col items-end">
              <div className="flex w-[90%] flex-col items-start gap-y-3 rounded-xl bg-dark-grey-1 p-5">
                <p className="text-base font-normal text-black-52">
                  Your cost after reinbursement
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
                  <QuestionIcon />
                </div>
              </div>
              <div className="mt-10 flex w-[90%] flex-col items-start">
                <h3 className="text-base font-bold text-dark-green">
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
                            width={102.08}
                            height={102}
                          />
                          <div className="flex flex-col items-start">
                            <p className="text-2xl font-medium text-dark-green">
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
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
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
        <div className="fixed bottom-0 flex w-screen items-center justify-between bg-secondary-green p-8">
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
          <div className="flex items-center gap-x-4">
            <div
              className={`fixed inset-x-0 bottom-32 z-50 bg-base-light ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-[430px] opacity-0'}`}
            >
              <div
                className="flex h-[312px] items-start justify-between px-6 py-8"
                ref={sliderRef}
              >
                <div className="flex h-full flex-col items-start justify-between">
                  <div className="flex flex-col gap-y-2">
                    <h2 className="text-xl font-medium text-dark-green">
                      {t('When-do-you-want-to-get-your-treatment-done')}
                    </h2>
                    <p className="text-base font-normal text-dark-green">
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
                <div className="flex items-start gap-x-3">
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
                  />
                </div>
              </div>
            </div>
            <button
              type="button"
              className="flex items-center gap-x-4 rounded-xl bg-base-light px-5 py-4"
              onClick={() => setIsOpen((prevState) => !prevState)}
            >
              <CalendarIcon />
              <div className="flex flex-col items-start">
                <span className="text-base font-normal text-dark-green">
                  {t('From')}
                </span>
                {startDate && (
                  <span className="text-base font-medium text-dark-green">
                    {startDate.getDate()}.{getMonth(startDate)}{' '}
                    {startDate.getFullYear()}
                  </span>
                )}
              </div>
            </button>
            <button
              type="button"
              className="flex items-center gap-x-4 rounded-xl bg-base-light px-5 py-4"
            >
              <CalendarIcon />
              <div className="flex flex-col items-start">
                <span className="text-base font-normal text-dark-green">
                  {t('To')}
                </span>
                {endDate && (
                  <span className="text-base font-medium text-dark-green">
                    {endDate.getDate()}.{getMonth(endDate)}{' '}
                    {endDate.getFullYear()}
                  </span>
                )}
              </div>
            </button>
            <button
              type="button"
              className={`${error.length > 0 ? 'cursor-not-allowed bg-dark-primary-green text-dark-green' : 'bg-dark-green text-white'} flex w-[267px] items-center justify-center rounded-[40px] px-8 py-5`}
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
                <span className="text-2xl font-medium">
                  {t('Book-procedure')}
                </span>
              )}
            </button>
          </div>
        </div>
        {isLoginModalActive && <CreateAccount />}
        {isOtpVerifyModalActive && <VerifyOtp />}
        {isBankIdModalActive && <BankIdModal />}
      </div>
    </div>
  );
}

export default HospitalDetailsPage;
