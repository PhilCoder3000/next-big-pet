import { gql } from 'graphql-request';
import { graphqlClient } from '../../../helpers/graphql/client';
import { SignInUser } from '../Components/SignInBody';

export const useSignIn = () => {
  const signIn = (values: SignInUser) => {
    authenticateUser(values).then((data) => {
      if (data?.authenticateUserWithPassword?.item?.id) {
        window.location.reload();
      }
    });
  };

  return { signIn };
};

function authenticateUser({
  email,
  password,
}: SignInUser) {
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

  return graphqlClient.request(mutation, {
    email: email,
    password: password,
  });
}
