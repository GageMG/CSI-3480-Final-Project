'use server';

import { redirect } from 'next/navigation';
import { pbkdf2Sync } from 'pbkdf2';

import { getSession } from '@/util/auth';
import { get, post } from '@/util/api';

export async function register(
  email: string,
  verifier: string,
  salt: string,
  encDek: string
): Promise<number> {
  const response = await post('/register', {
    email,
    salt,
    verifier,
    encDek
  });
  if (response.status === 201) {
    const session = await getSession();
    session.isAuthenticated = true;
    await session.save();
  }
  return response.status;
}

export async function login(email: string, password: string): Promise<boolean> {
  const saltResponse = await get('/get-salt', { email });
  if (saltResponse.status !== 200) {
    return false;
  }

  const salt = saltResponse.data.salt;
  if (typeof salt !== 'string') {
    return false;
  }
  const verifier = pbkdf2Sync(password, salt, 500000, 32, 'sha256').toString('hex');

  const loginResponse = await post('/login', {
    email,
    verifier
  });
  if (loginResponse.status !== 200) {
    return false;
  }

  const session = await getSession();
  session.isAuthenticated = true;
  await session.save();

  redirect('/');

  return true;
}
