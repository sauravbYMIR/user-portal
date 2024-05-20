import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import axios from 'axios';

import { axiosInstance } from '@/utils/axiosInstance';

export type ServerError = {
  error: {
    error: string;
    message: string;
    statusCode: number;
  };
};
export const createUser = async ({
  email,
  phoneNumber,
  preferedLanguage,
}: {
  email: string;
  phoneNumber: string;
  preferedLanguage: string;
}) => {
  try {
    const response = await axios.post(`${process.env.BASE_URL}/user`, {
      email,
      phoneNumber,
      preferedLanguage,
    });
    return {
      success: true,
      data: {
        token: response.data.token,
      },
    };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const serverError = err as AxiosError<{
        error: {
          error: string;
          message: string;
          statusCode: number;
        };
      }>;
      if (
        serverError &&
        serverError.response &&
        serverError.response.data.error.message
      ) {
        throw new Error(serverError.response.data.error.message);
      }
    }
    throw new Error('create-user-failed');
  }
};
export const verifyOtp = async ({
  otp,
  token,
}: {
  otp: string;
  token: string;
}) => {
  try {
    const response = await axios.post(
      `${process.env.BASE_URL}/user/verify-otp`,
      {
        otp,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return {
      success: true,
      data: {
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        userId: response.data.userId,
      },
    };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const serverError = err as AxiosError<ServerError>;

      if (
        serverError &&
        serverError.response &&
        serverError.response.data.error.message
      ) {
        throw new Error(serverError.response.data.error.message);
      }
    }
    throw new Error('otp-verification-failed');
  }
};
export const resendOtp = async () => {
  try {
    const response = await axios.get(`${process.env.BASE_URL}/user/resend-otp`);
    return {
      success: response.data.success,
    };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const serverError = err as AxiosError<ServerError>;

      if (
        serverError &&
        serverError.response &&
        serverError.response.data.error.message
      ) {
        throw new Error(serverError.response.data.error.message);
      }
    }
    throw new Error('resend-otp-failed');
  }
};
export const userlogin = async ({ phoneNumber }: { phoneNumber: string }) => {
  try {
    const response = await axios.post(
      `${process.env.BASE_URL}/auth/user/login`,
      {
        phoneNumber,
      },
    );
    return {
      success: true,
      data: {
        token: response.data.token,
      },
    };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const serverError = err as AxiosError<{
        error: {
          error: string;
          message: string;
          statusCode: number;
        };
      }>;
      if (
        serverError &&
        serverError.response &&
        serverError.response.data.error.message
      ) {
        throw new Error(serverError.response.data.error.message);
      }
    }
    throw new Error('user-login-failed');
  }
};
export const getUserDetails = async () => {
  const response = (await axiosInstance.get(
    `${process.env.BASE_URL}/user/me`,
  )) as {
    data: {
      data: {
        createdAt: string;
        deletedAt: string;
        email: string;
        id: string;
        phoneNumber: string;
        preferedLanguage: string;
        role: string;
        updatedAt: string;
      };
      status: number;
      success: boolean;
    };
  };
  return {
    success: response.data.success,
    status: response.data.status,
    data: response.data.data,
  };
};
export const useGetUserDetails = () => {
  return useQuery({
    queryKey: [`user`],
    queryFn: () => getUserDetails(),
    refetchOnWindowFocus: false,
  });
};
