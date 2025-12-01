import { useEffect, useState } from 'react';

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
import { Field, FieldError, FieldGroup } from '@/components/ui/Field';

import { useUser } from '@/hooks/user';

import { useDek } from '@/hooks/dek';

import { VaultItem } from '@/types/password-manager';
import { aes256Encrypt } from '@/util/aes256';
import { createItem } from '@/actions/item';

function ItemCreationDialog({ children }: { children?: React.ReactNode }) {
  const { guid, addDecryptedItem, addEncryptedItem } = useUser();
  const { dek } = useDek();

  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit() {
    let formError = '';
    if (!name && !username && !password) {
      formError = 'Must complete form.';
    }
    if (!dek) {
      formError = 'Encryption failed. Try reloading the tab.';
    }

    setError(formError);
    if (formError) {
      return;
    }

    const item: VaultItem = {
      name,
      username,
      password,
      twoFactor: ''
    };

    const encryptedItem: VaultItem = { ...item };
    for (const key of Object.keys(encryptedItem)) {
      const unencrypted = encryptedItem[key as keyof typeof encryptedItem];
      if (!unencrypted) {
        continue;
      }
      encryptedItem[key as keyof typeof encryptedItem] = aes256Encrypt(dek, unencrypted);
    }

    const responseStatus = await createItem(item, guid);

    if (responseStatus !== 201) {
      setError('Saving item failed.');
    }

    addDecryptedItem(item);
    addEncryptedItem(encryptedItem);

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
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>New item</DialogTitle>
        </DialogHeader>
        <FieldGroup className='grid gap-4'>
          <Field className='grid gap-2'>
            <Label htmlFor='name'>Name</Label>
            <Input
              id='name'
              name='name'
              placeholder='Amazon'
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Field>
          <Field className='grid gap-2'>
            <Label htmlFor='username'>Username</Label>
            <Input
              id='username'
              name='username'
              placeholder='johndoe@gmail.com'
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </Field>
          <Field className='grid gap-2'>
            <Label htmlFor='password'>Password</Label>
            <Input
              id='password'
              name='password'
              type='password'
              placeholder='password123'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Field>
          <FieldError>{error}</FieldError>
        </FieldGroup>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <Button type='submit' onClick={handleSubmit}>Add item</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ItemCreationDialog;
