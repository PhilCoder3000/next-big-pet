import { gql } from 'graphql-request';
import React, { useEffect, useState } from 'react';
import { graphqlClient } from '../../helpers/graphql/client';
import { Portal } from '../../helpers/react/Portal';
import { LoadingButton } from '../../shared/buttons/LoadingButton';
import { AuthDialog } from './Components/AuthDialog';

interface AuthProps {
  uuid?: string;
}

export function Auth({ uuid }: AuthProps) {
  const [isOpen, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    getCurrentLoggedInUser()
      .then((data) => {
        if (data?.authenticatedItem?.id) {
          setUser(data.authenticatedItem);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);



  return (
    <>
      <LoadingButton isLoading={isLoading} color="primary" onClick={() => setOpen(true)} className="mr-3">
        Auth
      </LoadingButton>
      <Portal>
        <AuthDialog
          isOpen={isOpen}
          onClose={() => setOpen(false)}
        />
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

function getCurrentLoggedInUser() {
  const query = gql`
    query authenticate {
      authenticatedItem {
        __typename
        ... on User {
          id
          name
        }
      }
    }
  `;

  // session token is automatically accessed from cookie
  return graphqlClient.request(query);
}
