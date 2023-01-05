import { User } from '@prisma/client';
import { createEvent, createStore, combine } from 'effector';
import { useStore } from 'effector-react';
import { gql } from 'graphql-request';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { graphqlClient } from '../../helpers/graphql/client';
import { Portal } from '../../helpers/react/Portal';
import { $counter, plus } from '../../models/user/init';
import { LoadingButton } from '../../shared/buttons/LoadingButton';
import { AuthDialog } from './Components/AuthDialog';

interface AuthProps {
  uuid?: string;
}

export function Auth({ uuid }: AuthProps) {
  const [isOpen, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const counter = useStore($counter)
  console.log('🚀 ~ file: Auth.tsx:28 ~ Auth ~ counter', counter);

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
        onClick={() => plus()}
        // onClick={() => setOpen(true)}
        className="mr-3"
      >
        Auth
        {counter}
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
