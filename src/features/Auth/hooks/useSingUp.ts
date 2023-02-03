import { gql } from 'graphql-request';
import { useSetRecoilState } from 'recoil';
import { userAuthData } from '../../../../store/atoms/user';
import { useGraphQL } from '../../../helpers/graphql/useGraphQL';
import { SignUpUser } from '../Components/SignUpBody';
import { AuthenticatedItem } from '../types';

export const useSignUp = (setLoading: (arg: boolean) => void) => {
  const setUser = useSetRecoilState(userAuthData);
  const { request } = useGraphQL<AuthenticatedItem>();
  const signUp = async ({ name, email, password }: SignUpUser) => {
    setLoading(true);
    const res = await request(
      gql`
        mutation ($data: UserCreateInput!) {
          createUser(data: $data) {
            id
            name
            email
            isAdmin
            theme
          }
        }
      `,
      {
        data: {
          isAdmin: false,
          name,
          email,
          password,
        },
      },
    );
    if ('createUser' in res) {
      setUser((prev) => ({
        ...prev,
        authenticatedUser: res.createUser,
      }));
    }
    setLoading(false);
  };
  return { signUp };
};
