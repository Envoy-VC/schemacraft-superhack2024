import React from 'react';

import { AbstractSigner } from 'ethers';

interface SchemaBuilderProps {
  registryAddress: string;
  resolverAddress: string;
  signer: AbstractSigner;
}

export const SchemaBuilder = (props: SchemaBuilderProps) => {
  return <div>SchemaBuilder</div>;
};
