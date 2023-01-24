import { Post } from '@prisma/client';
import { useRouter } from 'next/router';
import React from 'react';
import { keystoneContext } from '../../keystone/context/context';
import { BaseButton } from '../../src/shared/buttons/BaseButton';

export const getStaticProps = async () => {
  const posts = await keystoneContext.db.Post.findMany();
  return {
    props: {
      posts,
    },
  };
};

interface AllPostsProps {
  posts: Post[];
}

export default function AllPosts({ posts = [] }: AllPostsProps) {
  const { push } = useRouter();
  const clickHandler = ({ currentTarget }: React.MouseEvent<HTMLButtonElement>) => {
    push(`/post/${currentTarget.name}`);
  };
  return (
    <div className="flex flex-col p-2">
      {posts.map(({ id, authorId, title, content }) => (
        <div
          key={id}
          className="flex flex-col border rounded mb-2"
        >
          <h5>{title}</h5>
          <p>{content}</p>
          <p>{authorId}</p>
          <BaseButton name={id} onClick={clickHandler}>Read post</BaseButton>
        </div>
      ))}
    </div>
  );
}
