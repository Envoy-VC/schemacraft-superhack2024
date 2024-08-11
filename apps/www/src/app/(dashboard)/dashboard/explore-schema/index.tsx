import React from 'react';

import { AttestSchema } from 'eas-uikit';

export const Viewer = () => {
  return (
    <div>
      <AttestSchema
        schemaUID='0xa1d848a3e4fc480df46ab83f0708ff436a8cc2e5d33ae96b10dba43f3ddc6b7c'
        easContractAddress='0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0' // Sepolia EAS Contract Address
        registryAddress='0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0' // Sepolia Schema Registry Address
        signer={signer}
        onError={(error) => console.error('Error creating attestation:', error)}
        onSuccess={(uid) => console.log('Attestation created with uid:', uid)}
      />
    </div>
  );
};
