'use client';

import { createContext, useContext, useState } from 'react';

import { VaultItem } from '@/types/password-manager';

// Context
const UserContext = createContext({
  guid: '',
  setGuid: (guid: string) => {},
  encryptedItems: [] as VaultItem[],
  setEncryptedItems: (items: VaultItem[]) => {},
  decryptedItems: [] as VaultItem[],
  setDecryptedItems: (items: VaultItem[]) => {}
});

// Our hook.
export function useUser(): {
  guid: string;
  setGuid: (guid: string) => void;
  encryptedItems: VaultItem[];
  setEncryptedItems: (items: VaultItem[]) => void;
  decryptedItems: VaultItem[];
  setDecryptedItems: (items: VaultItem[]) => void;
} {
  return useContext(UserContext);
}

// Our hook logic.
function useProvideUser() {
  const [guid, setGuid] = useState<string>('');
  const [encryptedItems, setEncryptedItems] = useState<VaultItem[]>([]);
  const [decryptedItems, setDecryptedItems] = useState<VaultItem[]>([]);

  return {
    guid,
    setGuid,
    encryptedItems,
    setEncryptedItems,
    decryptedItems,
    setDecryptedItems
  };
}

// The context we provide.
export function ProvideUser({ children }: { children: React.ReactNode }) {
  const user = useProvideUser();

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
