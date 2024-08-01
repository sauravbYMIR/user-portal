import React from 'react';
import ContentLoader from 'react-content-loader';

import { useScreenWidth } from '@/hooks/useScreenWidth';

const TaskListSkeleton = (props: any) => {
  const { matches } = useScreenWidth(936);
  return (
    <ContentLoader
      speed={2}
      width={matches ? 280 : 1000}
      height={160}
      viewBox={`0 0 ${matches ? 280 : 1000} 160`}
      backgroundColor="rgba(243, 243, 233, 1)"
      foregroundColor="rgba(102, 167, 137, 1)"
      {...props}
    >
      <rect x="50" y="6" rx="4" ry="4" width="1000" height="38" />
      <rect x="8" y="6" rx="4" ry="4" width="35" height="38" />
      <rect x="50" y="55" rx="4" ry="4" width="1000" height="38" />
      <rect x="8" y="55" rx="4" ry="4" width="35" height="38" />
      <rect x="50" y="104" rx="4" ry="4" width="1000" height="38" />
      <rect x="8" y="104" rx="4" ry="4" width="35" height="38" />
    </ContentLoader>
  );
};

TaskListSkeleton.metadata = {
  name: 'Saurav Biswas',
  github: 'saurav49',
  description: 'Loading a list of tasks.',
  filename: 'TaskListSkeleton',
};

export { TaskListSkeleton };
