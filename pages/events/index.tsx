import Link from 'next/link';
import React from 'react';

interface AllEventsProps {
  uuid?: string;
}

export default function AllEvents({ uuid }: AllEventsProps) {
  return (
    <div className='flex flex-col'>
      <Link href="/events/london">London</Link>
      <Link href="/events/san-francisco">San Francisco</Link>
      <Link href="/events/miami">Miami</Link>
    </div>
  );
}
