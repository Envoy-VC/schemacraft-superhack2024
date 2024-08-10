import { redirect } from 'next/navigation';

import React, { type PropsWithChildren } from 'react';

import { getSession } from '~/lib/session';

export const SignedIn = async ({ children }: PropsWithChildren) => {
  const session = await getSession();
  console.log(session);
  if (
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- can be undefined
    session.expires === undefined ||
    session.expires < new Date().toISOString()
  ) {
    console.log(session.expires < new Date().toISOString());
    redirect('/auth');
  }
  return <>{children}</>;
};

export const SignedOut = async ({ children }: PropsWithChildren) => {
  const session = await getSession();
  if (session.expires > new Date().toISOString()) {
    redirect('/');
  }
  return <>{children}</>;
};
