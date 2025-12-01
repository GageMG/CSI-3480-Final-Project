'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { pbkdf2Sync } from 'pbkdf2';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/Field';

import { useDek } from '@/hooks/dek';
import { useUser } from '@/hooks/user';

import { getSalt, login } from '@/actions/auth';

import { isValidEmail } from '@/util/string';
import { getKek } from '@/util/client-auth';

import { VaultItem } from '@/types/password-manager';
import { aes256Decrypt } from '@/util/aes256';

function LoginForm() {
  const { setDek } = useDek();
  const { setGuid, setEncryptedItems, setDecryptedItems } = useUser();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginDisabled, setLoginDisabled] = useState(true);
  const [error, setError] = useState<string>('');

  async function handleLogin() {
    setLoginDisabled(true);

    if (!isValidEmail(email)) {
      setError('Login failed. Please check your email and password.');
      setLoginDisabled(false);
      return;
    }

    const salt = await getSalt(email);
    if (!salt) {
      setError('Login failed. Please check your email and password.');
      setLoginDisabled(false);
      return;
    }

    // TODO: This iteration count be much higher in production.
    const verifier = pbkdf2Sync(password, salt, 500, 32).toString('hex');

    const userData = await login(email, verifier);
    if (!userData) {
      setError('Login failed. Please check your email and password.');
      setLoginDisabled(false);
      return;
    }

    const { guid, encDek, encryptedItems } = userData;
    setGuid(guid);

    const kek = await getKek(password, salt);
    const dek = aes256Decrypt(kek, encDek);
    setDek(dek);

    setEncryptedItems(encryptedItems);
    const decryptedItems: VaultItem[] = [];
    for (const encryptedItem of encryptedItems) {
      decryptedItems.push({
        name: encryptedItem.name ? aes256Decrypt(dek, encryptedItem.name) : '',
        username: encryptedItem.username ? aes256Decrypt(dek, encryptedItem.username) : '',
        password: encryptedItem.password ? aes256Decrypt(dek, encryptedItem.password) : ''
      });
    }
    setDecryptedItems(decryptedItems);

    setLoginDisabled(false);

    redirect('/');
  }

  useEffect(() => {
    setError('');
    if (!email || !password) {
      setLoginDisabled(true);
      return;
    }
    setLoginDisabled(false);
  }, [email, password]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Don't have an account?
          {' '}
          <Link href='/register'>Register</Link>
        </CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-4'>
        <FieldGroup onSubmit={handleLogin}>
          <Field>
            <FieldLabel htmlFor='email'>Email</FieldLabel>
            <Input
              placeholder='Email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              id='email'
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleLogin();
                }
              }}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor='password'>Password</FieldLabel>
            <Input
              placeholder='Password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type='password'
              id='password'
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleLogin();
                }
              }}
            />
          </Field>
          <FieldError>{error}</FieldError>
          <Field>
            <Button onClick={handleLogin} disabled={loginDisabled}>
              Log In
            </Button>
          </Field>
        </FieldGroup>
      </CardContent>
    </Card>
  );
}

export default LoginForm;
