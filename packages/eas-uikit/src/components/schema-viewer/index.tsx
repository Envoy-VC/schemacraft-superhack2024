// 0xdf9216b915bd0077156c42395f13187e8b4386e5b07795b3d8fefe20ab0666ee
import { SchemaRegistry } from '@ethereum-attestation-service/eas-sdk';
import { useQuery } from '@tanstack/react-query';
import type { Signer } from 'ethers';

interface SchemaViewerProps {
  schemaUID?: string;
  registryAddress?: string;
  signer?: Signer;
}

export const SchemaViewer = (props: SchemaViewerProps) => {
  const { data } = useQuery({
    queryKey: ['schema', props.schemaUID],
    queryFn: async () => {
      if (!props.signer) return;
      if (!props.registryAddress) return;
      const schemaRegistry = new SchemaRegistry(props.registryAddress);

      schemaRegistry.connect(props.signer);

      const schemaRecord = await schemaRegistry.getSchema({
        uid:
          props.schemaUID ??
          '0xdf9216b915bd0077156c42395f13187e8b4386e5b07795b3d8fefe20ab0666ee',
      });
      return schemaRecord;
    },
    enabled: Boolean(props.signer && props.registryAddress),
  });
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};
