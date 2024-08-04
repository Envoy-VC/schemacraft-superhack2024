import { defineChain } from 'viem';
import { env } from '~/env';

export const attestChainTestnet = defineChain({
  id: 8453,
  name: 'Attest Chain Testnet',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: [env.NEXT_PUBLIC_ATTEST_CHAIN_TESTNET_RPC_URL],
    },
  },
  blockExplorers: {
    default: {
      name: 'Etherscan',
      url: env.NEXT_PUBLIC_ATTEST_CHAIN_TESTNET_BLOCK_EXPLORER_URL,
    },
  },
});

export const attestChain = defineChain({
  id: 13370,
  name: 'Attest Chain',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: [env.NEXT_PUBLIC_ATTEST_CHAIN_RPC_URL],
      webSocket: [env.NEXT_PUBLIC_ATTEST_CHAIN_WSS],
    },
  },
  blockExplorers: {
    default: {
      name: 'Etherscan',
      url: env.NEXT_PUBLIC_ATTEST_CHAIN_BLOCK_EXPLORER_URL,
    },
  },
});
