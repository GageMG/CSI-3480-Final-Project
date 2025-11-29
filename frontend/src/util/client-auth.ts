'use client';

import argon2 from 'argon2-browser';
import aes256 from 'aes256';

import { redirect } from 'next/navigation';

export async function getKek(password: string, salt: string): Promise<string> {
  const kekHash = await argon2.hash({
    pass: new Uint8Array(Buffer.from(password)),
    salt,
    time: 3,
    mem: 65536
  });
  return kekHash.hashHex;
}

export function encryptDek(dek: string, kek: string): string {
  return aes256.encrypt(kek, dek);
}

export function decryptDek(encDek: string, kek: string): string {
  return aes256.decrypt(kek, encDek);
}

// export async function logout(): Promise<void> {
//   const session = await getSession();
//   session.isAuthenticated = false;
//   session.destroy();
//   redirect('/login');
// }
