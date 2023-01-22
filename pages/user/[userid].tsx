import { gql } from 'graphql-request';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { AuthDialog } from '../../src/features/Auth/Components/AuthDialog';
import { useLogout } from '../../src/features/Auth/hooks/useLogout';
import { AuthenticatedItem } from '../../src/features/Auth/types';
import { useGraphQL } from '../../src/helpers/graphql/useGraphQL';
import { AvatarUploader } from '../../src/shared/avatar/AvatarUploader/AvatarUploader';
import { BaseButton } from '../../src/shared/buttons/BaseButton';

export default function UserPage(props: any) {
  const { request, data: user, isLoading } = useGraphQL<AuthenticatedItem>();
  const { logout } = useLogout();
  const { push } = useRouter()

  useEffect(() => {
    request(gql`
      query authenticate {
        authenticatedItem {
          __typename
          ... on User {
            id
            name
          }
        }
      }
    `);
  }, [request]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!user?.authenticatedItem?.id) {
    return <AuthDialog isOpen onClose={() => push('/')} />;
  }

  return (
    <div className="flex flex-grow flex-col p-3 dark:bg-dark-secondary dark:text-dark-grey">
      <h3 className="text-bold text-2xl">
        Hello{' '}
        <span className="capitalize font-extrabold">
          {user?.authenticatedItem?.name}
        </span>
      </h3>
      <h5 className="mb-3">This is your personal page</h5>
      <p>You can upload avatar</p>
      <AvatarUploader />
      <BaseButton onClick={logout}>Logout</BaseButton>
    </div>
  );
}
