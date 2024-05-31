import styles from '@/app/page.module.scss';
import { ProfileHeader } from '@/components/Header/ProfileHeader';

import Sidebar from './Sidebar';

type LayoutProps = {
  children: React.ReactNode;
  heading: string;
};

const ProfileLayout = ({ children, heading }: LayoutProps): JSX.Element => {
  return (
    <div className={styles.container}>
      <ProfileHeader showLogo />
      <div className="mt-[100px] flex gap-16 px-20">
        <Sidebar />
        <div className="flex flex-col items-start justify-center ">
          <h2 className="text-start font-poppins text-5xl font-normal text-neutral-1">
            {heading}
          </h2>
          <div className="flex justify-between">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
