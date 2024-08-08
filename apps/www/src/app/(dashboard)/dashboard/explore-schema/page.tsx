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
        schemaUID='0xdf9216b915bd0077156c42395f13187e8b4386e5b07795b3d8fefe20ab0666ee'
        signer={signer}
      />
    </div>
  );
};

export default ViewSchema;
