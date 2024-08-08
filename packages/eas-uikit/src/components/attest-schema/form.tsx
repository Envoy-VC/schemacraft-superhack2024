import React, { useContext, useState } from 'react';

import { type decodeSchema, verifyAttestationForm } from '~/lib/helpers';

import {
  EAS,
  SchemaEncoder,
  type SchemaRecord,
} from '@ethereum-attestation-service/eas-sdk';
import type { Signer, TransactionReceipt } from 'ethers';

import { Button } from '../ui/button';
import { ExpirationInput, RecipientInput } from './advanced-options';
import { AttestationFormContext } from './context';
import { FormInput } from './inputs';

interface MakeAttestationFormProps extends SchemaRecord {
  fields: ReturnType<typeof decodeSchema>;
  schemaUID: string;
  easContractAddress?: string;
  signer?: Signer;
  onSuccess?: (
    uid: string,
    receipt?: TransactionReceipt
  ) => Promise<void> | void;
  onError?: (error: unknown) => Promise<void> | void;
}
export const MakeAttestationForm = (props: MakeAttestationFormProps) => {
  const { form } = useContext(AttestationFormContext);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onSubmit = async () => {
    try {
      setIsSubmitting(true);
      const newForm = verifyAttestationForm(form, props.fields);
      if (!props.easContractAddress) {
        throw new Error('EAS contract address is required');
      }

      if (!props.signer) {
        throw new Error('Signer is required');
      }
      const eas = new EAS(props.easContractAddress);
      eas.connect(props.signer);

      const schemaEncoder = new SchemaEncoder(props.schema);
      const entries = props.fields.map((field) => {
        return {
          name: field.name,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- we know not null
          value: newForm.fields[field.name]!,
          type: `${String(field.type)}${field.isArray ? '[]' : ''}`,
        };
      });
      const encodedData = schemaEncoder.encodeData(entries);

      const tx = await eas.attest({
        schema: props.schemaUID,
        data: {
          recipient: newForm.recipient,
          expirationTime: BigInt(newForm.expirationTime),
          revocable: props.revocable,
          data: encodedData,
        },
      });

      const uid = await tx.wait();

      if (props.onSuccess) {
        await props.onSuccess(uid, tx.receipt);
      }
    } catch (error) {
      if (props.onError) {
        await props.onError(error);
        return;
      }
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='w-full'>
      <div className='flex flex-col gap-3'>
        <RecipientInput />
        <ExpirationInput />
        {props.fields.map((field) => {
          return (
            <FormInput key={field.name} {...field} placeholder={field.name} />
          );
        })}
      </div>
      <Button
        className='my-4 w-full'
        disabled={isSubmitting}
        onClick={onSubmit}
      >
        {isSubmitting ? 'Creating Attestation...' : 'Create Attestation'}
      </Button>
    </div>
  );
};
