'use server';

import { redirect } from 'next/navigation';
import { pbkdf2Sync } from 'pbkdf2';

import { getSession } from '@/util/auth';
import { randomSalt } from '@/util/string';
import { post } from '@/util/api';


export async function register(email: string, password: string): Promise<boolean> {
  const salt = randomSalt(32);
  const verifier = pbkdf2Sync(password, salt, 1, 32).toString('hex');

  const response = await post('/register', { email, salt, verifier });
  if(response.status === 201) {
    const session = await getSession();
    session.isAuthenticated = true;
    await session.save();
  }
  return response.status === 201;
}

export async function login(email: string, password: string): Promise<boolean> {
  const saltResponse = await post('/get-salt', { email });
  if(saltResponse.status !== 200) {
    return false;
  }

  const salt = saltResponse.data.salt;
  const verifier = pbkdf2Sync(password, salt, 1, 32).toString('hex');

  const loginResponse = await post('/login', { email, verifier });
  if(loginResponse.status !== 200) {
    return false;
  }
  
  const session = await getSession();
  session.isAuthenticated = true;
  await session.save();

  redirect('/');
}
