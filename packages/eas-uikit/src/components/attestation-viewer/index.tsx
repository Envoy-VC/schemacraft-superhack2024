import { useMemo } from 'react';

import {
  EAS,
  SchemaEncoder,
  SchemaRegistry,
  type SchemaValue,
} from '@ethereum-attestation-service/eas-sdk';
import { useQuery } from '@tanstack/react-query';

import { capitalizeString } from '../../lib/helpers';
import type { AttestationViewerProps } from '../../types/index';
import { TextCopy } from '../text-copy';
import { Skeleton } from '../ui/skeleton';

export const AttestationViewer = (props: AttestationViewerProps) => {
  const { data } = useQuery({
    queryKey: ['attestation', props.attestationUID],
    queryFn: async () => {
      if (!props.signer) return;
      const eas = new EAS(props.easContractAddress);
      const registry = new SchemaRegistry(props.registryAddress);

      eas.connect(props.signer);
      registry.connect(props.signer);
      const attestation = await eas.getAttestation(props.attestationUID);
      const schema = await registry.getSchema({ uid: attestation.schema });
      console.log(schema.schema);
      const schemaEncoder = new SchemaEncoder(schema.schema);
      const decoded = schemaEncoder.decodeData(attestation.data);

      const data = {
        attester: attestation.attester,
        data: attestation.data,
        expirationTime: Number(attestation.expirationTime),
        recipient: attestation.recipient,
        refUID: attestation.refUID,
        revocable: attestation.revocable,
        revocationTime: Number(attestation.revocationTime),
        schema: attestation.schema,
        time: Number(attestation.time),
        uid: attestation.uid,
        decoded,
      };
      return data;
    },
    enabled: Boolean(props.signer && props.easContractAddress),
  });

  return (
    <div className='flex w-full max-w-xl flex-col gap-2 rounded-2xl p-5 shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px]'>
      <div className='text-2xl font-medium'>Attestation</div>
      <div className='border-b border-neutral-200 pb-2 text-sm text-neutral-400'>
        Details about the attestation such as the fields and the resolver
        address.
      </div>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-row items-center gap-2'>
          <div className='font-medium'>Attestation UID: </div>
          {data ? (
            <TextCopy text={data.uid} />
          ) : (
            <Skeleton className='h-[20px] w-[200px] rounded-full' />
          )}
        </div>
        <div className='flex flex-row items-center gap-2'>
          <div className='font-medium'>Attestator: </div>
          {data ? (
            <TextCopy text={data.attester} />
          ) : (
            <Skeleton className='h-[20px] w-[200px] rounded-full' />
          )}
        </div>
        <div className='flex flex-row items-center gap-2'>
          <div className='font-medium'>Recipient: </div>
          {data ? (
            <TextCopy
              text={
                data.recipient === '0x0000000000000000000000000000000000000000'
                  ? 'No Recipient'
                  : data.recipient
              }
            />
          ) : (
            <Skeleton className='h-[20px] w-[200px] rounded-full' />
          )}
        </div>
        <div className='flex flex-row items-center gap-2'>
          <div className='font-medium'>Revocable: </div>
          {data ? (
            <>{String(data.revocable)}</>
          ) : (
            <Skeleton className='h-[20px] w-[100px] rounded-full' />
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <div className='font-medium'>Decoded Data: </div>
          <div className='flex flex-col gap-1'>
            {data ? (
              <>
                {data.decoded.map((field) => {
                  return (
                    <div
                      key={field.name}
                      className='flex h-12 flex-row items-center rounded-md'
                    >
                      <div className='flex h-full w-full basis-1/3 flex-col rounded-l-md bg-gray-200 px-3 py-1'>
                        <div className='text-sm font-medium uppercase text-neutral-600'>
                          {field.type}
                        </div>
                        <div className='font-medium text-neutral-800'>
                          {capitalizeString(field.name)}
                        </div>
                      </div>
                      <div className='flex h-full w-full basis-2/3 flex-col rounded-r-md bg-gray-100 px-3 py-1'>
                        <RenderValue value={field.value.value} />
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <Skeleton className='h-[100px] w-full rounded-sm' />
            )}
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='font-medium'>Raw Data: </div>
          <div className='rounded-md bg-gray-100 px-3 py-1'>
            {data ? (
              <div className='break-all'>{data.data}</div>
            ) : (
              <Skeleton className='h-[100px] w-full rounded-sm' />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
// string | boolean | number | bigint | Record<string, unknown> | Record<string, unknown>[] | unknown[];
const RenderValue = ({ value }: { value: SchemaValue }) => {
  const data = useMemo(() => {
    if (typeof value === 'object') {
      return JSON.stringify(value);
    } else if (Array.isArray(value)) {
      return value.map((item) => JSON.stringify(item)).join(', ');
    }
    return String(value);
  }, [value]);

  return <TextCopy canCopy={data.length >= 30} text={data} />;
};
