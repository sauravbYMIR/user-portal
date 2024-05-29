import type { StateCreator } from 'zustand';

export type CreateBookingInfoType = {
  selectedGender: string;
  setSelectedGender: (gender: string) => void;
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  selectedProcedure: string;
  setSelectedProcedure: (procedure: string) => void;
  selectedHospital: string;
  setSelectedHospital: (hospital: string) => void;
  selectedHospitalName: string;
  setSelectedHospitalName: (hospital: string) => void;
};

export const createBookingInfoSlice: StateCreator<CreateBookingInfoType> = (
  set,
) => ({
  selectedGender: '',
  setSelectedGender: (gender: string) =>
    set(() => ({ selectedGender: gender })),
  selectedCountry: '',
  setSelectedCountry: (country: string) =>
    set(() => ({ selectedCountry: country })),
  selectedProcedure: '',
  setSelectedProcedure: (procedure: string) =>
    set(() => ({ selectedProcedure: procedure })),
  selectedHospital: '',
  setSelectedHospital: (hospital: string) =>
    set(() => ({ selectedHospital: hospital })),
  selectedHospitalName: '',
  setSelectedHospitalName: (hospitalName: string) =>
    set(() => ({ selectedHospitalName: hospitalName })),
});

export type BookProcedureStepNumberType = {
  stepNumber: number;
  setStepNumber: (stepNumber: number) => void;
};

export const createBookingStepNumberSlice: StateCreator<
  BookProcedureStepNumberType
> = (set) => ({
  stepNumber: 1,
  setStepNumber: (num: number) => set(() => ({ stepNumber: num })),
});
