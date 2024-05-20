import React from 'react';

import { useGetAllDepartmentWithProcedure } from '@/hooks/useDepartment';

import CustomAccordion from '../CustomAccordion/CustomAccordion';
import proceduresStyle from './Procedure.module.scss';

function ReimbursementWrapper({ id, value }: { id: string; value: number }) {
  return (
    <div key={id} className="w-1/2 p-3">
      <p className="font-lexend text-xl font-normal text-neutral-2">
        Reimbursement for {id}
      </p>
      <p className="font-lexend text-base font-light">{value}</p>
    </div>
  );
}

const ProcedureSelector = () => {
  const departmentProcedureList = useGetAllDepartmentWithProcedure();
  return (
    <div className="flex flex-col items-start justify-center gap-2 sm:items-center">
      <h3 className="font-poppins text-5xl font-medium text-primary-1">
        Select your procedure
      </h3>
      <p className="mt-2 font-lexend text-2xl font-light text-gray77">
        To begin we are piloting with a limited number of non elective
        procedures, more procedures will be added in the near future..
      </p>
      <div className="mt-16 w-full">
        {departmentProcedureList.isSuccess &&
          Array.isArray(
            departmentProcedureList.data.data.allCategoryWithProcedure,
          ) &&
          departmentProcedureList.data.data.allCategoryWithProcedure.length >
            0 &&
          departmentProcedureList.data.data.allCategoryWithProcedure.map(
            (procedureData) => {
              return (
                <div key={procedureData.id} className="mb-3">
                  <CustomAccordion
                    type="DEPARTMENT"
                    title={procedureData.name.en}
                  >
                    {procedureData.subCategoryWithProcedures.length > 0 &&
                      procedureData.subCategoryWithProcedures.map(
                        (subCategoryData) => {
                          return (
                            <ul key={subCategoryData.id}>
                              <li className="flex items-center justify-between px-4 py-2">
                                <span className="font-poppins text-sm font-medium text-primary-2">
                                  {subCategoryData.name.en}
                                </span>
                              </li>

                              {subCategoryData.procedures.length > 0 && (
                                <div
                                  className={
                                    proceduresStyle.subCategoryAccordionContainer
                                  }
                                >
                                  {subCategoryData.procedures.map(
                                    (procedure) => {
                                      return (
                                        <CustomAccordion
                                          key={procedure.id}
                                          title={procedure.name.en}
                                          type="SUB-CATEGORY"
                                          procedureId={procedure.id}
                                        >
                                          <div className="flex flex-wrap items-center">
                                            {Object.entries(
                                              procedure.reimbursement,
                                            ).map(([key, value]) => {
                                              return (
                                                <ReimbursementWrapper
                                                  key={key}
                                                  id={key}
                                                  value={value}
                                                />
                                              );
                                            })}
                                          </div>
                                        </CustomAccordion>
                                      );
                                    },
                                  )}
                                </div>
                              )}
                            </ul>
                          );
                        },
                      )}
                    {procedureData.procedures.length > 0 && (
                      <div
                        className={proceduresStyle.proceduresAccordionContainer}
                      >
                        {procedureData.procedures.map((procedure) => {
                          return (
                            <CustomAccordion
                              type="PROCEDURE"
                              key={procedure.id}
                              title={procedure.name.en}
                              procedureId={procedure.id}
                            >
                              <div className="flex flex-wrap items-center">
                                {Object.entries(procedure.reimbursement).map(
                                  ([key, value]) => {
                                    return (
                                      <ReimbursementWrapper
                                        key={key}
                                        id={key}
                                        value={value}
                                      />
                                    );
                                  },
                                )}
                              </div>
                            </CustomAccordion>
                          );
                        })}
                      </div>
                    )}
                  </CustomAccordion>
                </div>
              );
            },
          )}
      </div>
    </div>
  );
};

export { ProcedureSelector };
