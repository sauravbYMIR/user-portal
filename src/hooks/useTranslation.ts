import * as translations from '@/locales/index';
import type { LangJSONType } from '@/types/component';
import { handleGetLocalStorage } from '@/utils/global';

function getNestedTranslation(
  selectedLanguage: LangJSONType,
  keys: Array<any>,
) {
  return keys?.reduce((obj, key) => {
    return obj?.[key];
  }, translations[selectedLanguage]);
}

export default function useTranslation() {
  const selectedLanguage = (handleGetLocalStorage({
    tokenKey: 'selected_language',
  }) ?? 'en') as unknown as LangJSONType;

  const translate = (key: string) => {
    const keys = key?.split('.');

    return getNestedTranslation(selectedLanguage, keys) ?? key;
  };

  return { t: translate };
}
