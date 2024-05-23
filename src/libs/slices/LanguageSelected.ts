import type { StateCreator } from 'zustand';

import type { LocaleType } from '@/types/component';

export type LanguageSelectedType = {
  selectedLanguage: LocaleType;
  setSelectedLanguage: (language: LocaleType) => void;
};

export const LanguageSelectedSlice: StateCreator<LanguageSelectedType> = (
  set,
) => ({
  selectedLanguage: 'en',
  setSelectedLanguage: (language: LocaleType) =>
    set(() => ({ selectedLanguage: language })),
});
