import { gql } from 'graphql-request';
import Link from 'next/link';
import React, { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userAuthData } from '../../../store/atoms/user';
import { useGraphQL } from '../../helpers/graphql/useGraphQL';
import { Portal } from '../../helpers/react/Portal';
import { LoadingButton } from '../../shared/buttons/LoadingButton';
import { AuthDialog } from './Components/AuthDialog';
import { AuthenticatedItem } from './types';

const CheckAuthenticate = gql`
  query authenticate {
    authenticatedItem {
      __typename
      ... on User {
        id
        name
        theme
      }
    }
  }
`;

export function Auth() {
  const [{ isOpenModal, isLoading, authenticatedUser }, setAuthData] =
    useRecoilState(userAuthData);
  console.log(
    '🚀 ~ file: Auth.tsx:27 ~ Auth ~ authenticatedUser',
    authenticatedUser,
  );
  const { request } = useGraphQL<AuthenticatedItem>();

  const checkUserAuth = useCallback(async () => {
    setAuthData((prev) => ({
      ...prev,
      isLoading: true,
    }));
    const res = await request(CheckAuthenticate);
    if ('authenticatedItem' in res) {
      setAuthData((prev) => ({
        ...prev,
        authenticatedUser: res.authenticatedItem,
      }));
    }
    setAuthData((prev) => ({
      ...prev,
      isLoading: false,
    }));
  }, [request, setAuthData]);

  useEffect(() => {
    checkUserAuth();
  }, [checkUserAuth]);

  if (authenticatedUser) {
    return (
      <>
        <LoadingButton isLoading={isLoading} color="primary" className="mr-3">
          {authenticatedUser.name}
        </LoadingButton>
        <Link href={`/user/${authenticatedUser.id}`}>Personal page</Link>
      </>
    );
  }

  const toggleOpen = () =>
    setAuthData((prev) => ({ ...prev, isOpenModal: !prev.isOpenModal }));

  return (
    <>
      <LoadingButton
        isLoading={isLoading}
        color="primary"
        onClick={toggleOpen}
        className="mr-3"
      >
        Login
      </LoadingButton>
      <Portal>
        <AuthDialog isOpen={isOpenModal} onClose={toggleOpen} />
      </Portal>
    </>
  );
}
