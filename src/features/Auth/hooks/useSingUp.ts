import { gql } from 'graphql-request';
import { graphqlClient } from '../../../helpers/graphql/client';
import { SignUpUser } from '../Components/SignUpBody';

export const useSignUp = (setLoading: (arg: boolean) => void) => {
  const signUp = async (values: SignUpUser) => {
    setLoading(true);
    await registerUser(values);
    setLoading(false)
  };
  return { signUp }
};

function registerUser({ name, email, password }: SignUpUser) {
  const mutation = gql`
    mutation ($data: UserCreateInput!) {
      createUser(data: $data) {
        name
        email
      }
    }
  `;

  return graphqlClient.request(mutation, {
    data: {
      isAdmin: false,
      name,
      email,
      password,
    },
  });
}
