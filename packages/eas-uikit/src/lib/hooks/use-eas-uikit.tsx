import { useContext } from 'react';

import { createStore, useStore } from 'zustand';
import { EASUIKitContext } from '~/providers';

export type State = {
  debugLevel: 'off' | 'warn' | 'error';
};

export type EASUIKitProps = State;
export type EASUIKitStore = ReturnType<typeof createEASUIKitStore>;

export const createEASUIKitStore = () => {
  const defaultProps: State = {
    debugLevel: 'off',
  };

  return createStore<EASUIKitProps>()(() => ({
    ...defaultProps,
  }));
};

export const useEASUIKitContext = () => {
  const store = useContext(EASUIKitContext);
  if (!store) throw new Error('Missing TerminalContext.Provider in the tree');
  return useStore(store);
};
