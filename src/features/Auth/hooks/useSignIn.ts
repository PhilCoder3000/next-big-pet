import { gql } from 'graphql-request';
import { useSetRecoilState } from 'recoil';
import { userAuthData } from '../../../../store/atoms/user/user';
import { useGraphQL } from '../../../helpers/graphql/useGraphQL';
import { SignInUser } from '../Components/SignInBody';
import { AuthenticatedItem } from '../types';

export const useSignIn = (
  setError: (arg: string) => void,
) => {
  const setUser = useSetRecoilState(userAuthData);
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
    if ('authenticateUserWithPassword' in data) {
      setUser((prev) => ({
        ...prev,
        isOpenModal: false,
        user: data.authenticateUserWithPassword,
      }));
    } else {
      setError('wrong password');
    }
  };

  return { signIn };
};
