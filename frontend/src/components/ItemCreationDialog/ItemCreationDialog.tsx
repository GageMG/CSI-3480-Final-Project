import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

import { useUser } from '@/hooks/user';
import { useEffect, useState } from 'react';

function ItemCreationDialog({ children }: { children?: React.ReactNode }) {
  const { guid } = useUser();

  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (!isOpen) {
      setName('');
      setUsername('');
      setPassword('');
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <form>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>New item</DialogTitle>
          </DialogHeader>
          <div className='grid gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='name'>Name</Label>
              <Input id='name' name='name' placeholder='Amazon' />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='username'>Username</Label>
              <Input id='username' name='username' placeholder='johndoe@gmail.com' />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='password'>Password</Label>
              <Input id='password' name='password' type='password' placeholder='password123' />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DialogClose>
            <Button type='submit' onClick={handleSubmit}>Add item</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default ItemCreationDialog;
