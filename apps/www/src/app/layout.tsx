import { headers } from 'next/headers';

import { wagmiConfig } from '~/lib/viem';

import { GeistSans } from 'geist/font/sans';
import { type Metadata } from 'next';
import { cookieToInitialState } from 'wagmi';
import { Web3Provider } from '~/providers';
import '~/styles/globals.css';
import { TRPCReactProvider } from '~/trpc/react';

import { Toaster } from '~/components/ui/sonner';

export const metadata: Metadata = {
  title: 'Create T3 App',
  description: 'Generated by create-t3-app',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const initialState = cookieToInitialState(
    wagmiConfig,
    headers().get('cookie')
  );
  return (
    <html lang='en'>
      <body className={`font-sans ${GeistSans.variable}`}>
        <TRPCReactProvider>
          <Web3Provider initialState={initialState}>
            {children}
            <Toaster />
          </Web3Provider>
        </TRPCReactProvider>
      </body>
    </html>
  );
};

export default RootLayout;
