import Image from 'next/image';
import Link from 'next/link';

import React from 'react';

import AttestChainLogo from 'public/attest-chain-logo.png';

import { HoverBorderGradient } from '../border-gradient';
import { Cover } from './cover';

export const Hero = () => {
  return (
    <div className='dark flex flex-col items-center gap-12 py-24 min-h-screen'>
      <h1 className='relative z-20 mx-auto mt-6 max-w-7xl bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 bg-clip-text py-6 text-center text-4xl font-semibold leading-[2] text-transparent dark:from-neutral-800 dark:via-white dark:to-white md:text-4xl lg:text-6xl'>
        Attestation development <br /> at <Cover>warp speed</Cover>
      </h1>
      <div className='flex flex-col items-center gap-3'>
        <div className='text-xl text-neutral-300'>
          Custom Chain tailored for high-speed & Low cost Attestations
        </div>
        <Link
          href='https://explorer-attest-chain-52s82yu298.t.conduit.xyz/stats'
          target='_blank'
        >
          <HoverBorderGradient
            as='div'
            className='flex items-center space-x-2 bg-white text-black dark:bg-black dark:text-white'
            containerClassName='rounded-full'
          >
            <Image
              alt='Attest Chain Logo'
              className='rounded-full'
              height={28}
              src={AttestChainLogo}
              width={28}
            />
            <span>Attest Chain</span>
          </HoverBorderGradient>
        </Link>
      </div>
    </div>
  );
};
