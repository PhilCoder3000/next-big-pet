import React from 'react';

interface EventProps {
  uuid?: string;
}

export default function Event({
  uuid,
}: EventProps) {
  return (
    <h1>Dynamic page</h1>
  );
}
