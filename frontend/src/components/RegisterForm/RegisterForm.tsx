'use client';

import { useState } from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

import { register } from '@/actions/auth';

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  async function handleRegister() {
    if(!email || !password) {
      alert('Please fill in all fields.');
      return;
    }

    const success = await register(email, password);
    if(success) {
      redirect('/');
    }
    alert('Registration failed. Please try again.');
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
      <Button onClick={handleRegister}>
        Register
      </Button>
      <p>Already have an account? <Link href='/login'>Log in</Link></p>
   </>
  );
}

export default RegisterForm;
