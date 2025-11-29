'use client';

import { useState } from 'react';

import { Input } from '@/components/ui/Input';

import { useUser } from '@/hooks/user';
import { Button } from '@/components/ui/Button';
import { PlusIcon } from 'lucide-react';
import ItemCreationDialog from '../ItemCreationDialog/ItemCreationDialog';

function PasswordManager() {
  const { encryptedItems, decryptedItems, setDecryptedItems } = useUser();

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
      <p>{JSON.stringify(encryptedItems)}</p>
      <p>{JSON.stringify(decryptedItems)}</p>
    </div>
  );
}

export default PasswordManager;
