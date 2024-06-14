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

import BankIdModal from '@/components/Auth/BankIdModal';
import { CreateAccount } from '@/components/Auth/CreateAccount';
import { VerifyOtp } from '@/components/Auth/VerifyOtp';
import { BackArrowIcon, SearchIcon } from '@/components/Icons/Icons';
import { TeamMemberCard } from '@/components/TeamMemberCard/TeamMemberCard';
import { getBankIdStatus } from '@/hooks/useAuth';
import { useCreateBooking } from '@/hooks/useBooking';
import type { HospitalProcedureByIdType } from '@/hooks/useHospital';
import useTranslation from '@/hooks/useTranslation';
import { useAppStore } from '@/libs/store';
import hospitalLogo from '@/public/assets/icons/sampleLogo.svg';
import type { LocaleType } from '@/types/component';
import {
  convertToValidCurrency,
  getMonth,
  handleGetLocalStorage,
  handleSetLocalStorage,
} from '@/utils/global';

import style from './style.module.scss';

function HospitalDetailsPage({
  hospitalProcedureId,
}: {
  hospitalProcedureId: { success: boolean; data: HospitalProcedureByIdType };
}) {
  const selectedLanguage = (handleGetLocalStorage({
    tokenKey: 'selected_language',
  }) ?? 'en') as LocaleType;
  const { t } = useTranslation();
  const { selectedHospitalName, setStepNumber } = useAppStore();
  const router = useRouter();
  const {
    setIsLoginModalActive,
    isLoginModalActive,
    isOtpVerifyModalActive,
    isBankIdModalActive,
    setIsBankIdModalActive,
  } = useAppStore();
  const accessToken = handleGetLocalStorage({ tokenKey: 'access_token' });
  const createBooking = useCreateBooking();
  const [searchMemberQuery, setSearchMemberQuery] = React.useState<string>('');
  const [isMounted, setIsMounted] = React.useState<boolean>(false);
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
    const selectedGenderLocalstorage = handleGetLocalStorage({
      tokenKey: 'selected_gender',
    });
    const selectedCountryLocalstorage = handleGetLocalStorage({
      tokenKey: 'selected_country',
    });
    const selectedProcedureLocalstorage = handleGetLocalStorage({
      tokenKey: 'selected_procedure',
    });
    const selectedHospitalLocalstorage = handleGetLocalStorage({
      tokenKey: 'selected_hospital',
    });
    const selectedStartDateLocalstorage = handleGetLocalStorage({
      tokenKey: 'start_date',
    });
    const selectedEndDateLocalstorage = handleGetLocalStorage({
      tokenKey: 'end_date',
    });
    if (
      selectedGenderLocalstorage &&
      selectedCountryLocalstorage &&
      selectedProcedureLocalstorage &&
      selectedHospitalLocalstorage &&
      selectedStartDateLocalstorage &&
      selectedEndDateLocalstorage
    ) {
      // eslint-disable-next-line func-names
      (async function () {
        const r = await getBankIdStatus();
        if (r.success && !r.bankIdStatus) {
          setIsBankIdModalActive(true);
          return;
        }
        createBooking.mutate({
          hospitalProcedureId: selectedProcedureLocalstorage,
          gender: selectedGenderLocalstorage,
          patientPreferredStartDate: JSON.parse(selectedStartDateLocalstorage),
          patientPreferredEndDate: JSON.parse(selectedEndDateLocalstorage),
          claimCountry: selectedCountryLocalstorage,
        });
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
    createBooking.mutate({
      hospitalProcedureId: selectedHospital,
      gender: selectedGender,
      claimCountry: selectedCountry,
      patientPreferredStartDate: startDate,
      patientPreferredEndDate: endDate,
    });
  };
  const handleRequestAppointment = async () => {
    if (!startDate || !endDate) {
      toast.error('Please select treatment date to continue');
      return;
    }
    if (!accessToken) {
      setIsLoginModalActive(true);
      return;
    }
    const r = await getBankIdStatus();
    if (r.success && !r.bankIdStatus) {
      setIsBankIdModalActive(true);
      return;
    }
    handleCreateBooking();
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
      <div className={style.headerSection}>
        <div className={style.titleContainer}>
          {hospitalProcedureId.data &&
          hospitalProcedureId.data &&
          hospitalProcedureId.data.hospital.logo &&
          typeof hospitalProcedureId.data.hospital.logo === 'string' ? (
            <Image
              className="size-14 rounded-full"
              src={hospitalProcedureId.data.hospital.logo}
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
            {hospitalProcedureId.success && hospitalProcedureId.data && (
              <h3>
                {hospitalProcedureId.data.procedure.name[selectedLanguage]}
              </h3>
            )}

            {hospitalProcedureId.success && hospitalProcedureId.data && (
              <div className={style.breadcrumb}>
                <Link href="/">
                  {
                    hospitalProcedureId.data.procedure.category.name[
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

      <div className="mb-5 flex w-full flex-col items-start justify-between slg:mb-0 slg:flex-row slg:items-center">
        <div className="flex w-1/2 flex-col items-start">
          <h3 className={style.subTitle}>{t('About-the-procedure')}</h3>
          {hospitalProcedureId.success && hospitalProcedureId.data && (
            <p className="my-4 font-lexend text-base font-light text-neutral-3">
              {hospitalProcedureId.data.description[selectedLanguage]}
            </p>
          )}
        </div>
        <div className="flex w-full flex-col items-start rounded-lg bg-neutral-7 px-4 py-11 slg:w-[400px]">
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
            <div className="flex w-full flex-col items-start justify-between gap-[9.46px] slg:flex-row slg:items-center">
              <DatePicker
                selected={startDate}
                onChange={(date) => {
                  if (date) {
                    setStartDate(date);
                    handleSetLocalStorage({
                      tokenKey: 'start_date',
                      tokenValue: JSON.stringify(date),
                    });
                  }
                }}
                selectsStart
                placeholderText="From"
                startDate={startDate}
                endDate={endDate}
                className="w-full rounded-[10px] border border-gray169 px-3 py-4 slg:w-[160.77px]"
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
                placeholderText="To"
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                className="w-full rounded-[10px] border border-gray169 px-3 py-4 slg:w-[160.77px]"
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

      {hospitalProcedureId && hospitalProcedureId.data && (
        <div className="grid w-full grid-cols-1 gap-10 slg:w-[520px] slg:grid-cols-2">
          <div className="flex flex-col items-start justify-start">
            <p className="font-lexend text-xl font-normal text-neutral-2">
              {t('Cost-of-procedure')}
            </p>
            <p className="font-lexend text-base font-light text-neutral-2">
              {convertToValidCurrency({
                price: hospitalProcedureId.data.cost.price,
                locale: selectedLanguageFromUserDropdown ?? 'en',
                currency: hospitalProcedureId.data.cost.currency,
              })}
            </p>
          </div>
          <div className="flex flex-col items-start justify-start">
            <p className="font-lexend text-xl font-normal text-neutral-2">
              {t('Wait-of-procedure')}
            </p>
            <p className="font-lexend text-base font-light text-neutral-2">
              {hospitalProcedureId.data.waitingTime}
            </p>
          </div>
          <div className="flex flex-col items-start justify-start">
            <p className="font-lexend text-xl font-normal text-neutral-2">
              {t('Duration-of-city-stay')}
            </p>
            <p className="font-lexend text-base font-light text-neutral-2">
              {hospitalProcedureId.data.stayInCity}
            </p>
          </div>
          <div className="flex flex-col items-start justify-start">
            <p className="font-lexend text-xl font-normal text-neutral-2">
              {t('Duration-of-hospital-stay')}
            </p>
            <p className="font-lexend text-base font-light text-neutral-2">
              {hospitalProcedureId.data.stayInHospital}
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
        hospitalProcedureId.data &&
        Array.isArray(hospitalProcedureId.data?.hospitalProcedureImages) &&
        hospitalProcedureId.data?.hospitalProcedureImages.length > 0 ? (
          hospitalProcedureId.data?.hospitalProcedureImages.map((image) => {
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
          })
        ) : (
          <p className="mt-2 font-lexend text-base font-normal">
            {t('No-images-found')}
          </p>
        )}
      </div>

      <h3 className={style.subTitle} style={{ marginTop: '40px' }}>
        {t('Procedure-team')}
      </h3>
      {hospitalProcedureId && hospitalProcedureId.data && (
        <div>
          {!(hospitalProcedureId.data.procedureMembers.length === 0) && (
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
                  ? hospitalProcedureId.data.procedureMembers
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
                  : hospitalProcedureId.data.procedureMembers.map((member) => {
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
                    })}
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
          {hospitalProcedureId.data?.hospitalDescription[selectedLanguage]}
        </p>

        <h3 className={style.subTitle} style={{ marginTop: '40px' }}>
          {t('Hospital-image')}
        </h3>

        <div className=" mt-10 flex w-full flex-wrap items-center gap-x-6">
          {hospitalProcedureId &&
          hospitalProcedureId.data &&
          hospitalProcedureId.data &&
          Array.isArray(hospitalProcedureId.data?.hospitalImages) &&
          hospitalProcedureId.data?.hospitalImages.length > 0 ? (
            hospitalProcedureId.data?.hospitalImages.map((image) => {
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
      <div className="sticky inset-x-1/2 bottom-0 mb-[47px] mt-[62px] flex w-full translate-x-0 flex-col items-center justify-between rounded-[6.4px] bg-darkslategray px-[22px] py-[15.75px] slg:flex-row slg:px-9 slg:py-[34px]">
        <div className="flex flex-col items-start">
          <span className="font-poppins text-3xl font-medium text-neutral-7">
            {hospitalProcedureId?.data?.procedure.name[selectedLanguage]}
          </span>
          <span className="my-4 font-poppins text-lg font-normal text-neutral-6 slg:my-0 slg:text-xl">
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
          className={`${error.length > 0 ? 'cursor-not-allowed bg-primary-5/90' : 'cursor-pointer'} w-full rounded-[6.4px] bg-primary-5 px-2 py-4 slg:w-[348px]`}
          disabled={error.length > 0}
          onClick={handleRequestAppointment}
        >
          {createBooking.isPending ? (
            <ClipLoader
              loading={createBooking.isPending}
              color="#333"
              size={20}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            <span className="font-poppins text-lg font-normal text-darkslategray slg:text-2xl">
              {t('Request-an-appointment')}
            </span>
          )}
        </button>
      </div>
      {isLoginModalActive && <CreateAccount />}
      {isOtpVerifyModalActive && <VerifyOtp />}
      {isBankIdModalActive && <BankIdModal />}
    </div>
  );
}

export default HospitalDetailsPage;
