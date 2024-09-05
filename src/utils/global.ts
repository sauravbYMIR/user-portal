import posthog from 'posthog-js';

import cardiology from '@/public/assets/icons/cardiology.svg';
import denmarkFlag from '@/public/assets/icons/denmarkFlag.svg';
import earnosethroatIcon from '@/public/assets/icons/earnosethroatIcon.svg';
import estoniaFlag from '@/public/assets/icons/estoniaFlag.svg';
import eyeIcon from '@/public/assets/icons/eyeIcon.svg';
import finlandFlag from '@/public/assets/icons/finlandFlag.svg';
import generalsurgeryIcon from '@/public/assets/icons/generalsurgeryIcon.svg';
import irelandFlag from '@/public/assets/icons/ireland.svg';
import latviaFlag from '@/public/assets/icons/latviaFlag.svg';
import lithuaniaFlag from '@/public/assets/icons/lithuaniaFlag.svg';
import netherlandFlag from '@/public/assets/icons/netherlandFlag.svg';
import norwayBankId from '@/public/assets/icons/norBankid.svg';
import norwayFlag from '@/public/assets/icons/norwayFlag.svg';
import orthopeadicIcon from '@/public/assets/icons/orthopeadicIcon.svg';
import plasticsurgeryIcon from '@/public/assets/icons/plasticsurgeryIcon.svg';
import spine from '@/public/assets/icons/spine.svg';
import swedenFlag from '@/public/assets/icons/swedenFlag.svg';
import urologyIcon from '@/public/assets/icons/urologyIcon.svg';
import womenhealthIcon from '@/public/assets/icons/womenhealthIcon.svg';
import swedenBankId from '@/public/assets/images/bankIdImg.svg';
import ireBankId from '@/public/assets/images/bankIdNor.svg';
import denmarkBankId from '@/public/assets/images/denBankId.svg';
import type { LanguagesType } from '@/types/component';

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

export const bankIdModalMsg = {
  ie: 'Use Veriff',
  no: 'Use bankID',
  dk: 'use MitID',
  se: 'Use bankID',
};

export const procedureAndIcon = {
  Orthopedic: {
    icon: orthopeadicIcon,
  },
  Urology: {
    icon: urologyIcon,
  },
  "Women's Health": {
    icon: womenhealthIcon,
  },
  'General surgery': {
    icon: generalsurgeryIcon,
  },
  'Ear, nose and throat (ENT)': {
    icon: earnosethroatIcon,
  },
  Eye: {
    icon: eyeIcon,
  },
  'Plastic surgery': {
    icon: plasticsurgeryIcon,
  },
  Cardiology: {
    icon: cardiology,
  },
  Back: {
    icon: spine,
  },
};

const countryData: CountryData[] = [
  {
    name: 'Ireland',
    language: 'English',
    locale: 'en',
    currency: 'EUR',
    countryCode: 'ie',
    flagIcon: irelandFlag,
    bankIdIcon: ireBankId,
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
  {
    name: 'Netherlands',
    language: 'Dutch',
    locale: 'nl',
    currency: 'EUR',
    countryCode: 'nl',
    flagIcon: netherlandFlag,
    workflowId: '',
    bankIdIcon: '',
  },
  {
    name: 'Finland',
    language: 'Finnish',
    locale: 'fi',
    currency: 'EUR',
    countryCode: 'fi',
    flagIcon: finlandFlag,
    workflowId: '',
    bankIdIcon: '',
  },
  {
    name: 'Latvia',
    language: 'Latvian',
    locale: 'lv',
    currency: 'EUR',
    countryCode: 'lv',
    flagIcon: latviaFlag,
    workflowId: '',
    bankIdIcon: '',
  },
  {
    name: 'Lithuania',
    language: 'Lithuanian',
    locale: 'lt',
    currency: 'EUR',
    countryCode: 'lt',
    flagIcon: lithuaniaFlag,
    workflowId: '',
    bankIdIcon: '',
  },
  {
    name: 'Estonia',
    language: 'Estonian',
    locale: 'et',
    currency: 'EUR',
    countryCode: 'ee',
    flagIcon: estoniaFlag,
    workflowId: '',
    bankIdIcon: '',
  },
];

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
    'flow_type',
    'selected_hospital_name',
    'phone_number',
  ].map((key) => handleRemoveFromLocalStorage({ tokenKey: key }));
  posthog.reset();
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
    '7': 'Jul',
    '8': 'Aug',
    '9': 'Sept',
    '10': 'Oct',
    '11': 'Nov',
    '12': 'Dec',
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
}) => {
  return price
    ? price.toLocaleString(locale, { style: 'currency', currency })
    : '';
};
const LOGIN = 'LOGIN';
const SIGNUP = 'SIGNUP';
const BOOKING = 'BOOKING';

export const excludeProcedure = [`Women's Health`];

export {
  BOOKING,
  convertToValidCurrency,
  countryData,
  getMonth,
  handleGetLocalStorage,
  handleLogOut,
  handleRemoveFromLocalStorage,
  handleSetLocalStorage,
  LOGIN,
  SIGNUP,
};

// const browserLanguage = navigator.language;
//       const languageCodes = {
//         "nb-NO": { locale: "nb" },
//         "nn-NO": { locale: "nb" },
//         "en-US": { locale: "en" },
//         "en-GB": { locale: "en" },
//         "da-DK": { locale: "da" },
//         "sv-SE": { locale: "sv" },
//         "nl-NL": { locale: "nl" },
//         "fi-FI": { locale: "fi" },
//         "lv-LV": { locale: "lv" },
//         "lt-LT": { locale: "lt" },
//         "et-EE": { locale: "et" },
//       };

//        if(languageCodes[browserLanguage] && languageCodes[browserLanguage]?.locale){
//       	sendDataToNextJSApp(languageCodes[browserLanguage]?.locale)
//       }
