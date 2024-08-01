import Image from 'next/image';

import sampleProfile from '@/public/assets/icons/sampleProfile.svg';

function TeamMemberCard({
  name,
  role,
  profile,
}: {
  name: string;
  role: string;
  profile: string | false;
}) {
  return (
    <div
      className="flex items-start rounded-xl border border-neutral-5 py-5 pl-5 pr-10"
      style={{
        boxShadow: '2px 2px 4px 1px rgba(9, 111, 144, 0.1)',
      }}
    >
      {profile && typeof profile === 'string' ? (
        <Image
          src={profile}
          width={35}
          height={35}
          unoptimized
          priority
          alt="sample profile image"
          className="size-12 rounded-full"
        />
      ) : (
        <Image
          src={sampleProfile}
          alt="sample profile image"
          className="size-12 rounded-full"
        />
      )}
      <div className="ml-3 flex flex-col items-start">
        <p className="font-onsite text-xl font-medium text-neutral-1">{name}</p>
        <p className="font-onsite text-base font-light text-neutral-2">
          {role}
        </p>
      </div>
    </div>
  );
}

export { TeamMemberCard };
