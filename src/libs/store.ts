import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import type { AuthStatusType } from './slices/AuthStatus';
import { AuthStatusSlice } from './slices/AuthStatus';
import type {
  BookProcedureStepNumberType,
  CreateBookingInfoType,
} from './slices/CreateBookingInfo';
import {
  createBookingInfoSlice,
  createBookingStepNumberSlice,
} from './slices/CreateBookingInfo';

type StoreState = CreateBookingInfoType &
  AuthStatusType &
  BookProcedureStepNumberType;

export const useAppStore = create<StoreState>()(
  devtools((...a) => ({
    ...createBookingInfoSlice(...a),
    ...AuthStatusSlice(...a),
    ...createBookingStepNumberSlice(...a),
  })),
);
