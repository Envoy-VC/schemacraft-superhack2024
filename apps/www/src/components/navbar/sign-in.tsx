import Link from 'next/link';

import React from 'react';

import { getSession } from '~/lib/session';

import { WorldCoinLogo } from '../icons';
import { Button } from '../ui/button';

export const SignInButton = async () => {
  const session = await getSession();
  const isLoggedIn = session.expires > new Date().toISOString();
  return (
    <Button asChild className='h-9 rounded-2xl font-medium'>
      <Link
        className='flex flex-row items-center gap-2 font-medium'
        href={isLoggedIn ? '/dashboard' : '/auth'}
      >
        {!isLoggedIn ? (
          <>
            Sign In
            <WorldCoinLogo height={28} stroke='#fff' width={28} />
          </>
        ) : (
          <>Dashboard</>
        )}
      </Link>
    </Button>
  );
};
