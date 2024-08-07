import React from 'react';

import { SchemaBuilder } from 'eas-uikit';
import { Navbar } from '~/components';

const Home = () => {
  return (
    <div>
      <Navbar />
      <SchemaBuilder />
    </div>
  );
};

export default Home;
