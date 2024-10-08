import { decodeSchema } from '~/lib/helpers';

import { SchemaRegistry } from '@ethereum-attestation-service/eas-sdk';
import { useQuery } from '@tanstack/react-query';

import type { AttestBuilderProps } from '../../types/index';
import { AttestationFormProvider } from './context';
import { MakeAttestationForm } from './form';

export const AttestSchema = (props: AttestBuilderProps) => {
  const { data } = useQuery({
    queryKey: ['schema', props.schemaUID],
    queryFn: async () => {
      if (!props.signer) return;

      const schemaRegistry = new SchemaRegistry(props.registryAddress);
      schemaRegistry.connect(props.signer);

      const schemaRecord = await schemaRegistry.getSchema({
        uid: props.schemaUID,
      });

      const res = {
        uid: schemaRecord.uid,
        schema: schemaRecord.schema,
        revocable: schemaRecord.revocable,
        resolver: schemaRecord.resolver,
        fields: decodeSchema(schemaRecord.schema),
      };

      return res;
    },
    enabled: Boolean(props.signer && props.registryAddress),
  });
  return (
    <div className='flex w-full max-w-xl flex-col gap-2 rounded-2xl p-5 shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px]'>
      <div className='text-2xl font-medium'>Make Attestation</div>
      <div className='border-b border-neutral-200 pb-2 text-sm text-neutral-400'>
        Create a attestation for a schema.
      </div>
      <AttestationFormProvider>
        {data ? <MakeAttestationForm {...data} {...props} /> : null}
      </AttestationFormProvider>
    </div>
  );
};
