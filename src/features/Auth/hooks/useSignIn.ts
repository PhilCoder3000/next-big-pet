import { gql } from 'graphql-request';
import { graphqlClient } from '../../../helpers/graphql/client';

export const useSignIn = (email?: string, password?: string) => {

  const login = () => {
    if (isValid(email, password)) {
      authenticateUser({ email: email!, password: password! }).then((data) => {
        if (data?.authenticateUserWithPassword?.item?.id) {
          window.location.reload();
        }
      });
    }
  };

  return { login };
};

const isValid = (email?: string, password?: string) => {
  if (email && password) {
    return true;
  }
  return false;
};

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
