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

import { getSalt, login } from '@/actions/auth';

import { isValidEmail } from '@/util/string';
import { decryptDek, getKek } from '@/util/client-auth';

function LoginForm() {
  const { dek, setDek } = useDek();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginDisabled, setLoginDisabled] = useState(true);
  const [error, setError] = useState<string>('');

  async function handleLogin() {
    if (!isValidEmail(email)) {
      setError('Login failed. Please check your email and password.');
      return;
    }

    const salt = await getSalt(email);
    if (!salt) {
      setError('Login failed. Please check your email and password.');
      return;
    }

    // TODO: This iteration count be much higher in production.
    const verifier = pbkdf2Sync(password, salt, 500, 32).toString('hex');

    const encDek = await login(email, verifier);
    if (!encDek) {
      setError('Login failed. Please check your email and password.');
      return;
    }

    const kek = await getKek(password, salt);
    const dek = await decryptDek(encDek, kek);
    setDek(dek);

    redirect('/');
  }

  useEffect(() => {
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
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor='email'>Email</FieldLabel>
            <Input
              placeholder='Email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              id='email'
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
