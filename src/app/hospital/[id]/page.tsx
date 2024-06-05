/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-nested-ternary */

'use client';

import 'react-datepicker/dist/react-datepicker.css';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import DatePicker from 'react-datepicker';
import { ClipLoader } from 'react-spinners';
import { toast } from 'sonner';

import { CreateAccount } from '@/components/Auth/CreateAccount';
import { VerifyOtpSuspense } from '@/components/Auth/VerifyOtp';
import { BackArrowIcon, SearchIcon } from '@/components/Icons/Icons';
import { FacebookStyleLoader } from '@/components/Loader/FacebookStyleLoader';
import { TeamMemberCard } from '@/components/TeamMemberCard/TeamMemberCard';
import { useCreateBooking } from '@/hooks/useBooking';
import { useGetHospitalProcedureById } from '@/hooks/useHospital';
import useTranslation from '@/hooks/useTranslation';
import { useAppStore } from '@/libs/store';
import hospitalLogo from '@/public/assets/icons/sampleLogo.svg';
import type { LocaleType } from '@/types/component';
import {
  convertToValidCurrency,
  getMonth,
  handleGetLocalStorage,
} from '@/utils/global';

import style from './style.module.scss';

function HospitalDetailsPage({ params }: { params: { id: string } }) {
  const selectedLanguage = (handleGetLocalStorage({
    tokenKey: 'selected_language',
  }) ?? 'en') as LocaleType;
  const { t } = useTranslation();
  const { selectedHospitalName, setStepNumber } = useAppStore();
  const router = useRouter();
  const { setIsLoginModalActive, isLoginModalActive, isOtpVerifyModalActive } =
    useAppStore();
  const userId = handleGetLocalStorage({ tokenKey: 'user_id' });
  const createBooking = useCreateBooking();
  const [searchMemberQuery, setSearchMemberQuery] = React.useState<string>('');
  const [isMounted, setIsMounted] = React.useState<boolean>(false);
  const hospitalProcedureId = useGetHospitalProcedureById({
    id: params.id,
  });
  const [startDate, setStartDate] = React.useState<null | Date>(null);
  const [endDate, setEndDate] = React.useState<null | Date>(null);
  const [error, setError] = React.useState<string>('');
  React.useEffect(() => {
    if (createBooking.isSuccess) {
      router.push(
        `${window.location.origin}/booking-success/?name=${selectedHospitalName}`,
      );
    }
  }, [createBooking.isSuccess, router, selectedHospitalName]);

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
  const { selectedHospital, selectedGender, selectedCountry } = useAppStore();
  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  const selectedLanguageFromUserDropdown = handleGetLocalStorage({
    tokenKey: 'selected_language',
  });
  const handleCreateBooking = () => {
    if (!startDate || !endDate) {
      toast.error('Please select treatment date to continue');
      return;
    }
    if (!userId) {
      setIsLoginModalActive(true);
      return;
    }
    if (!startDate || !endDate) {
      toast.error('Please select treatment date to book procedure');
      return;
    }
    createBooking.mutate({
      hospitalProcedureId: selectedHospital,
      gender: selectedGender,
      claimCountry: selectedCountry,
      userId,
      patientPreferredStartDate: startDate,
      patientPreferredEndDate: endDate,
    });
  };
  return (
    <div className={style.hospitalDetailPageContainer}>
      <button
        type="button"
        className="cursor-pointer"
        onClick={() => {
          setStepNumber(4);
          router.back();
        }}
      >
        <span style={{ display: 'none' }}>back arrow</span>
        <BackArrowIcon strokeWidth="2" stroke="rgba(17, 17, 17, 0.8)" />
      </button>
      {hospitalProcedureId.isLoading ? (
        <FacebookStyleLoader />
      ) : (
        <>
          <div className={style.headerSection}>
            <div className={style.titleContainer}>
              {hospitalProcedureId.data &&
              hospitalProcedureId.data.data &&
              hospitalProcedureId.data.data.hospital.logo &&
              typeof hospitalProcedureId.data.data.hospital.logo ===
                'string' ? (
                <Image
                  className="size-14 rounded-full"
                  src={hospitalProcedureId.data.data.hospital.logo}
                  alt="hospital logo"
                  width={56}
                  height={56}
                />
              ) : (
                <Image
                  className={style.hospitalLogo}
                  src={hospitalLogo}
                  alt="hospital logo"
                />
              )}

              <div className={style.titleBreadCrumbContainer}>
                {hospitalProcedureId.isSuccess &&
                  hospitalProcedureId.data.data && (
                    <h3>
                      {
                        hospitalProcedureId.data.data.procedure.name[
                          selectedLanguage
                        ]
                      }
                    </h3>
                  )}

                {hospitalProcedureId.isSuccess &&
                  hospitalProcedureId.data.data && (
                    <div className={style.breadcrumb}>
                      <Link href="/">
                        {
                          hospitalProcedureId.data.data.procedure.category.name[
                            selectedLanguage
                          ]
                        }{' '}
                        {t('department')}
                      </Link>
                      <span>/</span>
                      <Link href="/">{t('Procedure-details')}</Link>
                    </div>
                  )}
              </div>
            </div>
          </div>

          <div className="flex w-full items-center justify-between">
            <div className="flex w-1/2 flex-col items-start">
              <h3 className={style.subTitle}>{t('About-the-procedure')}</h3>
              {hospitalProcedureId.isSuccess &&
                hospitalProcedureId.data.data && (
                  <p className={style.hospitalDesc}>
                    {
                      hospitalProcedureId.data.data.description[
                        selectedLanguage
                      ]
                    }
                  </p>
                )}
            </div>
            <div className="flex w-[400px] flex-col items-start rounded-lg bg-neutral-7 px-4 py-11">
              <h3 className="font-poppins text-2xl font-medium text-gray77">
                {t('When-do-you-want-to-get-your-treatment-done')}
              </h3>
              <p className="font-lexend text-base font-light text-neutral-3">
                {t('Select-a-range-of-minimum-14-days')}
              </p>
              <label
                id="date"
                className="mb-2 mt-6 font-lexend text-base font-normal text-neutral-2"
              >
                {t('Date-range')}
              </label>
              <div className="flex flex-col items-start">
                <div className="flex items-center justify-between gap-[9.46px]">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => date && setStartDate(date)}
                    selectsStart
                    placeholderText="From"
                    startDate={startDate}
                    endDate={endDate}
                    className="w-[160.77px] rounded-[10px] border border-gray169 px-3 py-4"
                  />
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => date && setEndDate(date)}
                    selectsEnd
                    placeholderText="To"
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    className="w-[160.77px] rounded-[10px] border border-gray169 px-3 py-4"
                  />
                </div>
                {error && (
                  <small className="mt-1 text-start font-lexend text-base font-normal text-error">
                    {error}
                  </small>
                )}
              </div>
            </div>
          </div>

          {hospitalProcedureId.isSuccess && hospitalProcedureId.data.data && (
            <div className="grid w-[520px] grid-cols-2 gap-10">
              <div className="flex flex-col items-start justify-start">
                <p className="font-lexend text-xl font-normal text-neutral-2">
                  {t('Cost-of-procedure')}
                </p>
                <p className="font-lexend text-base font-light text-neutral-2">
                  {convertToValidCurrency({
                    price: hospitalProcedureId.data.data.cost.price,
                    locale: selectedLanguageFromUserDropdown ?? 'en',
                    currency: hospitalProcedureId.data.data.cost.currency,
                  })}
                </p>
              </div>
              <div className="flex flex-col items-start justify-start">
                <p className="font-lexend text-xl font-normal text-neutral-2">
                  {t('Wait-of-procedure')}
                </p>
                <p className="font-lexend text-base font-light text-neutral-2">
                  {hospitalProcedureId.data.data.waitingTime}
                </p>
              </div>
              <div className="flex flex-col items-start justify-start">
                <p className="font-lexend text-xl font-normal text-neutral-2">
                  {t('Duration-of-city-stay')}
                </p>
                <p className="font-lexend text-base font-light text-neutral-2">
                  {hospitalProcedureId.data.data.stayInCity}
                </p>
              </div>
              <div className="flex flex-col items-start justify-start">
                <p className="font-lexend text-xl font-normal text-neutral-2">
                  {t('Duration-of-hospital-stay')}
                </p>
                <p className="font-lexend text-base font-light text-neutral-2">
                  {hospitalProcedureId.data.data.stayInHospital}
                </p>
              </div>
            </div>
          )}

          <h3 className={style.subTitle} style={{ marginTop: '40px' }}>
            {t('Hospital-procedure-image')}
          </h3>

          <div className="mt-10 flex w-full flex-wrap items-center gap-x-8">
            {hospitalProcedureId &&
            hospitalProcedureId.data &&
            hospitalProcedureId.data.data &&
            Array.isArray(
              hospitalProcedureId.data?.data.hospitalProcedureImages,
            ) &&
            hospitalProcedureId.data?.data.hospitalProcedureImages.length >
              0 ? (
              hospitalProcedureId.data?.data.hospitalProcedureImages.map(
                (image) => {
                  return (
                    <Image
                      key={image.id}
                      src={image.imageUrl}
                      width={264}
                      height={250}
                      alt="procedureImage"
                      priority
                      unoptimized
                      className="my-2 h-[250px] w-[264px] rounded-lg"
                    />
                  );
                },
              )
            ) : (
              <p className="mt-2 font-lexend text-base font-normal">
                {t('No-images-found')}
              </p>
            )}
          </div>

          <h3 className={style.subTitle} style={{ marginTop: '40px' }}>
            {t('Procedure-team')}
          </h3>
          {hospitalProcedureId.isSuccess && hospitalProcedureId.data.data && (
            <div>
              {!(
                hospitalProcedureId.data.data.procedureMembers.length === 0
              ) && (
                <div className={style.teamMemberViewSection}>
                  <div className="my-[32px] flex items-center justify-between">
                    <div className="relative">
                      <input
                        className="rounded-lg border border-neutral-4 px-4 py-[10px]"
                        type="text"
                        name="search-member"
                        id="search-member"
                        value={searchMemberQuery}
                        onChange={(e) => setSearchMemberQuery(e.target.value)}
                      />
                      <SearchIcon className="absolute right-4 top-4 size-4" />
                    </div>
                  </div>

                  <div className={style.teamMemberCardsContainer}>
                    {searchMemberQuery
                      ? hospitalProcedureId.data.data.procedureMembers
                          .filter((member) =>
                            member.name
                              .toLowerCase()
                              .includes(searchMemberQuery.toLowerCase()),
                          )
                          .map((member) => {
                            return (
                              <TeamMemberCard
                                name={member.name}
                                role={member.position[selectedLanguage]}
                                key={member.id}
                                profile={
                                  member.profilePictureUploaded
                                    ? member.profile
                                    : false
                                }
                              />
                            );
                          })
                      : hospitalProcedureId.data.data.procedureMembers.map(
                          (member) => {
                            return (
                              <TeamMemberCard
                                name={member.name}
                                role={member.position[selectedLanguage]}
                                key={member.id}
                                profile={
                                  member.profilePictureUploaded
                                    ? member.profile
                                    : false
                                }
                              />
                            );
                          },
                        )}
                    {}
                  </div>
                </div>
              )}
            </div>
          )}
          <div className="flex flex-col items-start ">
            <h3 className="mb-6 font-poppins text-2xl font-medium text-gray77">
              {t('About-the-hospital')}
            </h3>
            <p className="font-lexend text-base font-light text-neutral-3">
              {
                hospitalProcedureId.data?.data.hospitalDescription[
                  selectedLanguage
                ]
              }
            </p>

            <h3 className={style.subTitle} style={{ marginTop: '40px' }}>
              {t('Hospital-image')}
            </h3>

            <div className=" mt-10 flex w-full flex-wrap items-center gap-x-6">
              {hospitalProcedureId &&
              hospitalProcedureId.data &&
              hospitalProcedureId.data.data &&
              Array.isArray(hospitalProcedureId.data?.data.hospitalImages) &&
              hospitalProcedureId.data?.data.hospitalImages.length > 0 ? (
                hospitalProcedureId.data?.data.hospitalImages.map((image) => {
                  return (
                    <Image
                      key={image.id}
                      src={image.imageUrl}
                      alt="procedureImage"
                      width={264}
                      height={250}
                      priority
                      unoptimized
                      className="my-2 h-[250px] w-[264px] rounded-lg"
                    />
                  );
                })
              ) : (
                <p className="mt-2 font-lexend text-base font-normal">
                  {t('No-images-found')}
                </p>
              )}
            </div>
          </div>
          <div className="sticky inset-x-1/2 bottom-0 mb-[47px] mt-[62px] flex w-full translate-x-0 items-center justify-between rounded-[6.4px] bg-darkslategray px-9 py-[34px]">
            <div className="flex flex-col items-start">
              <span className="font-poppins text-3xl font-medium text-neutral-7">
                {
                  hospitalProcedureId?.data?.data.procedure.name[
                    selectedLanguage
                  ]
                }
              </span>
              <span className="font-poppins text-xl font-normal text-neutral-6">
                {startDate &&
                  `${new Date(startDate).getDate()} /
                    ${getMonth(startDate)} /
                    ${new Date(startDate).getFullYear()}`}{' '}
                -{' '}
                {endDate &&
                  `${new Date(endDate).getDate()} /
                    ${getMonth(endDate)} /
                    ${new Date(endDate).getFullYear()}`}
              </span>
            </div>
            <button
              type="button"
              className={`${error.length > 0 ? 'cursor-not-allowed bg-primary-5/90' : 'cursor-pointer'} h-[64px] w-[348px] rounded-[6.4px] bg-primary-5`}
              disabled={error.length > 0}
              onClick={handleCreateBooking}
            >
              {createBooking.isPending ? (
                <ClipLoader
                  loading={createBooking.isPending}
                  color="#333"
                  size={30}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                <span className="font-poppins text-2xl font-normal text-darkslategray">
                  {t('Request-an-appointment')}
                </span>
              )}
            </button>
          </div>
        </>
      )}
      {isLoginModalActive && <CreateAccount />}
      {isOtpVerifyModalActive && <VerifyOtpSuspense />}
    </div>
  );
}

export default HospitalDetailsPage;
