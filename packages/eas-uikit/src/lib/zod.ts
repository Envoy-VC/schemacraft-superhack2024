import { z } from 'zod';
import { FieldType } from '~/types';

const schemaField = z.object({
  name: z.string(),
  isArray: z.boolean().default(false),
  type: z.nativeEnum(FieldType),
});

export const schemaBuilderSchema = z.object({
  fields: z.array(schemaField).min(1),
  resolverAddress: z.string().optional(),
  isRevocable: z.boolean(),
});

export type SchemaField = z.infer<typeof schemaField>;
export type SchemaForm = z.infer<typeof schemaBuilderSchema>;

export type FieldValue = string | number | boolean;

export interface AttestationBuilderForm {
  recipient?: string;
  expirationTime: number;
  fields: Record<string, FieldValue | FieldValue[]>;
}
