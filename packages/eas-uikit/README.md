# EAS UIKit

EAS UIKit is a collection of components and utilities used to build applications on top of Ethereum Attestation Service. Developers can quickly build applications that interact with the EAS smart contracts by using the components provided by EAS UIKit.

## Components

1. Schema Builder
2. Schema Viewer
3. Attest Schema
4. Attestation Viewer

## Getting Started

To get started with EAS UIKit, you can install the package using the following command/s:

```bash
npm install eas-uikit
# or
yarn add eas-uikit
# or
pnpm add eas-uikit
```

you can the then import the components in your application as shown below:

```tsx
import {
  AttestSchema,
  AttestationViewer,
  SchemaBuilder,
  SchemaViewer,
} from 'eas-uikit';
```

## Schema Viewer

The Schema Viewer component allows you to view the details about the schema such as fields, revocable details, etc.

It takes in the following props:

- **schemaUID**: `string`: The uid of the schema to view
- **registryAddress**: `string`: The SchemaRegistry contract address on the network.
- **signer**: `Signer`: The ethers.js signer object.

```tsx
<SchemaViewer
  registryAddress='0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0' // Sepolia Schema Registry Address
  schemaUID='0xa1d848a3e4fc480df46ab83f0708ff436a8cc2e5d33ae96b10dba43f3ddc6b7c'
  signer={signer}
/>
```

---

## Schema Builder

The Schema Builder component allows you to create a new schema by specifying the fields, revocable details, expiration time, recipients, etc.

It takes in the following props:

- **signer**: `Signer`: The ethers.js signer object.
- **registryAddress**: `string`: The SchemaRegistry contract address on the network.
- **onSuccess**: `(uid: string, receipt?: TransactionReceipt) => void | Promise<void>`: Optional Callback function that is called when the schema is successfully created.
- **onError**: `(error: unknown) => void | Promise<void>`: Optional Callback function that is called when an error occurs while creating the schema.

Usage example:

```tsx
<SchemaBuilder
  registryAddress='0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0' // Sepolia Schema Registry Address
  signer={signer}
  onError={(error) => console.error('Error creating schema:', error)}
  onSuccess={(uid) => console.log('Schema created with uid:', uid)}
/>
```

---

## Attest Schema

The Attestation Maker component allows you to create an attestation for a schema by specifying the schema UID, recipient, data, etc.

It takes in the following props:

- **schemaUID**: `string`: The uid of the schema to attest.
- **easContractAddress**: `string`: The EAS contract address on the network.
- **registryAddress**: `string`: The SchemaRegistry contract address on the network.
- **signer**: `Signer`: The ethers.js signer object.
- **onSuccess**: `(uid: string, receipt?: TransactionReceipt) => void | Promise<void>`: Optional Callback function that is called when the attestation is successfully created.
- **onError**: `(error: unknown) => void | Promise<void>`: Optional Callback function that is called when an error occurs while creating the attestation.

Usage example:

```tsx
<AttestSchema
  schemaUID='0xa1d848a3e4fc480df46ab83f0708ff436a8cc2e5d33ae96b10dba43f3ddc6b7c'
  easContractAddress='0xC2679fBD37d54388Ce493F1DB75320D236e1815e' // Sepolia EAS Contract Address
  registryAddress='0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0' // Sepolia Schema Registry Address
  signer={signer}
  onError={(error) => console.error('Error creating attestation:', error)}
  onSuccess={(uid) => console.log('Attestation created with uid:', uid)}
/>
```

---

## Attestation Viewer

The Attestation Viewer component allows you to view the details about the attestation such as schema, decoded data, expiration time, etc.

It takes in the following props:

export interface AttestationViewerProps {
attestationUID: string;
easContractAddress: string;
registryAddress: string;
signer?: Signer;
}

- **attestationUID**: `string`: The uid of the attestation to view.
- **easContractAddress**: `string`: The EAS contract address on the network.
- **registryAddress**: `string`: The SchemaRegistry contract address on the network.
- **signer**: `Signer`: The ethers.js signer object.

Usage example:

```tsx
<AttestationViewer
  attestationUID='0x9e9d8feff919889127a409b0d842bdb2a2e90268ebc80bf163a4e9cda17ffd06'
  easContractAddress='0xC2679fBD37d54388Ce493F1DB75320D236e1815e' // Sepolia EAS Contract Address
  registryAddress='0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0' // Sepolia Schema Registry Address
  signer={signer}
/>
```

---

## API Reference

For a complete API Reference of available functions and usage examples, please refer to the Generated Typedocs at: https://eas-uikit.envoy1084.xyz

---
