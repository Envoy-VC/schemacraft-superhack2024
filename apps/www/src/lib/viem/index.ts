import {
  type Config,
  cookieStorage,
  createConfig,
  createStorage,
  http,
} from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { walletConnect } from 'wagmi/connectors';
import { env } from '~/env';

import { attestChain, attestChainTestnet } from './chains';

export const projectId = env.NEXT_PUBLIC_WALLETCONNECT_ID;

const metadata = {
  name: 'Web3 Turbo Starter',
  description: 'Web3 starter kit with turborepo, wagmi, and Next.js',
  url: 'http://localhost:3000',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

export const wagmiConfig: Config = createConfig({
  chains: [mainnet, attestChain, attestChainTestnet],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  connectors: [walletConnect({ projectId, metadata, showQrModal: false })],
  transports: {
    [mainnet.id]: http(),
    [attestChain.id]: http(env.NEXT_PUBLIC_ATTEST_CHAIN_RPC_URL),
    [attestChainTestnet.id]: http(env.NEXT_PUBLIC_ATTEST_CHAIN_TESTNET_RPC_URL),
  },
});
