import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import type { NameJSONType, ReimbursementJSONType } from './useDepartment';

export type HospitalMember = {
  id: string;
  position: NameJSONType;
  name: string;
  qualification: string;
  profilePictureUploaded: boolean;
  hospitalId: string;
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
};

export type HospitalProcedureByIdType = {
  createdAt: string | null;
  deletedAt: string | null;
  description: NameJSONType;
  cost: ReimbursementJSONType;
  hospitalId: string;
  id: string;
  hospitalMembers: Array<HospitalMember>;
  procedure: {
    category: {
      id: string;
      name: NameJSONType;
    };
    id: string;
    name: NameJSONType;
  };
  procedureId: string;
  stayInCity: string;
  stayInHospital: string;
  updatedAt: string | null;
  waitingTime: string;
};

export const getHospitalProcedureById = async (
  id: string,
): Promise<{
  status: number;
  success: boolean;
  data: HospitalProcedureByIdType;
}> => {
  const response = await axios.get<{
    status: number;
    success: boolean;
    data: HospitalProcedureByIdType;
  }>(`${process.env.BASE_URL}/hospital-procedure/procedure-details/${id}`);
  console.log(process, process.env.BASE_URL);
  return {
    success: response.data.success,
    status: response.data.status,
    data: response.data.data,
  };
};

export const useGetHospitalProcedureById = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [`hospital-procedure`, id],
    queryFn: () => getHospitalProcedureById(id),
    refetchOnWindowFocus: false,
    enabled: !!id,
  });
};
