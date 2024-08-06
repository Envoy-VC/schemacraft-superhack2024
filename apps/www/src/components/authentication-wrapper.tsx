import { redirect } from 'next/navigation';

import React, { type PropsWithChildren } from 'react';

import { getSession } from '~/lib/session';

export const SignedIn = async ({ children }: PropsWithChildren) => {
  const session = await getSession();
  if (session.expires < new Date().toISOString()) {
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
