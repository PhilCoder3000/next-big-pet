import React from 'react';

interface HomeProps {
  uuid?: string;
}

export default function Home({
  uuid,
}: HomeProps) {
  return (
    <h1>Hello</h1>
  );
}
