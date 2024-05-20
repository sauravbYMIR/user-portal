import type { StateCreator } from 'zustand';

export type AuthStatusType = {
  isLoginModalActive: boolean;
  setIsLoginModalActive: (loginStatus: boolean) => void;
  isOtpVerifyModalActive: boolean;
  setIsOtpVerifyModalActive: (otpStatus: boolean) => void;
};

export const AuthStatusSlice: StateCreator<AuthStatusType> = (set) => ({
  isLoginModalActive: false,
  setIsLoginModalActive: (loginStatus: boolean) =>
    set(() => ({ isLoginModalActive: loginStatus })),
  isOtpVerifyModalActive: false,
  setIsOtpVerifyModalActive: (otpStatus: boolean) =>
    set(() => ({ isOtpVerifyModalActive: otpStatus })),
});
