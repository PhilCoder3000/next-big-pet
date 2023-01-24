import { Post } from '@prisma/client';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import { keystoneContext } from '../../keystone/context/context';

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await keystoneContext.db.Post.findMany();
  const paths = posts.map(({ id }) => id);
  return {
    paths,
    fallback: 'blocking',
  };
};

interface IParams extends ParsedUrlQuery {
  postId: string;
}

export const getStaticProps: GetStaticProps<PostPageProps, IParams> = async (
  context,
) => {
  const post = await keystoneContext.db.Post.findOne({
    where: {
      id: context.params?.postId,
    },
  });
  if (post) {
    return {
      props: {
        post,
      },
    };
  } else {
    return {
      redirect: {
        destination: '/post/not-found-post',
        permanent: false,
      },
    };
  }
};

interface PostPageProps {
  post: Post | null;
}

export default function PostPage({ post }: PostPageProps) {
  if (!post) {
    return <h1>post not found</h1>;
  }
  const { title, content } = post;
  return (
    <div className="flex flex-col p-2">
      <h5>{title}</h5>
      <p>{content}</p>
    </div>
  );
}
