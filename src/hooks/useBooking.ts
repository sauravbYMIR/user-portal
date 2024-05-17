import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { axiosInstance } from '@/utils/axiosInstance';

import type { NameJSONType } from './useDepartment';

export type BookingType = {
  id: string;
  procedureName: NameJSONType;
  hospitalName: string;
  city: string;
  country: string;
  hospitalStay: string;
  applicationStatus: string;
  waitTime: string;
};
export type BookingResponse = {
  data: Array<BookingType>;
  success: boolean;
  status: number;
};
export const createBooking = async ({
  hospitalProcedureId,
  userId,
  gender,
  claimCountry,
  patientPreferredStartDate,
  patientPreferredEndDate,
}: {
  hospitalProcedureId: string;
  userId: string;
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
    hospitalProcedureId,
    userId,
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
export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`bookings`],
      });
    },
    onError: (error) => {
      const err = error as unknown as {
        response: { data: { error: { message: string } } };
      };
      toast.error(`Something went wrong: ${err.response.data.error.message}`);
    },
  });
};
export const getBookingByUserId = async ({
  userId,
}: {
  userId: string;
}): Promise<BookingResponse> => {
  const response = await axiosInstance.get<BookingResponse>(
    `${process.env.BASE_URL}/bookings/${userId}`,
  );
  return {
    success: response.data.success,
    status: response.data.status,
    data: response.data.data,
  };
};
export const useGetBookingByUserId = (userId: string) => {
  return useQuery({
    queryKey: [`bookings`, userId],
    queryFn: () => getBookingByUserId({ userId }),
    refetchOnWindowFocus: false,
  });
};

export const getBookingDetails = async ({
  bookingId,
}: {
  bookingId: string;
}): Promise<any> => {
  const response = await axiosInstance.get<any>(
    `${process.env.BASE_URL}/bookings/booking-detail/${bookingId}`,
  );
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

export const updateElgsightStatus = async ({
  bookingId,
  status,
}: {
  bookingId: string;
  status: string;
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
export const useUpdateElgsightStatus = (bookingId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateElgsightStatus,
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
