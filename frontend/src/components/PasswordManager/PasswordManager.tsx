'use client';

import { useState } from 'react';
import { PlusIcon } from 'lucide-react';

import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import ItemCreationDialog from '@/components/ItemCreationDialog/ItemCreationDialog';
import VaultItemListItem from '@/components/VaultItemListItem/VaultItemListItem';

import { useUser } from '@/hooks/user';

function PasswordManager() {
  const { encryptedItems, decryptedItems } = useUser();

  const [search, setSearch] = useState('');

  return (
    <div className='grow p-4 flex flex-col gap-4'>
      <p className='text-xl font-bold'>All Passwords</p>
      <div className='flex gap-2'>
        <Input
          placeholder='Search items...'
          className='w-full'
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <ItemCreationDialog>
          <Button>
            <PlusIcon />
            New Item
          </Button>
        </ItemCreationDialog>
      </div>
      {
        decryptedItems.length === 0 && <p>No items found.</p>
      }
      {
        decryptedItems.filter((decryptedItem) => {
          return decryptedItem.name.toLowerCase().includes(search.toLowerCase());
        }).map((decryptedItem, i) => {
          return <VaultItemListItem vaultItem={decryptedItem} key={i} />;
        })
      }
    </div>
  );
}

export default PasswordManager;
