import React from 'react';

import { SignInButton } from './sign-in';

import { SwatchBookIcon } from 'lucide-react';

export const Navbar = () => {
  return (
    <div className='dark h-[6dvh] w-full border-b border-neutral-800'>
      <div className='mx-auto flex h-full max-w-screen-xl items-center justify-between px-4'>
        <div className='flex items-center gap-3 text-xl font-semibold text-neutral-300'>
          <SwatchBookIcon className='h-6 w-6' />
          SchemaCraft
        </div>
        <SignInButton />
      </div>
    </div>
  );
};
