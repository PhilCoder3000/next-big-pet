import { gql } from 'graphql-request';
import { useGraphQL } from '../../../helpers/graphql/useGraphQL';

export const useLogout = () => {
  const { request } = useGraphQL();
  const logout = async () => {
    await request(gql`
      mutation endUserSession {
        endSession
      }
    `);
    window.location.reload();
  };
  return { logout };
};
