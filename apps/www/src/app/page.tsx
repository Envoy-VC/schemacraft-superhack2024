import React from 'react';

import { Hero, Navbar } from '~/components';

import { Statistics } from '~/components/stats';

const Home = () => {
  return (
    <div className='min-h-screen bg-black'>
      <Navbar />
      <Hero />
      <Statistics />
    </div>
  );
};

export default Home;
