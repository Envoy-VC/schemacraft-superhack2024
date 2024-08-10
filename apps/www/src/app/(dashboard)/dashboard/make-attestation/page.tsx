'use client';

// import Link from 'next/link';
import Link from 'next/link';

import React, { useState } from 'react';

import { easConfig } from '~/lib/eas';
import { useEthers } from '~/lib/hooks';
import { errorHandler, truncate } from '~/lib/utils';

import { AttestSchema } from 'eas-uikit';
import { toast } from 'sonner';
import { useChainId, useChains } from 'wagmi';
import { TextCopy } from '~/components';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';

import { ExternalLinkIcon } from 'lucide-react';

const CreateSchema = () => {
  const { signer } = useEthers();
  const chainId = useChainId();
  const chains = useChains();

  const [uid, setUID] = useState<string>('');
  const [searchUID, setSearchUID] = useState<string | null>(null);

  const [attestationUID, setAttestationUID] = useState<string | null>(null);
  const [txLink, setTxLink] = useState<string | null>(null);

  return (
    <div className='mx-auto flex h-fit w-full max-w-xl flex-col items-center justify-center gap-4'>
      <div className='flex w-full flex-row items-center gap-2'>
        <Input
          className='w-full'
          placeholder='Search for a Schema'
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
        <AttestSchema
          easContractAddress={easConfig[chainId]?.eas ?? ''}
          registryAddress={easConfig[chainId]?.schemaRegistry ?? ''}
          schemaUID={searchUID}
          signer={signer}
          onError={(error) => {
            toast.error(errorHandler(error));
          }}
          onSuccess={(attestationUid, receipt) => {
            setAttestationUID(attestationUid);
            const baseURL =
              chains.find((c) => c.id === chainId)?.blockExplorers?.default
                .url ?? 'https://etherscan.io';
            const link = `${baseURL}/tx/${receipt?.hash ?? ''}`;
            setTxLink(link);
          }}
        />
      ) : null}

      <div className='flex w-full max-w-3xl flex-col'>
        {attestationUID ? (
          <div className='flex flex-row items-center gap-2 font-semibold'>
            Attestation UID:
            <TextCopy text={attestationUID} />
          </div>
        ) : null}
        {txLink ? (
          <div className='flex flex-row items-center gap-2 font-semibold'>
            Transaction:{' '}
            <Link
              className='flex flex-row items-center gap-2 font-normal'
              href={txLink}
              target='_blank'
            >
              {truncate(txLink, 36)}
              <ExternalLinkIcon size={18} strokeWidth={2.5} />
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CreateSchema;
