import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { classes } from '../../../helpers/style/classes';
import { navbarLinks } from '../links';

interface DesktopMenuProps {
  uuid?: string;
}

export function DesktopMenu({ uuid }: DesktopMenuProps) {
  const { pathname } = useRouter();
  return (
    <div className="flex flex-grow justify-start items-center">
      {navbarLinks.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={classes('mr-2 dark:text-dark-secondary', '', {
            'text-light-secondary dark:text-dark-yellow': pathname === href,
          })}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
