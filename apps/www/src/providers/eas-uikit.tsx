'use client';

import React, { type PropsWithChildren } from 'react';

import { EASUIKitProvider } from 'eas-uikit';

export const EASProvider = (props: PropsWithChildren) => {
  return <EASUIKitProvider>{props.children}</EASUIKitProvider>;
};
