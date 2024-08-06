import React from 'react';

import { SignedOut } from '~/components';

import { WorldCoinWidget } from './_components';

const AuthPage = () => {
  return (
    <SignedOut>
      <WorldCoinWidget />
    </SignedOut>
  );
};

export default AuthPage;
