'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import React from 'react';

import { Button } from '~/components/ui/button';

import { SwatchBookIcon } from 'lucide-react';

const sidebarItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
  },
];

const sidebarItems1 = [
  {
    name: 'Explore Schema',
    href: '/dashboard/explore-schema',
    regex: /^\/dashboard\/explore-schema.*$/,
  },
  {
    name: 'Create Schema',
    href: '/dashboard/create-schema',
    regex: /^\/dashboard\/create-schema.*$/,
  },
];

const sidebarItems2 = [
  {
    name: 'Explore Attestation',
    href: '/dashboard/explore-attestation',
    regex: /^\/dashboard\/explore-attestation.*$/,
  },
  {
    name: 'Make attestation',
    href: '/dashboard/make-attestation',
    regex: /^\/dashboard\/make-attestation.*$/,
  },
];

const sidebarItems3 = [
  {
    name: 'Schema Analytics',
    href: '/dashboard/analytics',
    regex: /^\/dashboard\/analytics.*$/,
  },
];

export const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className='!dark w-full max-w-[18rem] bg-black text-white'>
      <div className='sticky top-0 flex h-screen flex-col items-start px-3 py-4'>
        <SwatchBookIcon className='my-2' height={48} width={48} />
        <div className='flex w-full flex-col gap-[3px] pt-12'>
          {sidebarItems.map((item) => {
            const isActive = item.href === pathname;

            return (
              <Button
                key={item.name}
                asChild
                className='m-0 flex h-8 w-full justify-start px-2 !text-sm text-[#dedfe3]'
                variant={isActive ? 'secondary' : 'ghost'}
              >
                <Link href={item.href}>{item.name}</Link>
              </Button>
            );
          })}
        </div>
        <div className='px-2 pb-2 pt-6 text-sm font-medium text-gray-400'>
          Schema
        </div>
        <div className='flex w-full flex-col gap-[3px]'>
          {sidebarItems1.map((item) => {
            const isActive = RegExp(item.regex).test(pathname);

            return (
              <Button
                key={item.name}
                asChild
                className='m-0 flex h-8 w-full justify-start px-2 !text-sm text-[#dedfe3]'
                variant={isActive ? 'secondary' : 'ghost'}
              >
                <Link href={item.href}>{item.name}</Link>
              </Button>
            );
          })}
        </div>
        <div className='px-2 pb-2 pt-6 text-sm font-medium text-gray-400'>
          Attestations
        </div>
        <div className='flex w-full flex-col gap-[3px]'>
          {sidebarItems2.map((item) => {
            const isActive = RegExp(item.regex).test(pathname);

            return (
              <Button
                key={item.name}
                asChild
                className='m-0 flex h-8 w-full justify-start px-2 !text-sm text-[#dedfe3]'
                variant={isActive ? 'secondary' : 'ghost'}
              >
                <Link href={item.href}>{item.name}</Link>
              </Button>
            );
          })}
        </div>
        <div className='px-2 pb-2 pt-6 text-sm font-medium text-gray-400'>
          Analytics
        </div>
        <div className='flex w-full flex-col gap-[3px]'>
          {sidebarItems3.map((item) => {
            const isActive = RegExp(item.regex).test(pathname);

            return (
              <Button
                key={item.name}
                asChild
                className='m-0 flex h-8 w-full justify-start px-2 !text-sm text-[#dedfe3]'
                variant={isActive ? 'secondary' : 'ghost'}
              >
                <Link href={item.href}>{item.name}</Link>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
