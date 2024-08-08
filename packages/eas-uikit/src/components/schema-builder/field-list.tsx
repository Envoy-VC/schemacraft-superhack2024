import { useFieldArray, useFormContext } from 'react-hook-form';
import { SortableContainer } from 'react-sortable-hoc';

import { type SchemaForm } from '~/lib/zod';

import { FieldType } from '~/types';

import { Button } from '../ui/button';
import { FieldForm } from './field-form';

export const FieldList = SortableContainer(() => {
  const form = useFormContext<SchemaForm>();

  const arrayActions = useFieldArray({
    control: form.control,
    name: 'fields',
  });
  return (
    <div className='flex flex-col gap-3'>
      <div className='flex flex-col gap-1'>
        {arrayActions.fields.map((item, index) => (
          <FieldForm
            key={item.id}
            arrayActions={arrayActions}
            i={index}
            index={index}
          />
        ))}
      </div>
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
    </div>
  );
});
