import React, { type PropsWithChildren } from 'react';

import { SignedIn } from '~/components';

import { DashboardNavbar, Sidebar } from './_components';

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <SignedIn>
      <div className='flex flex-row'>
        <Sidebar />
        <div className='flex w-full flex-col'>
          <div className='flex w-full px-4 py-3'>
            <DashboardNavbar />
          </div>
          <div className='mx-auto my-12 w-full max-w-screen-lg'>{children}</div>
        </div>
      </div>
    </SignedIn>
  );
};

export default DashboardLayout;
