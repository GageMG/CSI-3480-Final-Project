'use client';

import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

import { login } from '@/actions/auth';
import { redirect } from 'next/navigation';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    if(!email || !password) {
      alert('Please fill in all fields.');
      // Missing fields.
      return;
    }

    const loginSuccess = await login(email, password);
    if(loginSuccess) {
      redirect('/');
    }

    alert('Login failed. Please try again.');
  }

  return (
    <>
    <Input
        placeholder='Email'
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
        }}
        />
      <Input
        placeholder='Password'
        value={password}
        onChange={(e) => {
          setPassword(e.target.value)
        }}
      />
      <Button onClick={handleLogin}
      >
        Log In
      </Button>
      <p>Don't have an account? <Link href='/register'>Register</Link></p>
    </>
  );
}

export default LoginForm;
