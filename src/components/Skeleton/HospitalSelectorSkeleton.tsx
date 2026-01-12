import React from 'react';
import type { IContentLoaderProps } from 'react-content-loader';
import ContentLoader from 'react-content-loader';

const HospitalSelectorSkeleton = (
  props: React.JSX.IntrinsicAttributes & IContentLoaderProps,
) => (
  <ContentLoader
    viewBox="0 0 1200 600"
    backgroundColor="rgba(243, 243, 233, 1)"
    foregroundColor="rgba(102, 167, 137, 1)"
    {...props}
  >
    <rect x="12" y="35" rx="0" ry="0" width="6" height="400" />
    <rect x="14" y="34" rx="0" ry="0" width="408" height="6" />
    <rect x="416" y="34" rx="0" ry="0" width="6" height="400" />
    <rect x="12" y="435" rx="0" ry="0" width="408" height="6" />

    <rect x="275" y="53" rx="6" ry="6" width="127" height="40" />
    <rect x="37" y="100" rx="7" ry="7" width="361" height="139" />
    <rect x="58" y="250" rx="0" ry="0" width="316" height="8" />
    <rect x="58" y="275" rx="0" ry="0" width="316" height="8" />
    <rect x="58" y="300" rx="0" ry="0" width="316" height="8" />
    <rect x="58" y="325" rx="0" ry="0" width="316" height="8" />
    <rect x="86" y="350" rx="0" ry="0" width="267" height="8" />
    <rect x="86" y="375" rx="0" ry="0" width="267" height="8" />
  </ContentLoader>
);

HospitalSelectorSkeleton.metadata = {
  name: 'Nitish Sharma',
  github: 'Nitz2611',
  description: 'Category with image and description',
  filename: 'CategoryLoader',
};

export default HospitalSelectorSkeleton;
