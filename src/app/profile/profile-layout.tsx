import styles from '@/app/page.module.scss';
import { ProfileHeader } from '@/components/Header/ProfileHeader';

import ProfileWrapper from './ProfileWrapper';
import { SidebarWrapper } from './Sidebar';

type LayoutProps = {
  children: React.ReactNode;
  heading: string;
};

const ProfileLayout = ({ children, heading }: LayoutProps): JSX.Element => {
  return (
    <div className={styles.container}>
      <ProfileHeader showLogo />
      <ProfileWrapper>
        <SidebarWrapper />
        <div className="flex w-full flex-col items-start justify-center">
          <h2 className="mb-10 text-start font-poppins text-xl font-normal text-neutral-1 sxl:text-5xl sxl:font-medium">
            {heading}
          </h2>
          {children}
        </div>
      </ProfileWrapper>
    </div>
  );
};

export default ProfileLayout;
