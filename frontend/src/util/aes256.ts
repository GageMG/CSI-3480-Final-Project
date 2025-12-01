'use client';

import aes256 from 'aes256';

export function aes256Encrypt(key: string, value: string): string {
  return aes256.encrypt(key, value);
}

export function aes256Decrypt(key: string, value: string): string {
  return aes256.decrypt(key, value);
}
