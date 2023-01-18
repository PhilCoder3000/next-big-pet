import { User } from '@prisma/client';
import { gql } from 'graphql-request';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { graphqlClient } from '../../helpers/graphql/client';
import { useGraphQL } from '../../helpers/graphql/useGraphQL';
import { Portal } from '../../helpers/react/Portal';
import { LoadingButton } from '../../shared/buttons/LoadingButton';
import { AuthDialog } from './Components/AuthDialog';
import { AuthenticatedItem } from './types';

export function Auth() {
  const [isOpen, setOpen] = useState(false);
  const { request, data, isLoading } = useGraphQL<AuthenticatedItem>();
  const user = data?.authenticatedItem || null;

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

  if (user) {
    return (
      <>
        <LoadingButton isLoading={isLoading} color="primary" className="mr-3">
          {user.name}
        </LoadingButton>
        <Link href={`/user/${user.id}`}>Personal page</Link>
      </>
    );
  }

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

const logout = () => {
  endUserSession().then((data) => {
    window.location.reload();
  });
};

function endUserSession() {
  const mutation = gql`
    mutation endUserSession {
      endSession
    }
  `;

  return graphqlClient.request(mutation);
}
