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
    method: 'push' | 'remove' | 'update',
    index: number,
    value: FieldValue
  ) => void;
  updateRecipient: (value: string) => void;
  updateExpiration: (value: number) => void;
}

export const AttestationFormContext = createContext<AttestationContextType>({
  form: { recipient: '', expirationTime: 0, fields: {} },
  updateField: () => {},
  updateArrayField: () => {},
  updateRecipient: () => {},
  updateExpiration: () => {},
});

export type AttestationContextType = AttestationContextState &
  AttestationContextActions;

export const AttestationFormProvider = ({ children }: PropsWithChildren) => {
  const [form, setForm] = useState<AttestationBuilderForm>({
    recipient: '',
    expirationTime: 0,
    fields: {},
  });

  const updateRecipient = (value: string) => {
    const newForm = { ...form, recipient: value };
    setForm(newForm);
  };

  const updateExpiration = (value: number) => {
    const newForm = { ...form, expirationTime: value };
    setForm(newForm);
  };

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
    const array = (newForm.fields[name] as FieldValue[] | undefined) ?? [];
    if (method === 'push') {
      if (newForm.fields[name]) {
        (newForm.fields[name] as FieldValue[]).push(value);
      } else {
        newForm.fields[name] = [value];
      }
    } else if (method === 'remove') {
      array.splice(index, 1);
    } else {
      array[index] = value;
    }
    setForm(newForm);
  };

  return (
    <AttestationFormContext.Provider
      value={{
        form,
        updateField,
        updateArrayField,
        updateRecipient,
        updateExpiration,
      }}
    >
      {children}
    </AttestationFormContext.Provider>
  );
};
