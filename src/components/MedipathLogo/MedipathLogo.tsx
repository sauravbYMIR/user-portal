import Link from 'next/link';

import { brandName } from '@/utils/global';

const MedipathLogo = () => {
  return (
    <Link href="/book-procedure">
      <button
        type="button"
        className="text-3xl"
        style={{
          color: 'rgba(0, 70, 70, 1)',
        }}
      >
        {brandName}
        <p className="hidden">brand name</p>
      </button>
    </Link>
  );
};

export default MedipathLogo;
