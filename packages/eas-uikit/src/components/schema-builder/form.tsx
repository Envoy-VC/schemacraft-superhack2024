import { flushSync } from 'react-dom';
import { useFieldArray, useForm } from 'react-hook-form';

import { createSchema } from '~/lib/helpers';
import { type SchemaForm, schemaBuilderSchema } from '~/lib/zod';

import { SchemaRegistry } from '@ethereum-attestation-service/eas-sdk';
import { zodResolver } from '@hookform/resolvers/zod';
import type { JsonRpcSigner, TransactionReceipt } from 'ethers';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Switch } from '~/components/ui/switch';

import { Button } from '../ui/button';
import { FieldList } from './field-list';

export interface SchemaBuilderProps {
  signer?: JsonRpcSigner;
  registryAddress: string;
  onSuccess?: (
    uid: string,
    receipt?: TransactionReceipt
  ) => void | Promise<void>;
  onError?: (error: unknown) => void | Promise<void>;
}

type FormProps = SchemaBuilderProps;

export const SchemaBuilderForm = (props: FormProps) => {
  const form = useForm<SchemaForm>({
    resolver: zodResolver(schemaBuilderSchema),
    defaultValues: {
      fields: [
        {
          name: '',
        },
      ],
      isRevocable: false,
    },
  });
  const arrayActions = useFieldArray({
    control: form.control,
    name: 'fields',
  });

  const onSubmit = async (data: SchemaForm) => {
    try {
      const names = data.fields.map((f) => f.name);
      if (!(new Set(names).size === names.length)) {
        throw new Error('Field names must be unique');
      }

      if (!props.registryAddress) {
        throw new Error('Registry address is required');
      }

      if (!props.signer) {
        throw new Error('Signer is required');
      }

      const schemaRegistryContractAddress = props.registryAddress;
      const schemaRegistry = new SchemaRegistry(schemaRegistryContractAddress);

      schemaRegistry.connect(props.signer);

      const schema = createSchema(data.fields);

      const transaction = await schemaRegistry.register({
        schema,
        revocable: data.isRevocable,
      });

      const hash = await transaction.wait();
      if (props.onSuccess) {
        await props.onSuccess(hash, transaction.receipt);
      }
      form.reset({
        fields: [{ name: '' }],
        resolverAddress: undefined,
        isRevocable: false,
      });
    } catch (error) {
      if (props.onError) {
        await props.onError(error);
        return;
      }
      console.error(error);
    }
  };

  const onSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    flushSync(() => arrayActions.move(oldIndex, newIndex));
  };

  return (
    <Form {...form}>
      <form className='space-y-2' onSubmit={form.handleSubmit(onSubmit)}>
        <FieldList arrayActions={arrayActions} onSortEnd={onSortEnd} />
        <div className='flex flex-col py-2'>
          <div className='text-lg font-medium'>Resolver Address</div>
          <div className='text-xs text-neutral-600'>
            Optional smart contract that gets executed with every attestation of
            this type. (Can be used to verify, limit, act upon any attestation)
          </div>
        </div>
        <FormField
          control={form.control}
          name='resolverAddress'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormControl>
                <Input placeholder='Resolver Address' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='isRevocable'
          render={({ field }) => (
            <FormItem className='flex flex-row items-center justify-between gap-3'>
              <div className='flex flex-col py-2'>
                <div className='text-lg font-medium'>Revocable</div>
                <div className='text-xs text-neutral-600'>
                  Determine if attestations of this schema can be revocable
                </div>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          className='w-full py-3'
          disabled={form.formState.isSubmitting}
          type='submit'
        >
          {form.formState.isSubmitting ? 'Creating Schema...' : 'Create Schema'}
        </Button>
      </form>
    </Form>
  );
};
