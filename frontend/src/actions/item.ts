'use server';

import { AxiosResponse } from 'axios';

import { post } from '@/util/api';

import { VaultItem } from '@/types/password-manager';

export async function createItem(encryptedItem: VaultItem, guid: string): Promise<number> {
  const response = await post('/create-item', {
    ...encryptedItem,
    userGuid: guid
  });
  return response.status;
}
