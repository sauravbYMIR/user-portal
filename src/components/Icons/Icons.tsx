import React from 'react';

const CloseIcon = ({
  className,
  stroke,
}: {
  className?: string;
  stroke?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={stroke ?? 'currentColor'}
      className={className ?? 'size-6'}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  );
};
const ArrowIcon = ({
  className,
  stroke,
}: {
  className?: string;
  stroke?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={stroke ?? 'currentColor'}
      className={className ?? 'size-6'}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
      />
    </svg>
  );
};
const ArrowBackIcon = ({
  className,
  stroke,
  width,
}: {
  className?: string;
  stroke?: string;
  width?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={width ?? '1.5'}
      stroke={stroke ?? 'currentColor'}
      className={className ?? 'size-6'}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
      />
    </svg>
  );
};
const HospitalIcon = ({
  className,
  stroke,
  width,
}: {
  className?: string;
  stroke?: string;
  width?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={width ?? '1.5'}
      stroke={stroke ?? 'currentColor'}
      className={className ?? 'size-6'}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
      />
    </svg>
  );
};
const ArrowNextIcon = ({
  className,
  stroke,
  width,
}: {
  className?: string;
  stroke?: string;
  width?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={width ?? '1.5'}
      stroke={stroke ?? 'currentColor'}
      className={className ?? 'size-6'}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6.75 19.5 12m0 0-3.75 3.75M19.5 12H3"
      />
    </svg>
  );
};
const ProfileIcon = ({
  className,
  stroke,
  fill,
}: {
  className?: string;
  stroke?: string;
  fill?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={fill ?? 'none'}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={stroke ?? 'currentColor'}
      className={className ?? 'size-6'}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
      />
    </svg>
  );
};
const ArrowDownIcon = ({
  className,
  stroke,
  fill,
  width,
}: {
  className?: string;
  stroke?: string;
  fill?: string;
  width?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={fill ?? 'none'}
      viewBox="0 0 24 24"
      strokeWidth={width ?? '1.5'}
      stroke={stroke ?? 'currentColor'}
      className={className ?? 'size-6'}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m19.5 8.25-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
};
function SearchIcon({
  className,
  stroke,
}: {
  className?: string;
  stroke?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={stroke ?? 'currentColor'}
      className={className ?? 'size-6'}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
      />
    </svg>
  );
}

export {
  ArrowBackIcon,
  ArrowDownIcon,
  ArrowIcon,
  ArrowNextIcon,
  CloseIcon,
  HospitalIcon,
  ProfileIcon,
  SearchIcon,
};
