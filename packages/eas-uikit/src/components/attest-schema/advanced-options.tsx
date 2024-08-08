import React, { useContext } from 'react';

import { Input } from '../ui/input';
import { AttestationFormContext } from './context';

export const RecipientInput = () => {
  const { form, updateRecipient } = useContext(AttestationFormContext);
  return (
    <div className='flex flex-col gap-1'>
      <div className='text-sm font-medium text-neutral-500'>
        <span className='font-semibold uppercase text-neutral-600'>
          Recipient
        </span>{' '}
        | address
      </div>
      <Input
        placeholder='Recipient Address'
        value={form.recipient}
        onChange={(e) => {
          updateRecipient(e.target.value);
        }}
      />
    </div>
  );
};

export const ExpirationInput = () => {
  const { form, updateExpiration } = useContext(AttestationFormContext);
  return (
    <div className='flex flex-col gap-1'>
      <div className='text-sm font-medium text-neutral-500'>
        <span className='font-semibold uppercase text-neutral-600'>
          Expiration
        </span>{' '}
        | (0 for no expiration)
      </div>
      <Input
        max={Infinity}
        min={0}
        placeholder=''
        type='number'
        value={form.expirationTime}
        onChange={(e) => {
          updateExpiration(parseInt(e.target.value));
        }}
      />
    </div>
  );
};
