import { EAS } from '@ethereum-attestation-service/eas-sdk';
import { useQuery } from '@tanstack/react-query';
import type { Signer } from 'ethers';

interface AttestationViewerProps {
  attestationUID: string;
  easContractAddress?: string;
  signer?: Signer;
}

export const AttestationViewer = (props: AttestationViewerProps) => {
  const { data } = useQuery({
    queryKey: ['attestation', props.attestationUID],
    queryFn: async () => {
      if (!props.signer) return;
      if (!props.easContractAddress) return;
      const eas = new EAS(props.easContractAddress);

      eas.connect(props.signer);
      const attestation = await eas.getAttestation(props.attestationUID);
      return attestation;
    },
    enabled: Boolean(props.signer && props.easContractAddress),
  });

  return (
    <div className='flex w-full max-w-xl flex-col gap-2 rounded-2xl p-5 shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px]'>
      <div className='text-2xl font-medium'>Attestation</div>
      <div className='border-b border-neutral-200 pb-2 text-sm text-neutral-400'>
        Details about the attestation such as the fields and the resolver
        address.
      </div>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};
