import { gql } from 'graphql-request';
import React, { useEffect, useState } from 'react';
import { AuthButton } from '../../shared/buttons/AuthButton';
import { AuthDialog } from '../../shared/dialogs/AuthDialog';
import { graphqlClient } from '../../shared/graphql/client';
import { Portal } from '../../shared/reactHelpers/Portal';

interface AuthProps {
  uuid?: string;
}

export function Auth({ uuid }: AuthProps) {
  const [isOpen, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);
  console.log('🚀 ~ file: Auth.tsx:16 ~ Auth ~ user', user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  const login = () => {
    authenticateUser({ email, password }).then((data) => {
      if (data?.authenticateUserWithPassword?.item?.id) {
        window.location.reload();
      }
    });
  };

  const logout = () => {
    endUserSession().then((data) => {
      window.location.reload();
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    }
    if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  };

  return (
    <>
      <AuthButton color="primary" onClick={() => setOpen(true)}>
        Auth
      </AuthButton>
      <Portal>
        <AuthDialog
          isOpen={isOpen}
          onClose={() => setOpen(false)}
          email={email}
          password={password}
          handleChange={handleChange}
          login={login}
          logout={logout}
        />
      </Portal>
    </>
  );
}

function authenticateUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const mutation = gql`
    mutation authenticate($email: String!, $password: String!) {
      authenticateUserWithPassword(email: $email, password: $password) {
        ... on UserAuthenticationWithPasswordSuccess {
          item {
            id
            name
          }
        }
        ... on UserAuthenticationWithPasswordFailure {
          message
        }
      }
    }
  `;

  // session token is automatically saved to cookie
  return graphqlClient.request(mutation, {
    email: email,
    password: password,
  });
}

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
