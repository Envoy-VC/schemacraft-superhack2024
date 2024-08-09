'use client';

import * as React from 'react';

import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '~/components/ui/chart';

interface SchemaTimelineChartProps {
  chartData: {
    date: string;
    schemas: number;
    attestations: number;
  }[];
}

const chartConfig = {
  views: {
    label: 'Page Views',
  },
  schemas: {
    label: 'Schemas',
    color: 'hsl(var(--chart-1))',
  },
  attestations: {
    label: 'Attestations',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export const SchemaTimelineChart = ({
  chartData,
}: SchemaTimelineChartProps) => {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>('schemas');

  const total = React.useMemo(
    () => ({
      schemas: chartData.reduce((acc, curr) => acc + curr.schemas, 0),
      attestations: chartData.reduce((acc, curr) => acc + curr.attestations, 0),
    }),
    [chartData]
  );

  return (
    <Card>
      <CardHeader className='flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row'>
        <div className='flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6'>
          <CardTitle>Protocol Statistics</CardTitle>
          <CardDescription>
            Showing total registered schemas and attestations
          </CardDescription>
        </div>
        <div className='flex'>
          {['schemas', 'attestations'].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                className='data-[active=true]:bg-muted/50 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-l sm:border-t-0 sm:px-8 sm:py-6'
                data-active={activeChart === chart}
                type='button'
                onClick={() => setActiveChart(chart)}
              >
                <span className='text-xs text-muted-foreground'>
                  {chartConfig[chart].label}
                </span>
                <span className='text-lg font-bold leading-none sm:text-3xl'>
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className='px-2 sm:p-6'>
        <ChartContainer
          className='aspect-auto h-[250px] w-full'
          config={chartConfig}
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid className='opacity-25' vertical={false} />
            <XAxis
              axisLine={false}
              dataKey='date'
              minTickGap={32}
              tickLine={false}
              tickMargin={8}
              tickFormatter={(value: string) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className='w-[150px]'
                  nameKey='views'
                  labelFormatter={(value: string) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    });
                  }}
                />
              }
            />
            <Line
              dataKey={activeChart}
              dot={false}
              stroke={`var(--color-${activeChart})`}
              strokeWidth={2}
              type='monotone'
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
