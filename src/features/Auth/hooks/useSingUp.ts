import { gql } from 'graphql-request';
import { useGraphQL } from '../../../helpers/graphql/useGraphQL';
import { SignUpUser } from '../Components/SignUpBody';

export const useSignUp = (setLoading: (arg: boolean) => void) => {
  const { request } = useGraphQL();
  const signUp = async ({ name, email, password }: SignUpUser) => {
    setLoading(true);
    await request(
      gql`
        mutation ($data: UserCreateInput!) {
          createUser(data: $data) {
            name
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
    setLoading(false);
  };
  return { signUp };
};
