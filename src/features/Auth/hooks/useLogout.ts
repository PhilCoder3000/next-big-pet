import { gql } from 'graphql-request';
import { graphqlClient } from '../../../helpers/graphql/client';

export const useLogout = () => {
  const logout = () => {
    endUserSession().then((data) => {
      window.location.reload();
    });
  };
  
  function endUserSession() {
    const mutation = gql`
      mutation endUserSession {
        endSession
      }
    `;
  
    return graphqlClient.request(mutation);
  }
  return {logout}
}