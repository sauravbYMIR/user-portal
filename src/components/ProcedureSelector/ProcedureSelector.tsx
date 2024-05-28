import React from 'react';
import ContentLoader from 'react-content-loader';

import { useGetAllDepartmentWithProcedure } from '@/hooks/useDepartment';
import useTranslation from '@/hooks/useTranslation';
import { useAppStore } from '@/libs/store';
import type { LocaleType } from '@/types/component';
import { handleGetLocalStorage } from '@/utils/global';

import CustomAccordion from '../CustomAccordion/CustomAccordion';
import proceduresStyle from './Procedure.module.scss';

const ProcedureSelector = () => {
  const { t } = useTranslation();
  const { selectedProcedure, setSelectedProcedure } = useAppStore();
  const departmentProcedureList = useGetAllDepartmentWithProcedure();
  const selectedLanguage = (handleGetLocalStorage({
    tokenKey: 'selected_language',
  }) ?? 'en') as LocaleType;
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 ">
      <div className="flex w-10/12 flex-col items-center justify-center gap-2 ">
        <h3 className="text-center font-poppins text-[24px] font-medium text-primary-1 sm:text-[32px] sm:leading-12 md:text-5xl md:leading-15">
          {t('Select-your-procedure')}
        </h3>
        <p className="mt-2 text-center font-lexend text-sm font-light text-gray77 sm:text-2xl">
          {t('To-begin-we-are-piloting-with-a-limited-number-of-non')}
        </p>
      </div>

      <div className=" mt-[40px] flex w-full flex-col gap-[16px] sm:mt-16 sm:w-full md:w-11/12 xl:w-9/12">
        {departmentProcedureList.isSuccess &&
        Array.isArray(
          departmentProcedureList.data.data.allCategoryWithProcedure,
        ) &&
        departmentProcedureList.data.data.allCategoryWithProcedure.length >
          0 ? (
          departmentProcedureList.data.data.allCategoryWithProcedure.map(
            (procedureData) => {
              return (
                <div key={procedureData.id}>
                  <CustomAccordion
                    type="DEPARTMENT"
                    title={procedureData.name[selectedLanguage]}
                    className={proceduresStyle.boxShadow}
                  >
                    {procedureData.procedures.length > 0 && (
                      <div
                        className={`${proceduresStyle.proceduresAccordionContainer} flex flex-col gap-[24px]`}
                      >
                        {procedureData.procedures.map((procedure) => {
                          return (
                            <div
                              key={procedure.id}
                              className=" flex w-full items-center"
                            >
                              <input
                                className="mr-[16px] size-[20px] sm:mr-[24px] sm:size-[24px]"
                                type="radio"
                                id={procedure.id}
                                value={procedure.id}
                                checked={selectedProcedure === procedure.id}
                                onChange={(e) =>
                                  setSelectedProcedure &&
                                  setSelectedProcedure(e.target.value)
                                }
                              />

                              <label
                                htmlFor={procedure.id}
                                className="sm: cursor-pointer font-poppins text-base text-neutral-2 sm:text-2xl"
                              >
                                {procedure.name[selectedLanguage]}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    {procedureData.subCategoryWithProcedures.length > 0 &&
                      procedureData.subCategoryWithProcedures.map(
                        (subCategoryData) => {
                          return (
                            <CustomAccordion
                              key={subCategoryData.name[selectedLanguage]}
                              type="SUB-CATEGORY-WITH-PROCEDURE"
                              title={subCategoryData.name[selectedLanguage]}
                              className="font-medium"
                            >
                              {subCategoryData.procedures.length > 0 && (
                                <div
                                  className={`${proceduresStyle.proceduresAccordionContainer} mb-[10px] flex flex-col gap-[24px]`}
                                >
                                  {subCategoryData.procedures.map(
                                    (procedure) => {
                                      return (
                                        <div
                                          key={procedure.id}
                                          className="mt-[10px] flex w-full items-center"
                                        >
                                          <input
                                            className="mr-[16px] size-[20px] sm:mr-[24px] sm:size-[24px]"
                                            type="radio"
                                            id={procedure.id}
                                            value={procedure.id}
                                            checked={
                                              selectedProcedure === procedure.id
                                            }
                                            onChange={(e) =>
                                              setSelectedProcedure &&
                                              setSelectedProcedure(
                                                e.target.value,
                                              )
                                            }
                                          />

                                          <label
                                            htmlFor={procedure.id}
                                            className="sm: cursor-pointer font-poppins text-base text-neutral-2 sm:text-2xl"
                                          >
                                            {procedure.name[selectedLanguage]}
                                          </label>
                                        </div>
                                      );
                                    },
                                  )}
                                </div>
                              )}
                            </CustomAccordion>
                          );
                        },
                      )}
                  </CustomAccordion>
                </div>
              );
            },
          )
        ) : (
          <ContentLoader
            speed={2}
            height={500}
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="25" y="15" rx="5" ry="5" width="100%" height="64" />
            <rect x="25" y="89" rx="5" ry="5" width="100%" height="64" />
            <rect x="25" y="163" rx="5" ry="5" width="100%" height="64" />
            <rect x="25" y="237" rx="5" ry="5" width="100%" height="64" />
          </ContentLoader>
        )}
      </div>
    </div>
  );
};

export { ProcedureSelector };
