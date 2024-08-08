/* eslint-disable @typescript-eslint/no-empty-function -- safe */
import { type PropsWithChildren, createContext, useState } from 'react';

import { type AttestationBuilderForm, type FieldValue } from '~/lib/zod';

interface AttestationContextState {
  form: AttestationBuilderForm;
}

interface AttestationContextActions {
  updateField: (name: string, value: FieldValue) => void;
  updateArrayField: (
    name: string,
    method: 'push' | 'remove',
    index: number,
    value: FieldValue
  ) => void;
}

export const AttestationFormContext = createContext<AttestationContextType>({
  form: { recipient: '', expirationTime: 0, fields: {} },
  updateField: () => {},
  updateArrayField: () => {},
});

export type AttestationContextType = AttestationContextState &
  AttestationContextActions;

export const AttestationFormProvider = ({ children }: PropsWithChildren) => {
  const [form, setForm] = useState<AttestationBuilderForm>({
    recipient: '',
    expirationTime: 0,
    fields: {},
  });

  const updateField = (name: string, value: FieldValue) => {
    const newForm = { ...form, fields: { ...form.fields, [name]: value } };
    setForm(newForm);
  };

  const updateArrayField = (
    name: string,
    method: 'push' | 'remove' | 'update',
    index: number,
    value: FieldValue
  ) => {
    const newForm = structuredClone(form);
    const array = newForm.fields[name] as FieldValue[];
    if (method === 'push') {
      array.push(value);
    } else if (method === 'remove') {
      array.splice(index, 1);
    } else {
      array[index] = value;
    }
    setForm(newForm);
  };

  return (
    <AttestationFormContext.Provider
      value={{ form, updateField, updateArrayField }}
    >
      {children}
    </AttestationFormContext.Provider>
  );
};
