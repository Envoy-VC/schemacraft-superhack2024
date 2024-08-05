'use client';

import React from 'react';

import { Navbar } from '~/components';

import { Input } from '~/components/ui/input';

const Home = () => {
  return (
    <div>
      <Navbar />
      <h1>Welcome to the home page!</h1>
      <Input placeholder='Arshit' />
    </div>
  );
};

export default Home;
