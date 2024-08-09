import React from 'react';

import { Hero, Navbar } from '~/components';

const Home = () => {
  return (
    <div className='bg-black'>
      <Navbar />
      <Hero />
    </div>
  );
};

export default Home;
