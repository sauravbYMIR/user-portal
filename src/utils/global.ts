import denmarkFlag from '@/public/assets/icons/denmarkFlag.svg';
import irelandFlag from '@/public/assets/icons/ireland.svg';
import norwayFlag from '@/public/assets/icons/norwayFlag.svg';
import swedenFlag from '@/public/assets/icons/swedenFlag.svg';
import swedenBankId from '@/public/assets/images/bankIdImg.svg';
import norwayBankId from '@/public/assets/images/bankIdNor.svg';
import denmarkBankId from '@/public/assets/images/denBankId.svg';
import type { LanguagesType } from '@/types/component';

export type CountryCodeType = 'ie' | 'no' | 'dk' | 'se';

type CountryData = {
  name: string;
  language: LanguagesType;
  locale: string;
  currency: string;
  countryCode: string;
  flagIcon: string;
  bankIdIcon: string;
  workflowId: string;
};

interface IntialLanguagesDataType {
  English: string;
  Norwegian: string;
  Danish: string;
  Swedish: string;
}

export const bankIdModalMsg = {
  ie: 'Use Veriff',
  no: 'Use bankID',
  dk: 'use MitID',
  se: 'Use bankID',
};

const countryData: CountryData[] = [
  {
    name: 'Ireland',
    language: 'English',
    locale: 'en',
    currency: 'EUR',
    countryCode: 'ie',
    flagIcon: irelandFlag,
    bankIdIcon: norwayBankId,
    workflowId: 'bits:workflow::e248a2a3-4453-4c01-913a-70f656461fbc',
  },
  {
    name: 'Norway',
    language: 'Norwegian',
    locale: 'nb',
    currency: 'NOK',
    countryCode: 'no',
    flagIcon: norwayFlag,
    bankIdIcon: norwayBankId,
    workflowId: 'bits:workflow::e248a2a3-4453-4c01-913a-70f656461fbc',
  },
  {
    name: 'Denmark',
    language: 'Danish',
    locale: 'da',
    currency: 'DKK',
    countryCode: 'dk',
    flagIcon: denmarkFlag,
    bankIdIcon: denmarkBankId,
    workflowId: 'bits:workflow::e248a2a3-4453-4c01-913a-70f656461fbc',
  },
  {
    name: 'Sweden',
    language: 'Swedish',
    locale: 'sv',
    currency: 'SEK',
    countryCode: 'se',
    flagIcon: swedenFlag,
    bankIdIcon: swedenBankId,
    workflowId: 'bits:workflow::e248a2a3-4453-4c01-913a-70f656461fbc',
  },
];

const intialLanguagesData: IntialLanguagesDataType = {
  English: '',
  Norwegian: '',
  Danish: '',
  Swedish: '',
};

const handleSetLocalStorage = ({
  tokenKey,
  tokenValue,
}: {
  tokenKey: string;
  tokenValue: string;
}) => {
  if (typeof window !== 'undefined') {
    return localStorage.setItem(tokenKey, tokenValue);
  }
  return null;
};

const handleGetLocalStorage = ({ tokenKey }: { tokenKey: string }) => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(tokenKey);
  }
  return null;
};

const handleRemoveFromLocalStorage = ({ tokenKey }: { tokenKey: string }) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(tokenKey);
  }
};

const handleLogOut = () => {
  [
    'access_token',
    'refresh_token',
    'user_id',
    'otp_verify_token',
    'selected_gender',
    'selected_country',
    'selected_procedure',
    'selected_hospital',
    'start_date',
    'end_date',
  ].map((key) => handleRemoveFromLocalStorage({ tokenKey: key }));
};

const getMonth = (date: string | Date) => {
  const monthNum = new Date(date).getMonth() + 1;
  const month = {
    '1': 'Jan',
    '2': 'Feb',
    '3': 'Mar',
    '4': 'Apr',
    '5': 'May',
    '6': 'Jun',
    '7': 'Aug',
    '8': 'Sept',
    '9': 'Oct',
    '10': 'Nov',
    '11': 'Dec',
  };

  return month[monthNum.toString() as keyof typeof month];
};

const convertToValidCurrency = ({
  locale,
  price,
  currency,
}: {
  locale: string;
  price: number;
  currency: string;
}) => price.toLocaleString(locale, { style: 'currency', currency });
const LOGIN = 'LOGIN';
const SIGNUP = 'SIGNUP';

export {
  convertToValidCurrency,
  countryData,
  getMonth,
  handleGetLocalStorage,
  handleLogOut,
  handleRemoveFromLocalStorage,
  handleSetLocalStorage,
  intialLanguagesData,
  LOGIN,
  SIGNUP,
};
