'use client';

import { createContext, useContext, useState } from 'react';

// Context
const UserContext = createContext({
  guid: '',
  setGuid: (guid: string) => {}
});

// Our hook.
export function useUser(): {
  guid: string;
  setGuid: (guid: string) => void;
} {
  return useContext(UserContext);
}

// Our hook logic.
function useProvideUser() {
  const [guid, setGuid] = useState<string>('');

  return {
    guid,
    setGuid
  };
}

// The context we provide.
export function ProvideUser({ children }: { children: React.ReactNode }) {
  const user = useProvideUser();

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
