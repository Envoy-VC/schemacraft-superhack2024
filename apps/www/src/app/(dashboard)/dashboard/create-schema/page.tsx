'use client';

import React from 'react';

import { easConfig } from '~/lib/eas';
import { useEthers } from '~/lib/hooks';

import { SchemaBuilder } from 'eas-uikit';
import { useChainId } from 'wagmi';

const CreateSchema = () => {
  const { signer } = useEthers();
  const chainId = useChainId();

  return (
    <div className='flex w-full items-center justify-center'>
      <SchemaBuilder
        registryAddress={easConfig[chainId]?.schemaRegistry}
        resolverAddress={easConfig[chainId]?.eas}
        signer={signer}
      />
    </div>
  );
};

export default CreateSchema;
