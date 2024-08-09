'use client';

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { type ChartConfig, ChartContainer } from '~/components/ui/chart';

import { TrendingDown } from 'lucide-react';

/* eslint-disable react/no-unstable-nested-components -- safe */

interface GasFeeChartProps {
  title?: string;
  subtitle: string;
  color: string;
  units?: string;
  value: number;
  stats: {
    title: string;
    subtitle: string;
  };
}

export const GasFeeChart = (props: GasFeeChartProps) => {
  const chartData = [
    { browser: 'safari', fee: props.value, fill: 'var(--color-safari)' },
  ];

  const chartConfig = {
    fee: {
      label: 'gwei',
    },
    safari: {
      label: 'Safari',
      color: props.color,
    },
  } satisfies ChartConfig;
  return (
    <Card className='flex w-full basis-1/3 flex-col'>
      <CardHeader className='items-center pb-0'>
        <CardTitle>{props.title ?? 'Average Gas Fee'}</CardTitle>
        <CardDescription>{props.subtitle}</CardDescription>
      </CardHeader>
      <CardContent className='flex-1 pb-0'>
        <ChartContainer
          className='mx-auto aspect-square max-h-[250px]'
          config={chartConfig}
        >
          <RadialBarChart
            data={chartData}
            endAngle={250}
            innerRadius={80}
            outerRadius={110}
            startAngle={0}
          >
            <PolarGrid
              className='first:fill-muted last:fill-background'
              gridType='circle'
              polarRadius={[86, 74]}
              radialLines={false}
              stroke='none'
            />
            <RadialBar background cornerRadius={10} dataKey='fee' />
            <PolarRadiusAxis axisLine={false} tick={false} tickLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        dominantBaseline='middle'
                        textAnchor='middle'
                        x={viewBox.cx}
                        y={viewBox.cy}
                      >
                        <tspan
                          className='fill-foreground text-4xl font-bold'
                          x={viewBox.cx}
                          y={viewBox.cy}
                        >
                          {chartData[0]?.fee.toLocaleString()}
                        </tspan>
                        <tspan
                          className='fill-muted-foreground'
                          x={viewBox.cx}
                          y={(viewBox.cy ?? 0) + 24}
                        >
                          {props.units ?? 'Gwei'}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col gap-2 text-sm'>
        <div className='flex items-center gap-2 font-medium leading-none'>
          {props.stats.title} <TrendingDown className='h-4 w-4' />
        </div>
        <div className='leading-none text-muted-foreground'>
          {props.stats.subtitle}
        </div>
      </CardFooter>
    </Card>
  );
};
