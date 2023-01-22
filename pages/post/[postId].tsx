import React from 'react';

interface PostProps {
  uuid?: string;
}

export default function Post({
  uuid,
}: PostProps) {
  return (
    <h1>one post</h1>
  );
}
