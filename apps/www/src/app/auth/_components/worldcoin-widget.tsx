'use client';

import { useRouter } from 'next/navigation';

import React, { useEffect } from 'react';

import { login } from '~/lib/session';

import {
  IDKitWidget,
  type ISuccessResult,
  VerificationLevel,
  useIDKit,
} from '@worldcoin/idkit';
import { env } from '~/env';
import { api } from '~/trpc/react';

export const WorldCoinWidget = () => {
  const router = useRouter();
  const { setOpen } = useIDKit();

  const verify = api.worldId.verify.useMutation();

  const onSuccess = async (data: ISuccessResult) => {
    const res = await verify.mutateAsync(data);
    if (!res.success) {
      throw new Error('Failed to Verify');
    }

    const { success } = await login(data);
    if (!success) {
      throw new Error('Failed to Create Session');
    }

    router.push('/');
  };

  useEffect(() => {
    setOpen(true);
  }, [setOpen]);

  return (
    <div>
      <IDKitWidget
        action='authentication'
        app_id={env.NEXT_PUBLIC_WORLDCOIN_CLIENT_ID as `app_${string}`}
        verification_level={VerificationLevel.Device}
        onSuccess={onSuccess}
      />
    </div>
  );
};
