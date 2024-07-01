import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { axiosInstance } from '@/utils/axiosInstance';
import {
  handleGetLocalStorage,
  handleRemoveFromLocalStorage,
} from '@/utils/global';

import type { NameJSONType, ReimbursementJSONType } from './useDepartment';

export type BookingType = {
  id: string;
  procedureName: NameJSONType;
  hospitalName: string;
  city: string;
  country: string;
  hospitalStay: string;
  applicationStatus: string;
  waitTime: string;
  elfsightStatus: boolean;
};
export type BookingResponse = {
  data: Array<BookingType>;
  success: boolean;
  status: number;
};

export type ApplicationBookingStatusType =
  | 'rejected'
  | 'accepted'
  | 'requested';

export type BookingDetailType = {
  id: string;
  gender: string;
  claimCountry: string;
  applicationDate: string;
  preferredLanguage: string;
  procedureName: NameJSONType;
  patientPreferredStartDate: string;
  patientPreferredEndDate: string;
  applicationStatus: ApplicationBookingStatusType;
  hospitalName: string;
  elfSightScript: null | NameJSONType;
  hospitalStay: string;
  waitTime: string;
  costOfProcedure: { price: number; currency: string };
  reimbursementCost: ReimbursementJSONType;
  elfSightFormSubmitStatus: boolean;
  cityStay: string;
  hubspotCompanyId: string;
  user: {
    email: string;
    hubspotUserId: string;
  };
};
export const createBooking = async ({
  procedureId,
  gender,
  claimCountry,
  patientPreferredStartDate,
  patientPreferredEndDate,
}: {
  procedureId: string;
  gender: string;
  claimCountry: string;
  patientPreferredStartDate: Date;
  patientPreferredEndDate: Date;
}): Promise<{ success: boolean; status: number; data: { id: string } }> => {
  const response = await axiosInstance.post<{
    success: boolean;
    status: number;
    data: string;
  }>(`${process.env.BASE_URL}/bookings`, {
    procedureId,
    gender,
    claimCountry,
    patientPreferredStartDate,
    patientPreferredEndDate,
  });
  return {
    success: response.data.success,
    status: response.data.status,
    data: { id: response.data.data },
  };
};
export const useCreateBooking = ({
  selectedHospitalName,
}: {
  selectedHospitalName: string;
}) => {
  const selectedHospitalNameFromLocalStorage = handleGetLocalStorage({
    tokenKey: 'selected_hospital_name',
  });
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`bookings`],
      });
      [
        'selected_gender',
        'selected_country',
        'selected_procedure',
        'selected_hospital',
        'start_date',
        'end_date',
        'flow_type',
        'selected_hospital_name',
      ].map((key) => handleRemoveFromLocalStorage({ tokenKey: key }));
      if (selectedHospitalName || selectedHospitalNameFromLocalStorage) {
        router.push(
          `/booking-success/?name=${selectedHospitalName || selectedHospitalNameFromLocalStorage}`,
        );
      }
    },
    onError: (error) => {
      const err = error as unknown as {
        response: { data: { error: { message: string } } };
      };
      toast.error(`Something went wrong: ${err.response.data.error.message}`);
    },
  });
};
export const getBookingByUserId = async (): Promise<BookingResponse> => {
  const response = await axiosInstance.get<BookingResponse>(
    `${process.env.BASE_URL}/bookings/get-booking-details-by-user`,
  );
  return {
    success: response.data.success,
    status: response.data.status,
    data: response.data.data,
  };
};
export const useGetBookingByUserId = () => {
  return useQuery({
    queryKey: [`bookings`],
    queryFn: () => getBookingByUserId(),
    refetchOnWindowFocus: false,
  });
};

export const getBookingDetails = async ({
  bookingId,
}: {
  bookingId: string;
}): Promise<{ success: boolean; status: number; data: BookingDetailType }> => {
  const response = await axiosInstance.get<{
    success: boolean;
    status: number;
    data: BookingDetailType;
  }>(`${process.env.BASE_URL}/bookings/booking-detail/${bookingId}`);
  return {
    success: response.data.success,
    status: response.data.status,
    data: response.data.data,
  };
};
export const useGetBookingDetails = (bookingId: string) => {
  return useQuery({
    queryKey: [`bookings`, `booking-detail`, bookingId],
    queryFn: () => getBookingDetails({ bookingId }),
    refetchOnWindowFocus: false,
  });
};

export const updateElfsightStatus = async ({
  bookingId,
  status,
}: {
  bookingId: string;
  status: boolean;
}): Promise<any> => {
  await axiosInstance.patch<any>(
    `${process.env.BASE_URL}/bookings/update-elfsight-status/${bookingId}`,
    {
      status,
    },
  );
  return {
    success: true,
  };
};
export const useUpdateElfsightStatus = (bookingId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateElfsightStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`bookings`, `booking-detail`, bookingId],
      });
    },
    onError: (error) => {
      toast(`Something went wrong: ${error.message}`);
    },
  });
};
