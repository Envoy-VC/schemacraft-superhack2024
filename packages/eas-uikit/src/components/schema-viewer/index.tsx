import { useMemo } from 'react';

import { decodeSchema } from '~/lib/helpers';

import { SchemaRegistry } from '@ethereum-attestation-service/eas-sdk';
import { useQuery } from '@tanstack/react-query';
import type { SchemaViewerProps } from '~/types';

import { Skeleton } from '~/components/ui/skeleton';

import { TextCopy } from '../text-copy';

export const SchemaViewer = (props: SchemaViewerProps) => {
  const { data } = useQuery({
    queryKey: ['schema', props.schemaUID],
    queryFn: async () => {
      if (!props.signer) return;
      const schemaRegistry = new SchemaRegistry(props.registryAddress);

      schemaRegistry.connect(props.signer);
      console.log(schemaRegistry);

      const schemaRecord = await schemaRegistry.getSchema({
        uid: props.schemaUID,
      });

      console.log(schemaRecord);
      return schemaRecord;
    },
    enabled: Boolean(props.signer && props.registryAddress),
  });

  const res = useMemo(() => {
    if (data) {
      return decodeSchema(data.schema);
    }
  }, [data]);

  return (
    <div className='flex w-full max-w-xl flex-col gap-2 rounded-2xl p-5 shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px]'>
      <div className='text-2xl font-medium'>Schema</div>
      <div className='border-b border-neutral-200 pb-2 text-sm text-neutral-400'>
        Details about the schema such as the fields and the resolver address.
      </div>

      <div className='flex flex-col gap-4'>
        <div className='flex flex-row items-center gap-2'>
          <div className='font-medium'>Schema UID: </div>
          {data ? (
            <TextCopy text={data.uid} />
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
          <div className='font-medium'>Decoded Schema: </div>
          <div className='flex flex-row items-center gap-2'>
            {res ? (
              <>
                {res.map((field) => {
                  return (
                    <div
                      key={field.name}
                      className='items-center-center flex flex-col rounded-md bg-gray-100 px-3 py-1'
                    >
                      <div className='text-xs font-normal text-neutral-400'>
                        {field.type}
                        {field.isArray ? '[]' : ''}
                      </div>
                      <div className='text-base font-medium text-neutral-700'>
                        {field.name}
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
          <div className='font-medium'>Raw Schema: </div>
          <div className='rounded-md bg-gray-100 px-3 py-1'>
            {data ? (
              <>{data.schema}</>
            ) : (
              <Skeleton className='h-[100px] w-full rounded-sm' />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
