import React from 'react';

import { Architecture, Hero, Navbar, Statistics } from '~/components';

const Home = () => {
  return (
    <div className='min-h-screen bg-black'>
      <Navbar />
      <Hero />
      <Architecture />
      <Statistics />
    </div>
  );
};

export default Home;
