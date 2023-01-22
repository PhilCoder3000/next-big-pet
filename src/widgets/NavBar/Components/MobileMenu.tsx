import Link from 'next/link';
import React from 'react';

interface MobileMenuProps {
  uuid?: string;
}

export function MobileMenu({ uuid }: MobileMenuProps) {
  return (
    <div>
      <h1>mobile</h1>
      <Link href="/post">all posts</Link>
      <Link href="/post/1">one post</Link>
    </div>
  );
}
