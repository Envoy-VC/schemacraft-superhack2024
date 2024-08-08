import React from 'react';

import { decodeSchema } from '~/lib/helpers';

import {
  SchemaRecord,
  SchemaRegistry,
} from '@ethereum-attestation-service/eas-sdk';
import { useQuery } from '@tanstack/react-query';
import type { Signer } from 'ethers';

import { AttestationFormProvider } from './context';
import { MakeAttestationForm } from './form';

interface AttestSchemaProps {
  schemaUID: string;
  easContractAddress?: string;
  signer?: Signer;
}

export const AttestSchema = (props: AttestSchemaProps) => {
  const data = {
    uid: '0xdf9216b915bd0077156c42395f13187e8b4386e5b07795b3d8fefe20ab0666ee',
    revocable: false,
    resolver: '',
    schema:
      'uint96 id, address owner, uint64 timestamp, bool is_claimed, string data',
    fields: decodeSchema(
      'uint96 id, address owner, uint64 timestamp, bool is_claimed, string data'
    ),
  };
  // const { data } = useQuery({
  //   queryKey: ['schema', props.schemaUID],
  //   queryFn: async () => {
  //     if (!props.signer) return;
  //     if (!props.easContractAddress) return;
  //     const schemaRegistry = new SchemaRegistry(props.easContractAddress);

  //     schemaRegistry.connect(props.signer);

  //     const schemaRecord = await schemaRegistry.getSchema({
  //       uid: props.schemaUID,
  //     });

  //     console.log(schemaRecord);

  //     return schemaRecord;
  //   },
  //   enabled: Boolean(props.signer && props.easContractAddress),
  // });
  return (
    <div className='flex w-full max-w-xl flex-col gap-2 rounded-2xl p-5 shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px]'>
      <div className='text-2xl font-medium'>Make Attestation</div>
      <div className='border-b border-neutral-200 pb-2 text-sm text-neutral-400'>
        Create a attestation for a schema.
      </div>
      <AttestationFormProvider>
        <MakeAttestationForm {...data} />
      </AttestationFormProvider>
    </div>
  );
};
