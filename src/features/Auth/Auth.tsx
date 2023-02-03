import { gql } from 'graphql-request';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useGraphQL } from '../../helpers/graphql/useGraphQL';
import { Portal } from '../../helpers/react/Portal';
import { LoadingButton } from '../../shared/buttons/LoadingButton';
import { AuthDialog } from './Components/AuthDialog';
import { AuthenticatedItem } from './types';

const CheckAuthenticate = gql`
  query authenticate {
    authenticatedItem {
      __typename
      ... on User {
        id
        name
        theme
      }
    }
  }
`;

export function Auth() {
  const [isOpen, setOpen] = useState(false);
  const [isLoading, setLoading] = useState();
  // const { data, isLoading } = useGraphQL<AuthenticatedItem>();
  // const user = data?.authenticatedItem ;
  // const user = null;

  // if (user) {
  //   return (
  //     <>
  //       <LoadingButton isLoading={isLoading} color="primary" className="mr-3">
  //         {user.name}
  //       </LoadingButton>
  //       <Link href={`/user/${user.id}`}>Personal page</Link>
  //     </>
  //   );
  // }

  return (
    <>
      <LoadingButton
        isLoading={isLoading}
        color="primary"
        onClick={() => setOpen(true)}
        className="mr-3"
      >
        Login
      </LoadingButton>
      <Portal>
        <AuthDialog isOpen={isOpen} onClose={() => setOpen(false)} />
      </Portal>
    </>
  );
}
