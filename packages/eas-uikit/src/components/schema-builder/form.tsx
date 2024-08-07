import { flushSync } from 'react-dom';
import {
  type FieldArrayWithId,
  type UseFieldArrayReturn,
  useFieldArray,
  useForm,
  useFormContext,
} from 'react-hook-form';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc';

import { SchemaRegistry } from '@ethereum-attestation-service/eas-sdk';
import { zodResolver } from '@hookform/resolvers/zod';
import type { JsonRpcSigner } from 'ethers';
import { z } from 'zod';
import { FieldType } from '~/types';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '~/components/ui/select';
import { Switch } from '~/components/ui/switch';

import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';

import { GripVertical, Trash2Icon } from 'lucide-react';

export interface SchemaBuilderProps {
  signer?: JsonRpcSigner;
  registryAddress?: string;
  resolverAddress?: string;
  onCreateCallback?: (hash: string) => void | Promise<void>;
}

const DragHandle = SortableHandle(() => (
  <GripVertical className='cursor-pointer text-neutral-600' size={20} />
));

type FormProps = SchemaBuilderProps;

export const SchemaBuilderForm = (props: FormProps) => {
  const form = useForm<SchemaForm>({
    resolver: zodResolver(schemaBuilderSchema),
    defaultValues: {
      fields: [
        {
          name: '',
        },
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

    if (!props.resolverAddress) {
      throw new Error('Resolver address is required');
    }
    const schemaRegistryContractAddress = props.registryAddress;
    const schemaRegistry = new SchemaRegistry(schemaRegistryContractAddress);

    schemaRegistry.connect(props.signer);

    const schema = createSchema(data.fields);
    const resolverAddress = props.resolverAddress;

    const transaction = await schemaRegistry.register({
      schema,
      resolverAddress,
      revocable: data.isRevocable,
    });

    const hash = await transaction.wait();
    return hash;
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
        <SortableList
          arrayActions={arrayActions}
          items={arrayActions.fields}
          onSortEnd={onSortEnd}
        />
        <Button
          className='w-full text-start'
          type='button'
          variant='secondary'
          onClick={() => {
            arrayActions.append({
              name: '',
              isArray: false,
              type: FieldType.address,
            });
          }}
        >
          Add Field
        </Button>
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

interface SortableItemProps {
  i: number;
  arrayActions: UseFieldArrayReturn<SchemaForm, 'fields'>;
}

const SortableItem = SortableElement<SortableItemProps>(
  (props: SortableItemProps) => {
    const { control, watch } = useFormContext<SchemaForm>();
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions -- zod register
    const isArray = watch(`fields.${props.i}.isArray`);

    return (
      <div className='flex flex-row items-center gap-2 rounded-xl bg-neutral-100 px-4 py-2'>
        <DragHandle />
        <FormField
          control={control}
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions -- zod register
          name={`fields.${props.i}.name`}
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormControl>
                <Input
                  className='border-none outline-none'
                  placeholder='Field Name'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions -- zod register
          name={`fields.${props.i}.type`}
          render={({ field }) => (
            <FormItem className='w-[16rem]'>
              <Select defaultValue={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    {(field.value as FieldType | undefined) ?? 'Select Type'}
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(FieldType).map((type) => {
                    return (
                      <SelectItem
                        key={type}
                        className='!m-0 flex w-full flex-col items-start justify-start px-2 py-1'
                        value={type}
                      >
                        <div className='text-base font-medium text-primary'>
                          {type}
                        </div>
                        <div className='text-xs text-neutral-600'>
                          {getFieldTypeDescription(type)}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <Popover>
          <PopoverTrigger className='relative mx-1 text-xl text-neutral-600'>
            ⚙{' '}
            {isArray ? (
              <div className='absolute right-[8px] top-1/2 mt-[1px] flex h-[13px] w-[13px] -translate-y-1/2 items-center justify-center rounded-full bg-white p-1 text-[8px] font-bold'>
                1
              </div>
            ) : null}
          </PopoverTrigger>
          <PopoverContent className='mb-0 flex flex-col gap-2 py-2'>
            <FormField
              control={control}
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions -- zod register
              name={`fields.${props.i}.isArray`}
              render={({ field }) => (
                <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className='space-y-1 leading-none'>
                    <FormLabel>Define as Array</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <Button
              className='m-0 flex h-8 w-full justify-start p-0'
              type='button'
              variant='ghost'
              onClick={() => props.arrayActions.remove(props.i)}
            >
              <Trash2Icon className='mr-2' size={16} /> Delete
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    );
  }
);

interface SortableListProps {
  items: FieldArrayWithId<SchemaForm, 'fields'>[];
  arrayActions: UseFieldArrayReturn<SchemaForm, 'fields'>;
}

const SortableList = SortableContainer<SortableListProps>(
  ({ items, arrayActions }: SortableListProps) => {
    return (
      <div className='flex flex-col gap-1'>
        {items.map((item, index) => (
          <SortableItem
            key={item.id}
            arrayActions={arrayActions}
            i={index}
            index={index}
          />
        ))}
      </div>
    );
  }
);

const schemaField = z.object({
  name: z.string(),
  isArray: z.boolean().default(false),
  type: z.nativeEnum(FieldType),
});

const schemaBuilderSchema = z.object({
  fields: z.array(schemaField).min(1),
  resolverAddress: z.string().optional(),
  isRevocable: z.boolean(),
});

export type SchemaField = z.infer<typeof schemaField>;
export type SchemaForm = z.infer<typeof schemaBuilderSchema>;

const getFieldTypeDescription = (type: FieldType) => {
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

const createSchema = (fields: SchemaField[]) => {
  // const schema = 'uint256 eventId, uint8 voteIndex';
  const elements: string[] = [];

  fields.forEach((field) => {
    const str = `${field.type} ${field.name}`;
    elements.push(str);
  });

  return elements.join(', ');
};
