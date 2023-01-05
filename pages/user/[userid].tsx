import { useRouter } from 'next/router';
import React from 'react';
import { PrivatePage } from '../../src/helpers/react/PrivatePage/PrivatePage';

export default function UserPage(props: any) {
  const { push } = useRouter();
  const user = null;
  // if (!user) {
  //   push('/');
  // }
  return <PrivatePage>Hello name</PrivatePage>;
}
