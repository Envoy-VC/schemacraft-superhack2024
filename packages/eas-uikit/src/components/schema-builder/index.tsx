import { JsonRpcSigner } from 'ethers';

import { SchemaBuilderForm } from './form';

export interface SchemaBuilderProps {
  signer?: JsonRpcSigner;
  registryAddress?: string;
  resolverAddress?: string;
  onCreateCallback?: (hash: string) => void | Promise<void>;
}

export const SchemaBuilder = (props: SchemaBuilderProps) => {
  return (
    <div className='flex max-w-xl flex-col gap-2 rounded-2xl p-5 shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px]'>
      <div className='text-2xl font-medium'>Create a Schema</div>
      <div className='border-b border-neutral-200 pb-2 text-sm text-neutral-400'>
        Define the structure of the data you want to store on the blockchain.
      </div>
      <SchemaBuilderForm {...props} />
    </div>
  );
};
