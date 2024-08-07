/* eslint-disable @typescript-eslint/no-unsafe-argument -- safe  */
import { useMemo } from 'react';

import {
  BrowserProvider,
  FallbackProvider,
  JsonRpcProvider,
  JsonRpcSigner,
} from 'ethers';
import type { Account, Chain, Client, Transport } from 'viem';
import { useChainId, useClient, useConnectorClient } from 'wagmi';

export function clientToProvider(client: Client<Transport, Chain>) {
  const { chain, transport } = client;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  if (transport.type === 'fallback') {
    const providers = (transport.transports as ReturnType<Transport>[]).map(
      ({ value }) => new JsonRpcProvider(value?.url, network)
    );
    if (providers.length === 1) return providers[0];
    return new FallbackProvider(providers);
  }
  return new JsonRpcProvider(transport.url, network);
}

export function clientToSigner(client: Client<Transport, Chain, Account>) {
  const { account, chain, transport } = client;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  const provider = new BrowserProvider(transport, network);
  const signer = new JsonRpcSigner(provider, account.address);
  return signer;
}

export const useEthers = () => {
  const chainId = useChainId();
  const { data: connecterClient } = useConnectorClient({ chainId });
  const client = useClient({ chainId });
  const provider = useMemo(
    () => (client ? clientToProvider(client) : undefined),
    [client]
  );
  const signer = useMemo(
    () => (connecterClient ? clientToSigner(connecterClient) : undefined),
    [connecterClient]
  );

  return { signer, provider };
};
