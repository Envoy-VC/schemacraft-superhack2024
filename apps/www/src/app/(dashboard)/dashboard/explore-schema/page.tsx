'use client';

import React from 'react';

import { easConfig } from '~/lib/eas';
import { useEthers } from '~/lib/hooks';

import { SchemaViewer } from 'eas-uikit';
import { useChainId } from 'wagmi';

const ViewSchema = () => {
  const { signer } = useEthers();
  const chainId = useChainId();

  return (
    <div className='flex w-full items-center justify-center'>
      <SchemaViewer
        registryAddress={easConfig[chainId]?.schemaRegistry}
        signer={signer}
      />
    </div>
  );
};

export default ViewSchema;
