'use client';

import { FolderIcon, FolderOpen, LockIcon, RefreshCw } from 'lucide-react';

import NavButton from '@/components/NavButton/NavButton';
import { Button } from '@/components/ui/Button';
import { getSession } from '@/util/auth';

function NavBar() {
  return (
    <div className='p-4 flex flex-col gap-4'>
      <p className='text-center text-2xl font-bold cursor-pointer'>Password Manager</p>
      <div>
        <div className='flex flex-col gap-2'>
          <NavButton icon={<LockIcon />} active>Vault</NavButton>
          <NavButton icon={<RefreshCw />}>Password Generator</NavButton>
        </div>
      </div>
      <div className='grow'>
        <p className='text-xl font-bold mb-2'>Categories</p>
        <div className='flex flex-col gap-2'>
          <NavButton icon={<FolderOpen />} active>All Passwords</NavButton>
          <NavButton icon={<FolderIcon />}>Gaming</NavButton>
          <NavButton icon={<FolderIcon />}>Shopping</NavButton>
          <NavButton icon={<FolderIcon />}>Social Media</NavButton>
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <Button className='w-full' variant='outline'>Switch User</Button>
        <Button className='w-full'>Log Out
        </Button>
      </div>
    </div>
  );
}

export default NavBar;
