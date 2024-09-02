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
function BackArrowIcon({
  className,
  strokeWidth,
  stroke,
}: {
  className?: string;
  strokeWidth?: string;
  stroke?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth ?? 1.5}
      stroke={stroke ?? 'currentColor'}
      className={className ?? 'size-6'}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
      />
    </svg>
  );
}
function BackShortArrowIcon({
  className,
  strokeWidth,
  stroke,
}: {
  className?: string;
  strokeWidth?: string;
  stroke?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth ?? 1.5}
      stroke={stroke ?? 'currentColor'}
      className={className ?? 'size-6'}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
      />
    </svg>
  );
}
function CheckIcon({
  className,
  strokeWidth,
  stroke,
}: {
  className?: string;
  strokeWidth?: string;
  stroke?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth ?? 1.5}
      stroke={stroke ?? 'currentColor'}
      className={className ?? 'size-6'}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 12.75 6 6 9-13.5"
      />
    </svg>
  );
}
function QuestionIcon({
  className,
  strokeWidth,
  stroke,
}: {
  className?: string;
  strokeWidth?: string;
  stroke?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth ?? 1.5}
      stroke={stroke ?? 'currentColor'}
      className={className ?? 'size-6'}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
      />
    </svg>
  );
}
function ExternalLinkIcon({
  className,
  strokeWidth,
  stroke,
}: {
  className?: string;
  strokeWidth?: string;
  stroke?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth ?? 1.5}
      stroke={stroke ?? 'currentColor'}
      className={className ?? 'size-6'}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
      />
    </svg>
  );
}
function ExclamationCircleIcon({
  className,
  strokeWidth,
  stroke,
}: {
  className?: string;
  strokeWidth?: string;
  stroke?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth ?? 1.5}
      stroke={stroke ?? 'currentColor'}
      className={className ?? 'size-6'}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
      />
    </svg>
  );
}
function CalendarIcon({
  className,
  strokeWidth,
  stroke,
}: {
  className?: string;
  strokeWidth?: string;
  stroke?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth ?? 1.5}
      stroke={stroke ?? 'currentColor'}
      className={className ?? 'size-6'}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
      />
    </svg>
  );
}

export {
  ArrowBackIcon,
  ArrowDownIcon,
  ArrowIcon,
  ArrowNextIcon,
  BackArrowIcon,
  BackShortArrowIcon,
  CalendarIcon,
  CheckIcon,
  CloseIcon,
  ExclamationCircleIcon,
  ExternalLinkIcon,
  HospitalIcon,
  ProfileIcon,
  QuestionIcon,
  SearchIcon,
};
