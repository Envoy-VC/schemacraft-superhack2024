import Image from 'next/image';

import React from 'react';

import ArchitectureImage from 'public/architecture.png';

export const Architecture = () => {
  return (
    <div className='dark mx-auto flex h-screen w-full max-w-screen-xl flex-col items-center gap-6'>
      <div className='py-12 text-center text-5xl font-semibold text-neutral-300'>
        Architecture
      </div>
      <Image
        alt='Architecture Image'
        height={600}
        src={ArchitectureImage}
        width={1200}
      />
    </div>
  );
};
