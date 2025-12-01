import copy from 'copy-to-clipboard';
import { toast } from 'sonner';

import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';

import { VaultItem } from '@/types/password-manager';
import { TrashIcon } from 'lucide-react';

function VaultItemListItem({ vaultItem }: { vaultItem: VaultItem }) {
  function handleCopy() {
    copy(vaultItem.password);
    toast.success('Copied!', { position: 'bottom-right' });
  }

  return (
    <div className='flex hover:bg-gray-900 p-2'>
      <div className='w-[50px] flex justify-center items-center'>
        <Checkbox />
      </div>
      <div className='grow'>
        <p className='hover:underline hover:cursor-pointer'>{vaultItem.name}</p>
        <p className='text-gray-500'>{vaultItem.username}</p>
      </div>
      <div className='flex justify-center items-center gap-1'>
        <Button onClick={handleCopy}>Copy Password</Button>
        <Button size='icon-sm' variant='destructive'>
          <TrashIcon />
        </Button>
      </div>
    </div>
  );
}

export default VaultItemListItem;
