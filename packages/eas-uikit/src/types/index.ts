import type { Signer, TransactionReceipt } from 'ethers';


/* eslint-disable @typescript-eslint/naming-convention -- for eas */
export enum FieldType {
  address = 'address',
  string = 'string',
  bool = 'bool',
  bytes32 = 'bytes32',
  bytes = 'bytes',
  uint8 = 'uint8',
  uint16 = 'uint16',
  uint24 = 'uint24',
  uint32 = 'uint32',
  uint40 = 'uint40',
  uint48 = 'uint48',
  uint56 = 'uint56',
  uint64 = 'uint64',
  uint72 = 'uint72',
  uint80 = 'uint80',
  uint88 = 'uint88',
  uint96 = 'uint96',
  uint104 = 'uint104',
  uint112 = 'uint112',
  uint120 = 'uint120',
  uint128 = 'uint128',
  uint136 = 'uint136',
  uint144 = 'uint144',
  uint152 = 'uint152',
  uint160 = 'uint160',
  uint168 = 'uint168',
  uint176 = 'uint176',
  uint184 = 'uint184',
  uint192 = 'uint192',
  uint200 = 'uint200',
  uint208 = 'uint208',
  uint216 = 'uint216',
  uint224 = 'uint224',
  uint232 = 'uint232',
  uint240 = 'uint240',
  uint248 = 'uint248',
  uint256 = 'uint256',
  int8 = 'int8',
  int16 = 'int16',
  int24 = 'int24',
  int32 = 'int32',
  int40 = 'int40',
  int48 = 'int48',
  int56 = 'int56',
  int64 = 'int64',
  int72 = 'int72',
  int80 = 'int80',
  int88 = 'int88',
  int96 = 'int96',
  int104 = 'int104',
  int112 = 'int112',
  int120 = 'int120',
  int128 = 'int128',
  int136 = 'int136',
  int144 = 'int144',
  int152 = 'int152',
  int160 = 'int160',
  int168 = 'int168',
  int176 = 'int176',
  int184 = 'int184',
  int192 = 'int192',
  int200 = 'int200',
  int208 = 'int208',
  int216 = 'int216',
  int224 = 'int224',
  int232 = 'int232',
  int240 = 'int240',
  int248 = 'int248',
  int256 = 'int256',
}

export interface AttestBuilderProps {
  schemaUID: string;
  easContractAddress: string;
  registryAddress: string;
  signer?: Signer;
  onSuccess?: (
    uid: string,
    receipt?: TransactionReceipt
  ) => Promise<void> | void;
  onError?: (error: unknown) => Promise<void> | void;
}

export interface AttestationViewerProps {
  attestationUID: string;
  easContractAddress: string;
  registryAddress: string;
  signer?: Signer;
}
export interface SchemaBuilderProps {
  signer?: Signer;
  registryAddress: string;
  onSuccess?: (
    uid: string,
    receipt?: TransactionReceipt
  ) => void | Promise<void>;
  onError?: (error: unknown) => void | Promise<void>;
}

export interface SchemaViewerProps {
  schemaUID: string;
  registryAddress: string;
  signer?: Signer;
}