import React, { useContext } from 'react';

import { capitalizeString, getMinMax } from '~/lib/helpers';
import type { FieldValue } from '~/lib/zod';

import { FieldType } from '~/types';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { AttestationFormContext } from './context';

import { Trash2Icon } from 'lucide-react';

interface BaseInputProps {
  type: FieldType;
  name: string;
  placeholder: string;
  isArray: boolean;
}

export const StringInput = (props: BaseInputProps) => {
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
        onChange={(e) => {
          if (props.type === FieldType.address) {
            if (e.target.value.length <= 20) {
              updateField(props.name, e.target.value);
            }
          } else if (props.type === FieldType.bytes32) {
            if (e.target.value.length <= 64) {
              updateField(props.name, e.target.value);
            }
          } else {
            updateField(props.name, e.target.value);
          }
        }}
      />
    </div>
  );
};

export const IntegerInput = (props: BaseInputProps) => {
  const { form, updateField } = useContext(AttestationFormContext);
  const { min, max } = getMinMax(props.type);
  return (
    <div className='flex flex-col gap-1'>
      <div className='text-sm font-medium text-neutral-500'>
        <span className='font-semibold text-neutral-600'>
          {capitalizeString(props.name).toUpperCase()}
        </span>{' '}
        | {String(props.type)}
      </div>
      <Input
        max={max}
        min={min}
        placeholder={props.placeholder}
        type='number'
        value={(form.fields[props.name] as number | undefined) ?? 0}
        onChange={(e) => {
          updateField(props.name, parseInt(e.target.value));
        }}
      />
    </div>
  );
};

export const BooleanInput = (props: BaseInputProps) => {
  const { form, updateField } = useContext(AttestationFormContext);
  return (
    <div className='flex flex-col gap-1'>
      <div className='text-sm font-medium text-neutral-500'>
        <span className='font-semibold text-neutral-600'>
          {capitalizeString(props.name).toUpperCase()}
        </span>{' '}
        | {String(props.type)}
      </div>
      <Select
        value={
          form.fields[props.name] !== undefined
            ? String(form.fields[props.name])
            : undefined
        }
        onValueChange={(value) => {
          updateField(props.name, value === 'true');
        }}
      >
        <SelectTrigger className='w-full'>
          <SelectValue placeholder='Boolean Value' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='true'>True</SelectItem>
          <SelectItem value='false'>False</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export const ArrayInput = (props: BaseInputProps) => {
  const { form, updateArrayField } = useContext(AttestationFormContext);
  return (
    <div className='flex flex-col gap-1'>
      <div className='text-sm font-medium text-neutral-500'>
        <span className='font-semibold text-neutral-600'>
          {capitalizeString(props.name).toUpperCase()}
        </span>{' '}
        | {String(props.type)}[]
      </div>
      {((form.fields[props.name] as FieldValue[] | undefined) ?? []).map(
        (field, index) => {
          return (
            <ArrayInputBox
              key={`${props.name}-${String(index)}`}
              {...props}
              index={index}
            />
          );
        }
      )}
      <Button
        className='w-full'
        variant='secondary'
        onClick={() => updateArrayField(props.name, 'push', 0, '')}
      >
        Add Field
      </Button>
    </div>
  );
};

export const ArrayInputBox = (props: BaseInputProps & { index: number }) => {
  const { form, updateArrayField } = useContext(AttestationFormContext);

  if (
    props.type === FieldType.address ||
    props.type === FieldType.string ||
    props.type === FieldType.bytes32 ||
    props.type === FieldType.bytes
  ) {
    return (
      <div className='flex flex-row items-center gap-2'>
        <Input
          placeholder={props.placeholder}
          value={(form.fields[props.name] as string[])[props.index] ?? ''}
          onChange={(e) => {
            if (props.type === FieldType.address) {
              updateArrayField(
                props.name,
                'update',
                props.index,
                e.target.value
              );
            } else if (props.type === FieldType.bytes32) {
              if (e.target.value.length <= 64) {
                updateArrayField(
                  props.name,
                  'update',
                  props.index,
                  e.target.value
                );
              }
            } else {
              updateArrayField(
                props.name,
                'update',
                props.index,
                e.target.value
              );
            }
          }}
        />
        <Button
          className='m-0 h-8 w-8 p-0'
          variant='link'
          onClick={() =>
            updateArrayField(props.name, 'remove', props.index, '')
          }
        >
          <Trash2Icon size={16} />
        </Button>
      </div>
    );
  } else if (
    String(props.type).startsWith('uint') ||
    String(props.type).startsWith('int')
  ) {
    const { min, max } = getMinMax(props.type);
    return (
      <div className='flex flex-row items-center gap-2'>
        <Input
          max={max}
          min={min}
          placeholder={props.placeholder}
          type='number'
          value={(form.fields[props.name] as number[])[props.index] ?? ''}
          onChange={(e) => {
            updateArrayField(
              props.name,
              'update',
              props.index,
              parseInt(e.target.value)
            );
          }}
        />
        <Button
          className='m-0 h-8 w-8 p-0'
          variant='link'
          onClick={() =>
            updateArrayField(props.name, 'remove', props.index, '')
          }
        >
          <Trash2Icon size={16} />
        </Button>
      </div>
    );
  } else if (props.type === FieldType.bool) {
    return (
      <div className='flex flex-row items-center gap-2'>
        <Select
          value={
            (form.fields[props.name] as boolean[])[props.index] !== undefined
              ? String((form.fields[props.name] as boolean[])[props.index])
              : undefined
          }
          onValueChange={(value) => {
            updateArrayField(
              props.name,
              'update',
              props.index,
              value === 'true'
            );
          }}
        >
          <SelectTrigger className='w-full'>
            <SelectValue placeholder='Boolean Value' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='true'>True</SelectItem>
            <SelectItem value='false'>False</SelectItem>
          </SelectContent>
        </Select>
        <Button
          className='m-0 h-8 w-8 p-0'
          variant='link'
          onClick={() =>
            updateArrayField(props.name, 'remove', props.index, '')
          }
        >
          <Trash2Icon size={16} />
        </Button>
      </div>
    );
  }
};

export const FormInput = (props: BaseInputProps) => {
  if (props.isArray) {
    return <ArrayInput {...props} />;
  } else if (
    String(props.type).startsWith('uint') ||
    String(props.type).startsWith('int')
  ) {
    return <IntegerInput {...props} />;
  } else if (
    props.type === FieldType.address ||
    props.type === FieldType.string ||
    props.type === FieldType.bytes32 ||
    props.type === FieldType.bytes
  ) {
    return <StringInput {...props} />;
  } else if (props.type === FieldType.bool) {
    return <BooleanInput {...props} />;
  }
  return null;
};
