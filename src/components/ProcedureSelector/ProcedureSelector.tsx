import React from 'react';

import { useGetAllDepartmentWithProcedure } from '@/hooks/useDepartment';

import CustomAccordion from '../CustomAccordion/CustomAccordion';
import proceduresStyle from './Procedure.module.scss';

function ReimbursementWrapper({ key, value }: { key: string; value: number }) {
  return (
    <div key={key} className="w-1/2 p-3">
      <p className="font-lexend text-xl font-normal text-neutral-2">
        Reimbursement for {key}
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
                    // editClickHandler={() => {
                    //   // setUpdateId(procedureData.id);
                    //   // setIsEditData(true);
                    //   // setEditDepartmentModalOpen(true);
                    // }}
                    title={procedureData.name.en}
                  >
                    {procedureData.subCategoryWithProcedures.length > 0 &&
                      procedureData.subCategoryWithProcedures.map(
                        (subCategoryData, index) => {
                          return (
                            <ol key={subCategoryData.id}>
                              <li className="flex items-center justify-between px-4 py-2">
                                <p className="font-poppins text-sm font-medium text-primary-2">
                                  <span className="mr-1">{index + 1}.</span>
                                  <span>{subCategoryData.name.en}</span>
                                </p>
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
                                          // editClickHandler={() => {
                                          //   // setUpdateId(procedure.id);
                                          //   // setIsEditData(true);
                                          //   // setEditProcedureModalOpen(true);
                                          // }}
                                        >
                                          <div className="flex flex-wrap items-center">
                                            {Object.entries(
                                              procedure.reimbursement,
                                            ).map(([key, value]) => {
                                              return (
                                                <ReimbursementWrapper
                                                  key={key}
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
                            </ol>
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
                              // editClickHandler={() => {
                              //   // setUpdateId(procedure.id);
                              //   // setIsEditData(true);
                              //   // setEditProcedureModalOpen(true);
                              // }}
                              key={procedure.id}
                              title={procedure.name.en}
                            >
                              <div className="flex flex-wrap items-center">
                                {Object.entries(procedure.reimbursement).map(
                                  ([key, value]) => {
                                    return (
                                      <ReimbursementWrapper
                                        key={key}
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
