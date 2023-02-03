import React from 'react';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { AuthDialog } from '../../src/features/Auth/Components/AuthDialog';
import { useLogout } from '../../src/features/Auth/hooks/useLogout';
import { AvatarUploader } from '../../src/shared/avatar/AvatarUploader/AvatarUploader';
import { BaseButton } from '../../src/shared/buttons/BaseButton';
import { userAuthData } from '../../store/atoms/user';

export default function UserPage() {
  const { authenticatedUser, } = useRecoilValue(userAuthData)
  const { logout } = useLogout();
  const { push } = useRouter()

  if (!authenticatedUser) {
    return <AuthDialog isOpen onClose={() => push('/')} />;
  }

  return (
    <div className="flex flex-grow flex-col p-3 dark:bg-dark-secondary dark:text-dark-grey">
      <h3 className="text-bold text-2xl">
        Hello{' '}
        <span className="capitalize font-extrabold">
          {authenticatedUser?.name}
        </span>
      </h3>
      <h5 className="mb-3">This is your personal page</h5>
      <p>You can upload avatar</p>
      <AvatarUploader />
      <BaseButton onClick={logout}>Logout</BaseButton>
    </div>
  );
}
