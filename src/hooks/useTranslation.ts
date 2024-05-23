import * as translations from '@/locales/index';
import type { LocaleType } from '@/types/component';
import { handleGetLocalStorage } from '@/utils/global';

function getNestedTranslation(selectedLanguage: LocaleType, keys: Array<any>) {
  return keys?.reduce((obj, key) => {
    return obj?.[key];
  }, translations[selectedLanguage]);
}

export default function useTranslation() {
  const selectedLanguage = (handleGetLocalStorage({
    tokenKey: 'selected_language',
  }) ?? 'en') as unknown as LocaleType;

  const translate = (key: string) => {
    const keys = key?.split('.');

    return getNestedTranslation(selectedLanguage, keys) ?? key;
  };

  return { t: translate };
}
