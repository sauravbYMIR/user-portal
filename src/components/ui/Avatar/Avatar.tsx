import * as AvatarPrimitive from '@radix-ui/react-avatar';
import * as React from 'react';

import styles from './Avatar.module.scss';

const FbtAvatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={`${styles.avatar} ${className ?? ''}`}
    {...props}
  />
));

FbtAvatar.displayName = AvatarPrimitive.Root.displayName;

const FbtAvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={`${styles.avatarImage} ${className ?? ''}`}
    {...props}
  />
));
FbtAvatarImage.displayName = AvatarPrimitive.Image.displayName;

const FbtAvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => {
  return (
    <div>
      {props.children ? (
        <AvatarPrimitive.Fallback
          ref={ref}
          className={`${styles.avatarFallback} ${className ?? ''}`}
          {...props}
        />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={styles.avatarDefaultImage}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
      )}
    </div>
  );
});
FbtAvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

const FbtAvatarContainer = ({
  children,
  name,
  username,
  className,
}: {
  children: React.ReactNode;
  name?: string;
  username?: string;
  className?: string;
}) => {
  return (
    <div className={`${styles.avatarContainer} ${className ?? ''}`}>
      {children}
      {(name || username) && (
        <div className={`${styles.avatarInfoContainer}`}>
          {name && <span className={`${styles.avatarInfoName}`}>{name}</span>}
          {username && (
            <span className={`${styles.avatarInfoUsername}`}>@{username}</span>
          )}
        </div>
      )}
    </div>
  );
};

const FbtAvatarStatus = ({ status }: { status: string }) => (
  <span className={`${styles.avatarStatus} ${styles[status]}`} id={status} />
);
export {
  FbtAvatar,
  FbtAvatarContainer,
  FbtAvatarFallback,
  FbtAvatarImage,
  FbtAvatarStatus,
};
