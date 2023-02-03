import { gql } from 'graphql-request';
import { useGraphQL } from '../../../helpers/graphql/useGraphQL';
import { SignInUser } from '../Components/SignInBody';
import { AuthenticatedItem } from '../types';

export const useSignIn = (
  setLoading: (arg: boolean) => void,
  setError: (arg: string) => void,
) => {
  const { request } = useGraphQL<AuthenticatedItem>();
  const signIn = async ({ email, password }: SignInUser) => {
    const data = await request(
      gql`
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
      `,
      {
        email,
        password,
      },
    );
    if (data) {
      // if ()
      // // window.location.reload();
    } else {
      setError('wrong password');
    }
  };

  return { signIn };
};
