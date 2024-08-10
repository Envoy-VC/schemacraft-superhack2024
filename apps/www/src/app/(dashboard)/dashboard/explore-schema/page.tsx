'use client';

import React, { useState } from 'react';

import { easConfig } from '~/lib/eas';
import { useEthers } from '~/lib/hooks';

import { SchemaViewer } from 'eas-uikit';
import { useChainId } from 'wagmi';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';

const ViewSchema = () => {
  const { signer } = useEthers();
  const chainId = useChainId();

  const [uid, setUID] = useState<string>('');
  const [searchUID, setSearchUID] = useState<string | null>(null);

  return (
    <div className='mx-auto flex w-full max-w-xl flex-col items-center justify-center gap-8'>
      <div className='flex w-full flex-row items-center gap-2'>
        <Input
          className='w-full'
          placeholder='Search for a schema'
          value={uid}
          onChange={(e) => setUID(e.target.value)}
        />
        <Button
          onClick={() => {
            setSearchUID(uid);
          }}
        >
          Search
        </Button>
      </div>
      {searchUID ? (
        <SchemaViewer
          registryAddress={easConfig[chainId]?.schemaRegistry ?? ''}
          schemaUID={searchUID}
          signer={signer}
        />
      ) : null}
    </div>
  );
};

export default ViewSchema;
