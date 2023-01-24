import { Post } from '@prisma/client';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { keystoneContext } from '../../keystone/context/context';
import { BaseButton } from '../../src/shared/buttons/BaseButton';
import { PostRedirectAnim } from '../../src/widgets/Post/PostRedirectAnim';

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

type Position = {
  top: number;
  left: number;
  bottom: number;
  right: number;
};

export default function AllPosts({ posts = [] }: AllPostsProps) {
  const { push, events } = useRouter();
  const [position, setPosition] = useState<Position | null>(null);

  const clickHandler = ({
    currentTarget,
  }: React.MouseEvent<HTMLButtonElement>) => {
    push(`/post/${currentTarget.name}`);

    if (currentTarget.parentElement) {
      const { top, left, height, width } =
        currentTarget.parentElement?.getBoundingClientRect();
      const bottom = window.innerHeight - top - height;
      const right = window.innerWidth - left - width;
      setPosition({ top, left, bottom, right });
    }
  };

  useEffect(() => {
    const handleStart = (url: string) => {
      console.log(`Loading: ${url}`);
      // NProgress.start();
    };

    const handleStop = () => {
      setPosition(null)
    };

    events.on('routeChangeStart', handleStart);
    events.on('routeChangeComplete', handleStop);

    return () => {
      events.off('routeChangeStart', handleStart);
      events.off('routeChangeComplete', handleStop);
    };
  }, [events]);

  return (
    <div className="flex flex-col p-2">
      {posts.map(({ id, authorId, title, content }) => (
        <div key={id} className="flex flex-col border rounded mb-2">
          <h5>{title}</h5>
          <p>{content}</p>
          <p>{authorId}</p>
          <BaseButton name={id} onClick={clickHandler}>
            Read post
          </BaseButton>
        </div>
      ))}
      <PostRedirectAnim startPosition={position} />
    </div>
  );
}
