import { gql } from 'graphql-request';
import { useCallback } from 'react';
import { useGraphQL } from '../../../helpers/graphql/useGraphQL';
import { SignInUser } from '../Components/SignInBody';

export const useSignIn = (
  setLoading: (arg: boolean) => void,
  setError: (arg: string) => void,
) => {
  const setData = useCallback((data: any) => {
    if (data?.authenticateUserWithPassword?.item?.id) {
      window.location.reload();
    } else {
      setError('wrong password');
    }
  }, [setError]);
  const { request } = useGraphQL({ setData, setLoading });
  const signIn = async ({ email, password }: SignInUser) => {
    request(
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
  };

  return { signIn };
};
