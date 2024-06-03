import { useQuery } from '@tanstack/react-query';

import { axiosInstance } from '@/utils/axiosInstance';

export type NameJSONType = {
  en: string;
  nb: string;
  da: string;
  sv: string;
};
export type ReimbursementJSONType = {
  ie: number;
  no: number;
  dk: number;
  se: number;
};
export type ProcedureType = {
  id: string;
  name: NameJSONType;
  reimbursement: ReimbursementJSONType;
  categoryId: string;
};
export type GetAllDepartmentWithProcedureType = {
  id: string;
  name: NameJSONType;
  subCategoryWithProcedures: Array<{
    id: string;
    name: NameJSONType;
    procedures: Array<ProcedureType>;
  }>;
  procedures: Array<ProcedureType>;
};
export type GetAllDepartmentWithProcedureResponseType = {
  success: boolean;
  status: number;
  data: { allCategoryWithProcedure: Array<GetAllDepartmentWithProcedureType> };
};

export const getAllDepartmentWithProcedure =
  async (): Promise<GetAllDepartmentWithProcedureResponseType> => {
    const response =
      await axiosInstance.get<GetAllDepartmentWithProcedureResponseType>(
        `${process.env.BASE_URL}/category/with-procedure`,
      );
    return {
      success: response.data.success,
      status: response.data.status,
      data: response.data.data,
    };
  };

export const useGetAllDepartmentWithProcedure = () => {
  return useQuery({
    queryKey: [`department-with-procedure`],
    queryFn: () => getAllDepartmentWithProcedure(),
    refetchOnWindowFocus: false,
  });
};
