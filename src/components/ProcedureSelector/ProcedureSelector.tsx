/* eslint-disable react/jsx-no-undef */
import Image from 'next/image';
import React from 'react';

import { useGetAllDepartmentWithProcedure } from '@/hooks/useDepartment';
import { useScreenWidth } from '@/hooks/useScreenWidth';
import useTranslation from '@/hooks/useTranslation';
import { useAppStore } from '@/libs/store';
import type { LocaleType } from '@/types/component';
import {
  excludeProcedure,
  handleGetLocalStorage,
  handleSetLocalStorage,
  procedureAndIcon,
} from '@/utils/global';

import DashboardLoader from '../Skeleton/DashboardSkeleton';
import { FbtButton } from '../ui';

const ProcedureSelector = () => {
  const { t } = useTranslation();
  const {
    selectedProcedure,
    setSelectedProcedure,
    selectedGender,
    setStepNumber,
  } = useAppStore();
  const departmentProcedureList = useGetAllDepartmentWithProcedure();
  const selectedLanguage = (handleGetLocalStorage({
    tokenKey: 'selected_language',
  }) ?? 'en') as LocaleType;
  const divRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const addToRefs = React.useCallback((el: HTMLDivElement | null) => {
    if (el && !divRefs.current.includes(el)) {
      divRefs.current.push(el);
    }
  }, []);
  const scrollToDiv = (index: number) => {
    const div = divRefs.current[index];
    if (div) {
      div.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const { matches } = useScreenWidth(640);
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 pb-60">
      <div className="flex w-10/12 flex-col items-center justify-center gap-2">
        <h3 className="mt-28 text-center font-onsite text-[24px] font-medium text-dark-green sm:mt-0 sm:text-[32px] sm:leading-12 md:text-5xl md:leading-15">
          {t('Select-your-procedure')}
        </h3>
        <p className="mt-6 hidden text-center font-onsite text-base font-normal leading-7 text-dark-green sm:block sm:text-xl">
          {t('To-begin-we-are-piloting-with-a-limited-number-of-non')}
        </p>
        <a
          className="mt-3 hidden text-center font-onsite text-base font-normal italic leading-7 text-dark-green sm:block sm:text-xl"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.drfasttrack.no/kontakt"
        >
          {t('If-you-cant-find-your-procedure-click-here-to-contact-us')}
        </a>
      </div>

      <div className="mb-9 mt-[40px] flex flex-col items-start gap-x-6 gap-y-3 sm:mb-32 sm:mt-[60px] sm:grid sm:grid-cols-3 sm:gap-4">
        {departmentProcedureList.isSuccess &&
        departmentProcedureList.data &&
        departmentProcedureList.data?.data?.allCategoryWithProcedure &&
        Array.isArray(
          departmentProcedureList.data.data.allCategoryWithProcedure,
        ) &&
        departmentProcedureList.data.data.allCategoryWithProcedure.length >
          0 ? (
          departmentProcedureList.data.data.allCategoryWithProcedure
            .filter(
              (procedureData) =>
                !(
                  selectedGender === 'men' &&
                  excludeProcedure.includes(procedureData.name.en)
                ),
            )
            .map((procedureData, index) => {
              return (
                <FbtButton
                  key={procedureData.id}
                  variant="outline"
                  className="flex !h-[62.95px] !w-[280px] cursor-pointer flex-row !items-center gap-x-2 gap-y-4 !rounded-2xl !border-none bg-base-light text-dark-green hover:!bg-dark-green hover:!text-white sm:my-0 sm:!h-[179.5px] sm:!w-[294px] sm:flex-col sm:!justify-center md:my-4"
                  onClick={() => scrollToDiv(index)}
                >
                  {procedureAndIcon[
                    procedureData.name.en as keyof typeof procedureAndIcon
                  ] && (
                    <Image
                      src={
                        procedureAndIcon[
                          procedureData.name.en as keyof typeof procedureAndIcon
                        ].icon
                      }
                      width={matches ? 38.95 : 58.5}
                      height={matches ? 38.95 : 58.5}
                      alt={procedureData.name.en}
                      unoptimized
                      priority
                    />
                  )}
                  <span className="font-onsite text-base font-medium sm:text-2xl">
                    {procedureData.name[selectedLanguage]}
                  </span>
                </FbtButton>
              );
            })
        ) : (
          <div className="flex w-[90vw] items-start justify-center">
            <DashboardLoader />
          </div>
        )}
      </div>
      <p className="my-6 block text-center font-onsite text-base font-normal leading-7 text-dark-green sm:hidden sm:text-xl">
        {t('To-begin-we-are-piloting-with-a-limited-number-of-non')}
      </p>
      <a
        className="mb-24 mt-6 block text-center font-onsite text-base font-normal italic leading-7 text-dark-green sm:hidden sm:text-xl"
        href="https://www.drfasttrack.no/kontakt"
        target="_blank"
        rel="noopener noreferrer"
      >
        {t('If-you-cant-find-your-procedure-click-here-to-contact-us')}
      </a>
      <div className="flex flex-col items-center justify-start gap-y-24">
        {departmentProcedureList.isSuccess &&
          departmentProcedureList.data &&
          departmentProcedureList.data?.data?.allCategoryWithProcedure &&
          Array.isArray(
            departmentProcedureList.data.data.allCategoryWithProcedure,
          ) &&
          departmentProcedureList.data.data.allCategoryWithProcedure.length >
            0 &&
          departmentProcedureList.data.data.allCategoryWithProcedure.map(
            (data) => {
              return (
                <div
                  className="flex w-full flex-col items-start rounded-2xl bg-base-light p-6 sm:w-[660px]"
                  key={data.id}
                  ref={addToRefs}
                >
                  <h3 className="text-4xl font-medium text-dark-green">
                    {data.name[selectedLanguage]
                      ? data.name[selectedLanguage]
                      : data.name.en}
                  </h3>
                  <div className="my-6 h-px w-full bg-info-green" />
                  {data.procedures &&
                    data.procedures.length > 0 &&
                    data.procedures.map((procedure) => {
                      return (
                        <div
                          key={procedure.id}
                          className="relative my-4 flex w-full items-center gap-y-4"
                        >
                          <input
                            className="!mr-[16px] !size-[20px] sm:!mr-[24px] sm:!size-[24px]"
                            type="radio"
                            id={procedure.id}
                            value={procedure.id}
                            checked={selectedProcedure === procedure.id}
                            onChange={(e) => {
                              if (setSelectedProcedure) {
                                setSelectedProcedure(e.target.value);
                                handleSetLocalStorage({
                                  tokenKey: 'selected_procedure',
                                  tokenValue: e.target.value,
                                });
                                setStepNumber(4);
                              }
                            }}
                          />

                          <label
                            htmlFor={procedure.id}
                            className="font-onsite text-base font-normal text-dark-green sm:cursor-pointer sm:text-2xl"
                          >
                            {procedure.name[selectedLanguage]
                              ? procedure.name[selectedLanguage]
                              : procedure.name.en}
                          </label>
                        </div>
                      );
                    })}
                  {data.subCategoryWithProcedures &&
                    data.subCategoryWithProcedures.length > 0 &&
                    data.subCategoryWithProcedures.map((subCategoryData) => {
                      return (
                        <div
                          className="my-4 flex flex-col items-start gap-y-4"
                          key={subCategoryData.id}
                        >
                          <h3 className="text-2xl font-medium text-dark-green">
                            {data.name[selectedLanguage]
                              ? data.name[selectedLanguage]
                              : data.name.en}{' '}
                            |{' '}
                            {subCategoryData.name[selectedLanguage]
                              ? subCategoryData.name[selectedLanguage]
                              : subCategoryData.name.en}
                          </h3>
                          {subCategoryData.procedures &&
                            subCategoryData.procedures.length > 0 &&
                            subCategoryData.procedures.map((pData) => {
                              return (
                                <div
                                  key={pData.id}
                                  className="relative flex w-full items-center"
                                >
                                  <input
                                    className="!mr-[16px] !size-[20px] sm:!mr-[24px] sm:!size-[24px]"
                                    type="radio"
                                    id={pData.id}
                                    value={pData.id}
                                    checked={selectedProcedure === pData.id}
                                    onChange={(e) => {
                                      if (setSelectedProcedure) {
                                        setSelectedProcedure(e.target.value);
                                        handleSetLocalStorage({
                                          tokenKey: 'selected_procedure',
                                          tokenValue: e.target.value,
                                        });
                                        setStepNumber(4);
                                      }
                                    }}
                                  />

                                  <label
                                    htmlFor={pData.id}
                                    className="font-onsite text-base font-normal text-dark-green sm:cursor-pointer sm:text-2xl"
                                  >
                                    {pData.name[selectedLanguage]
                                      ? pData.name[selectedLanguage]
                                      : pData.name.en}
                                  </label>
                                </div>
                              );
                            })}
                        </div>
                      );
                    })}
                </div>
              );
            },
          )}
      </div>
    </div>
  );
};

export { ProcedureSelector };
