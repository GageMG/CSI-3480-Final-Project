'use server';

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

export async function getSalt(email: string): Promise<string | null> {
  const response = await get('/get-salt', { email });
  if (response.status !== 200) {
    return null;
  }
  return response.data.salt;
}

interface UserData {
  guid: string;
  encDek: string;
}

export async function login(email: string, verifier: string): Promise<UserData | ''> {
  const loginResponse = await post('/login', {
    email,
    verifier
  });
  if (loginResponse.status !== 200) {
    return '';
  }

  const userData: UserData | '' = loginResponse.data;
  if (!userData) {
    return '';
  }

  const session = await getSession();
  session.isAuthenticated = true;
  await session.save();

  return userData;
}
