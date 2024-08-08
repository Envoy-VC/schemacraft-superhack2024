import { FieldType } from '~/types';

import type { AttestationBuilderForm, SchemaField } from './zod';

export const createSchema = (fields: SchemaField[]) => {
  const elements: string[] = [];

  fields.forEach((field) => {
    const str = `${field.type}${field.isArray ? '[]' : ''} ${field.name}`;
    elements.push(str);
  });

  return elements.join(', ');
};

export const getFieldTypeDescription = (type: FieldType) => {
  if (type === FieldType.address)
    return 'An Address can be a EOA or a Smart Contract Address';
  if (type === FieldType.string)
    return 'A String can be any alphanumeric characters';
  if (type === FieldType.bool) return 'A Boolean can be either true or false';
  if (type === FieldType.bytes32)
    return 'A Bytes32 can be any 32 bytes long data';
  if (type.startsWith('uint')) {
    const length = parseInt(type.replace('uint', ''));
    return `A uint${String(length)} can be any number between 0 and 2^${String(length)} - 1`;
  }

  if (type.startsWith('int')) {
    const length = parseInt(type.substring(3));
    return `An int${String(length)} can be any number between -2^${String(length - 1)} and 2^${String(length - 1)} - 1`;
  }
};

export const decodeSchema = (schema: string) => {
  const fields = schema.split(', ').map((v) => v.trim());
  const res: { name: string; type: FieldType; isArray: boolean }[] = [];

  fields.forEach((field) => {
    const [dataType, name] = field.split(' ') as [string, string];
    const isArray = dataType.endsWith('[]');
    const type = isArray ? dataType.replace('[]', '') : dataType;
    res.push({
      name,
      type: type as FieldType,
      isArray,
    });
  });

  return res;
};

export const capitalizeString = (value: string) => {
  return value
    .replace('_', ' ')
    .replace('-', ' ')
    .split(' ')
    .map((v) => v.charAt(0).toUpperCase() + v.slice(1))
    .join(' ');
};

export const getMinMax = (type: FieldType) => {
  if (String(type).startsWith('uint')) {
    const length = parseInt(type.replace('uint', ''));
    return { min: 0, max: Math.pow(2, length) - 1 };
  } else if (String(type).startsWith('int')) {
    const length = parseInt(type.substring(3));
    return { min: -Math.pow(2, length - 1), max: Math.pow(2, length - 1) - 1 };
  }
  return { min: 0, max: 0 };
};

export const verifyAttestationForm = (
  form: AttestationBuilderForm,
  fields: ReturnType<typeof decodeSchema>
) => {
  const newForm = structuredClone(form);
  fields.forEach((field) => {
    if (newForm.fields[field.name] === undefined && !field.isArray) {
      throw new Error(`Missing required field: ${field.name}`);
    } else if (newForm.fields[field.name] === undefined && field.isArray) {
      newForm.fields[field.name] = [];
    }
  });

  return newForm;
};
