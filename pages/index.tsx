import { gql } from 'graphql-request';
import React, { useState } from 'react';
import { useGraphQL } from '../src/helpers/graphql/useGraphQL';
import { BaseButton } from '../src/shared/buttons/BaseButton';
import { BaseTextField } from '../src/shared/fields/BaseTextField';

type User = { id: string; name: string; isAdmin: boolean; email: null };

export default function Home() {
  const { request } = useGraphQL<{ users: User[] }>();
  const update = () => {
    request(gql`
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
    `);
  }

  const [value, setValue] = useState('')

  return (
    <div className="w-full h-full flex flex-col">
      <BaseTextField value={value} onChange={(e) => setValue(e.target.value)} label="label" />
      {/* <BaseButton onClick={update}>update</BaseButton> */}
      {/* <div>
        {data &&
          data.users.map(({ id, name, isAdmin }) => (
            <div key={id}>
              <p>ID: {id}</p>
              <h5>Name: {name}</h5>
              <p>{isAdmin ? 'admin' : 'not admin'}</p>
              <p>------</p>
            </div>
          ))}
      </div> */}
    </div>
  );
}
