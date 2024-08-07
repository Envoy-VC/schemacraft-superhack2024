import { defineChain } from 'viem';
import { env } from '~/env';

export const attestChainTestnet = defineChain({
  id: 8453,
  name: 'Attest Chain Virtual Testnet',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: [env.NEXT_PUBLIC_ATTEST_CHAIN_TESTNET_RPC_URL],
    },
  },
  testnet: true,
  blockExplorers: {
    default: {
      name: 'Virtual Block Explorer',
      url: env.NEXT_PUBLIC_ATTEST_CHAIN_TESTNET_BLOCK_EXPLORER_URL,
    },
  },
});

export const attestChain = defineChain({
  id: 13370,
  iconUrl:
    'https://www.insightplatforms.com/wp-content/uploads/2021/11/Attest_LogoLockup_WhiteRGB-copy-1024x1024.jpg',
  name: 'Attest Chain Testnet',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: [env.NEXT_PUBLIC_ATTEST_CHAIN_RPC_URL],
      webSocket: [env.NEXT_PUBLIC_ATTEST_CHAIN_WSS],
    },
  },
  testnet: true,
  blockExplorers: {
    default: {
      name: 'BlockScout Explorer',
      url: env.NEXT_PUBLIC_ATTEST_CHAIN_BLOCK_EXPLORER_URL,
    },
  },
});
