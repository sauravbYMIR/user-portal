import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import type { NameJSONType, ReimbursementJSONType } from './useDepartment';

export type HospitalMember = {
  id: string;
  position: NameJSONType;
  name: string;
  qualification: string;
  profilePictureUploaded: boolean;
  profile: string;
  hospitalId: string;
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
};

export type Hospital = {
  id: string;
  waitTime: string;
  hospitalName: string;
  city: string;
  country: string;
  hospitalDesc: NameJSONType;
  costOfProcedure: {
    price: number;
    currency: string;
  };
  reimBursementCost: ReimbursementJSONType;
  hospitalLogo: string | false;
};

export type HospitalProcedureByIdType = {
  createdAt: string | null;
  deletedAt: string | null;
  description: NameJSONType;
  cost: {
    price: number;
    currency: string;
  };
  hospitalId: string;
  id: string;
  hospitalMembers: Array<HospitalMember>;
  procedureMembers: Array<HospitalMember>;
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
  hospitalProcedureImages: Array<{
    id: string;
    hospitalProcedureId: string;
    imageUrl: string;
    fileName: string;
    originalFileName: string;
  }>;
  hospitalImages: Array<{
    id: string;
    hospitalId: string;
    fileName: string;
    originalFileName: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: null | string;
    imageUrl: string;
  }>;
  hospitalDescription: NameJSONType;
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

export const getHospitalByProcedureId = async (
  hospitalId: string,
): Promise<{
  status: number;
  success: boolean;
  data: Array<Hospital>;
}> => {
  const response = await axios.get<{
    status: number;
    success: boolean;
    data: Array<Hospital>;
  }>(`${process.env.BASE_URL}/hospital-procedure/hospitals/${hospitalId}`);
  return {
    success: response.data.success,
    status: response.data.status,
    data: response.data.data,
  };
};

export const useGetHospitalByProcedureId = ({
  hospitalId,
}: {
  hospitalId: string;
}) => {
  return useQuery({
    queryKey: [`hospital-procedure`, hospitalId],
    queryFn: () => getHospitalByProcedureId(hospitalId),
    refetchOnWindowFocus: false,
    enabled: !!hospitalId,
  });
};
