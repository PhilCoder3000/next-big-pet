import { gql } from 'graphql-request';
import React, { useState } from 'react';
import { graphqlClient } from '../src/helpers/graphql/client';
import { BaseButton } from '../src/shared/buttons/BaseButton';

type User = { id: string; name: string; isAdmin: boolean; email: null };

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const update = async () => {
    const res = await getUsers();
    setUsers(res.users);
  };
  return (
    <div className="w-full h-full flex flex-col">
      <BaseButton onClick={update}>update</BaseButton>
      <div>
        {users.map(({ id, name, isAdmin }) => (
          <div key={id}>
            <p>ID: {id}</p>
            <h5>Name: {name}</h5>
            <p>{isAdmin ? 'admin' : 'not admin'}</p>
            <p>------</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function getUsers() {
  const query = gql`
    query users(
      $where: UserWhereInput! = {}
      $orderBy: [UserOrderByInput!]! = []
      $take: Int
      $skip: Int! = 0
    ) {
      users(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {
        id
        name
        isAdmin
        email
      }
    }
  `;

  return graphqlClient.request<{ users: User[] }>(query);
}
