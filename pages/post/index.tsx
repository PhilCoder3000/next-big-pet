import { gql } from 'graphql-request';
import React from 'react';
import { useGraphQL } from '../../src/helpers/graphql/useGraphQL';
import { BaseButton } from '../../src/shared/buttons/BaseButton';

interface AllPostsProps {
  uuid?: string;
}

export default function AllPosts({ uuid }: AllPostsProps) {
  const { request, data } = useGraphQL();
  const getAllPosts = () => {
    console.log('🚀 ~ file: index.tsx:10 ~ AllPosts ~ data', data);
    const query = gql`
      query posts(
        $where: PostWhereInput! = {}
        $orderBy: [PostOrderByInput!]! = []
        $take: Int
        $skip: Int! = 0
      ) {
        posts(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {
          title
          content
          author {
            name
          }
        }
      }
    `;
  
    request(query);
  };

  return (
    <div>
      <BaseButton onClick={getAllPosts}>get all posts</BaseButton>
    </div>
  );
}
