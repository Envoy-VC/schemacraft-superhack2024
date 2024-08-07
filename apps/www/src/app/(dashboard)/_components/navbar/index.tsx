import React from 'react';

import { ConnectButton } from '~/components/navbar/connect-button';

export const DashboardNavbar = () => {
  return (
    <div className='flex w-full flex-row justify-end'>
      <div className='flex flex-row items-center gap-2'>
        <ConnectButton />
      </div>
    </div>
  );
};
