import React, { useContext } from 'react';

import { capitalizeString } from '~/lib/helpers';

import { FieldType } from '~/types';

import { Input } from '../ui/input';
import { AttestationFormContext } from './context';

interface BaseInputProps {
  type: FieldType;
  name: string;
  placeholder: string;
}

export const AddressInput = (props: BaseInputProps) => {
  const { form, updateField } = useContext(AttestationFormContext);
  return (
    <div className='flex flex-col gap-1'>
      <div className='text-sm font-medium text-neutral-500'>
        <span className='font-semibold text-neutral-600'>
          {capitalizeString(props.name).toUpperCase()}
        </span>{' '}
        | {String(props.type)}
      </div>
      <Input
        placeholder={props.placeholder}
        value={(form.fields[props.name] as string | undefined) ?? ''}
        onChange={(e) => updateField(props.name, e.target.value)}
      />
    </div>
  );
};

export const FormInput = (props: BaseInputProps) => {
  if (props.type === FieldType.address) {
    return <AddressInput {...props} />;
  }
  return <div></div>;
};
