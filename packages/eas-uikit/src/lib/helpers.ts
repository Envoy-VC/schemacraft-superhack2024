import { FieldType } from '~/types';

import type { SchemaField } from './zod';

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
