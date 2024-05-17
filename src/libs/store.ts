import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import type { AuthStatusType } from './slices/AuthStatus';
import { AuthStatusSlice } from './slices/AuthStatus';
import type { CreateBookingInfoType } from './slices/CreateBookingInfo';
import { createBookingInfoSlice } from './slices/CreateBookingInfo';

type StoreState = CreateBookingInfoType & AuthStatusType;

export const useAppStore = create<StoreState>()(
  devtools((...a) => ({
    ...createBookingInfoSlice(...a),
    ...AuthStatusSlice(...a),
  })),
);
