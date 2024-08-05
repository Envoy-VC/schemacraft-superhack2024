'use client';

import React from 'react';

import {
  IDKitWidget,
  type ISuccessResult,
  VerificationLevel,
} from '@worldcoin/idkit';
import { env } from '~/env';

import { Button } from '../ui/button';

export const WorldCoinConnect = () => {
  const onSuccess = (res: ISuccessResult) => {
    console.log(res);
  };

  return (
    <IDKitWidget
      action='authentication'
      app_id={env.NEXT_PUBLIC_WORLDCOIN_CLIENT_ID as `app_${string}`}
      verification_level={VerificationLevel.Device}
      onSuccess={onSuccess}
    >
      {({ open }) => <Button onClick={open}>Verify with World ID</Button>}
    </IDKitWidget>
  );
};
