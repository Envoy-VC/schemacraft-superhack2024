import React from 'react';

// import { api } from '~/trpc/server';
import { GasFeeChart } from './charts/gas-fee';

// import { SchemaTimelineChart } from './charts/total-schemas';

export const Statistics = () => {
  // const stats = await api.stats.getStats();
  return (
    <div className='dark mx-auto flex h-screen w-full max-w-screen-xl flex-col gap-6'>
      <div className='py-12 text-center text-5xl font-semibold text-neutral-300'>
        Chain Statistics
      </div>
      <div className='flex flex-row items-center gap-4'>
        <GasFeeChart
          color='hsl(var(--chart-2))'
          subtitle='Registering Schema'
          value={1369}
          stats={{
            title: `7.95 times Lower than Sepolia`,
            subtitle: 'Based on Average of Initial EAS Schemas',
          }}
        />
        <GasFeeChart
          color='hsl(var(--chart-3))'
          subtitle='Creating Attestations'
          value={5108}
          stats={{
            title: `14.33 times Lower than Sepolia`,
            subtitle: 'Based on Average of Initial EAS Attestations',
          }}
        />
        <GasFeeChart
          color='hsl(var(--chart-1))'
          subtitle='Registering Schema'
          title='Average Transaction Time'
          units='Seconds'
          value={6.34}
          stats={{
            title: '6.95 times  Lower than Sepolia',
            subtitle: 'Based on Average of Initial EAS Attestations',
          }}
        />
      </div>
      {/* <SchemaTimelineChart chartData={stats} /> */}
    </div>
  );
};
