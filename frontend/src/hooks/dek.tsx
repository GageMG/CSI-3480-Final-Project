'use client';

import { createContext, useContext, useState } from 'react';

// Context
const DekContext = createContext({
  dek: '',
  setDek: (dek: string) => {}
});

// Our hook.
export function useDek(): {
  dek: string;
  setDek: (dek: string) => void;
} {
  return useContext(DekContext);
}

// Our hook logic.
function useProvideDek() {
  const [dek, setDek] = useState<string>('');

  return {
    dek,
    setDek
  };
}

// The context we provide.
export function ProvideDek({ children }: { children: React.ReactNode }) {
  const dek = useProvideDek();

  return <DekContext.Provider value={dek}>{children}</DekContext.Provider>;
}
