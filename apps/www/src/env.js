import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']),
  },
  client: {
    NEXT_PUBLIC_WALLETCONNECT_ID: z.string().min(1),
    NEXT_PUBLIC_ATTEST_CHAIN_RPC_URL: z.string().url(),
    NEXT_PUBLIC_ATTEST_CHAIN_TESTNET_RPC_URL: z.string().url(),
    NEXT_PUBLIC_ATTEST_CHAIN_BLOCK_EXPLORER_URL: z.string().url(),
    NEXT_PUBLIC_ATTEST_CHAIN_TESTNET_BLOCK_EXPLORER_URL: z.string().url(),
    NEXT_PUBLIC_ATTEST_CHAIN_WSS: z.string().min(1),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_WALLETCONNECT_ID: process.env.NEXT_PUBLIC_WALLETCONNECT_ID,
    NEXT_PUBLIC_ATTEST_CHAIN_TESTNET_RPC_URL:
      process.env.NEXT_PUBLIC_ATTEST_CHAIN_TESTNET_RPC_URL,
    NEXT_PUBLIC_ATTEST_CHAIN_TESTNET_BLOCK_EXPLORER_URL:
      process.env.NEXT_PUBLIC_ATTEST_CHAIN_TESTNET_BLOCK_EXPLORER_URL,
    NEXT_PUBLIC_ATTEST_CHAIN_RPC_URL:
      process.env.NEXT_PUBLIC_ATTEST_CHAIN_RPC_URL,
    NEXT_PUBLIC_ATTEST_CHAIN_BLOCK_EXPLORER_URL:
      process.env.NEXT_PUBLIC_ATTEST_CHAIN_BLOCK_EXPLORER_URL,
    NEXT_PUBLIC_ATTEST_CHAIN_WSS: process.env.NEXT_PUBLIC_ATTEST_CHAIN_WSS,
  },
  skipValidation: Boolean(process.env.SKIP_ENV_VALIDATION),
  emptyStringAsUndefined: true,
});
