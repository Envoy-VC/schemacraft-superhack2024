'use client';

// import Link from 'next/link';
import React from 'react';

// import { easConfig } from '~/lib/eas';
// import { useEthers } from '~/lib/hooks';
// import { truncate } from '~/lib/utils';

// import { SchemaBuilder } from 'eas-uikit';
// import { useChainId, useChains } from 'wagmi';
// import { TextCopy } from '~/components';

// import { ExternalLinkIcon } from 'lucide-react';

const CreateSchema = () => {
  // const { signer } = useEthers();
  // const chainId = useChainId();
  // const chains = useChains();

  // const [schemaUID, setSchemaUID] = useState<string | null>(null);
  // const [txLink, setTxLink] = useState<string | null>(null);

  return (
    <div className='mx-auto flex h-fit w-fit flex-col items-center justify-center gap-4'>
      {/* <SchemaBuilder
        registryAddress={easConfig[chainId]?.schemaRegistry}
        resolverAddress={easConfig[chainId]?.eas}
        signer={signer}
        onSuccess={(uid, receipt) => {
          setSchemaUID(uid);
          const baseURL =
            chains.find((c) => c.id === chainId)?.blockExplorers?.default.url ??
            'https://etherscan.io';
          const link = `${baseURL}/tx/${receipt?.hash ?? ''}`;
          setTxLink(link);
        }}
      /> */}
      {/* <div className='flex w-full max-w-3xl flex-col'>
        {schemaUID ? (
          <div className='flex flex-row items-center gap-2 font-semibold'>
            Attestation UID:
            <TextCopy text={schemaUID} />
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
      </div> */}
    </div>
  );
};

export default CreateSchema;
