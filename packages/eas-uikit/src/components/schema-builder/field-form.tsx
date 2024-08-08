import { type UseFieldArrayReturn, useFormContext } from 'react-hook-form';
import { SortableElement, SortableHandle } from 'react-sortable-hoc';

import { getFieldTypeDescription } from '~/lib/helpers';
import { type SchemaForm } from '~/lib/zod';

import { FieldType } from '~/types';

import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select';

import { GripVerticalIcon, Trash2Icon } from 'lucide-react';

const DragHandle = SortableHandle(() => (
  <GripVerticalIcon className='cursor-pointer text-neutral-600' size={20} />
));

interface FieldFormProps {
  i: number;
  arrayActions: UseFieldArrayReturn<SchemaForm, 'fields'>;
}

export const FieldForm = SortableElement<FieldFormProps>(
  (props: FieldFormProps) => {
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
