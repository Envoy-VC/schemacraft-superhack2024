import React, { useContext } from 'react';

import type { decodeSchema } from '~/lib/helpers';

import { type SchemaRecord } from '@ethereum-attestation-service/eas-sdk';

import { AttestationFormContext } from './context';
import { FormInput } from './inputs';

interface MakeAttestationFormProps extends SchemaRecord {
  fields: ReturnType<typeof decodeSchema>;
}
export const MakeAttestationForm = (props: MakeAttestationFormProps) => {
  const { form } = useContext(AttestationFormContext);

  return (
    <div className='w-full'>
      <div className='flex flex-col'>
        {props.fields.map((field) => {
          return (
            <FormInput key={field.name} {...field} placeholder={field.name} />
          );
        })}
      </div>
    </div>
  );
};
