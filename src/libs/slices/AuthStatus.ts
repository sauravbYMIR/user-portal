import type { StateCreator } from 'zustand';

export type AuthStatusType = {
  isLoginModalActive: boolean;
  setIsLoginModalActive: (loginStatus: boolean) => void;
  isOtpVerifyModalActive: boolean;
  setIsOtpVerifyModalActive: (otpStatus: boolean) => void;
  isBankIdModalActive: boolean;
  setIsBankIdModalActive: (otpStatus: boolean) => void;
  authType: string;
  setAuthType: (authType: string) => void;
};

export const AuthStatusSlice: StateCreator<AuthStatusType> = (set) => ({
  isLoginModalActive: false,
  setIsLoginModalActive: (loginStatus: boolean) =>
    set(() => ({ isLoginModalActive: loginStatus })),
  isOtpVerifyModalActive: false,
  setIsOtpVerifyModalActive: (otpStatus: boolean) =>
    set(() => ({ isOtpVerifyModalActive: otpStatus })),
  isBankIdModalActive: false,
  setIsBankIdModalActive: (bankIdModalStatus: boolean) =>
    set(() => ({ isBankIdModalActive: bankIdModalStatus })),
  authType: '',
  setAuthType: (authTypeValue: string) =>
    set(() => ({ authType: authTypeValue })),
});
