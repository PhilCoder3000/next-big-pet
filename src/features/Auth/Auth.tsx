import { User } from '@prisma/client';
import { gql } from 'graphql-request';
import Link from 'next/link';
import React, { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userAuthData } from '../../../store/atoms/user/user';
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
  const [{ isOpenModal, isLoading, user }, setAuthData] =
    useRecoilState(userAuthData);

  const { request } = useGraphQL<AuthenticatedItem>();

  const checkUserAuth = useCallback(async () => {
    setAuthData((prev) => ({
      ...prev,
      isLoading: true,
    }));
    const res = await request(CheckAuthenticate);
    let authenticatedUser: User | null = null
    if ('authenticatedItem' in res) {
      authenticatedUser = res.authenticatedItem;
    }
    setAuthData((prev) => ({
      ...prev,
      user: authenticatedUser,
      isLoading: false,
    }));
  }, [request, setAuthData]);

  useEffect(() => {
    checkUserAuth();
  }, [checkUserAuth]);

  if (user) {
    return (
      <>
        <LoadingButton isLoading={isLoading} color="primary" className="mr-3">
          {user.name}
        </LoadingButton>
        <Link href={`/user/${user.id}`}>Personal page</Link>
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
