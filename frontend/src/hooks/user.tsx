'use client';

import { createContext, useContext, useState } from 'react';

import { VaultItem } from '@/types/password-manager';

// Context
const UserContext = createContext({
  guid: '',
  setGuid: (guid: string) => {},
  encryptedItems: [] as VaultItem[],
  setEncryptedItems: (items: VaultItem[]) => {},
  addEncryptedItem: (item: VaultItem) => {},
  decryptedItems: [] as VaultItem[],
  setDecryptedItems: (items: VaultItem[]) => {},
  addDecryptedItem: (item: VaultItem) => {}
});

// Our hook.
export function useUser(): {
  guid: string;
  setGuid: (guid: string) => void;
  encryptedItems: VaultItem[];
  setEncryptedItems: (items: VaultItem[]) => void;
  addEncryptedItem: (item: VaultItem) => void;
  decryptedItems: VaultItem[];
  setDecryptedItems: (items: VaultItem[]) => void;
  addDecryptedItem: (item: VaultItem) => void;
} {
  return useContext(UserContext);
}

// Our hook logic.
function useProvideUser() {
  const [guid, setGuid] = useState<string>('');
  const [encryptedItems, setEncryptedItems] = useState<VaultItem[]>([]);
  const [decryptedItems, setDecryptedItems] = useState<VaultItem[]>([]);

  function addEncryptedItem(item: VaultItem) {
    const items = [...encryptedItems, item];
    items.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    setEncryptedItems(items);
  }

  function addDecryptedItem(item: VaultItem) {
    const items = [...decryptedItems, item];
    items.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    setDecryptedItems(items);
  }

  return {
    guid,
    setGuid,
    encryptedItems,
    setEncryptedItems,
    addEncryptedItem,
    decryptedItems,
    setDecryptedItems,
    addDecryptedItem
  };
}

// The context we provide.
export function ProvideUser({ children }: { children: React.ReactNode }) {
  const user = useProvideUser();

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
