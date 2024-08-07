import React, { createContext } from 'react';

import { EASUIKitStore, createEASUIKitStore } from '~/lib/hooks/use-eas-uikit';

export const EASUIKitContext = createContext<EASUIKitStore | null>(null);

export const EASUIKitProvider = ({ children }: React.PropsWithChildren) => {
  const store = React.useRef(createEASUIKitStore()).current;

  return (
    <EASUIKitContext.Provider value={store}>
      {children}
    </EASUIKitContext.Provider>
  );
};

export default EASUIKitProvider;
