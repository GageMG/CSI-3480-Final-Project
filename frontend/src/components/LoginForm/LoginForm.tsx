'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/Button';

import { auth } from '@/actions/auth';

function LoginForm() {
  return (
    <>
      <Button onClick={() => {
        (async() => {
          await auth('password');
        })();
      }}
      >
        Log In
      </Button>
      <p>Don't have an account? <Link href='/register'>Register</Link></p>
    </>
  );
}

export default LoginForm;
