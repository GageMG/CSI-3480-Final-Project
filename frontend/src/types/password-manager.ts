import { ApiData } from '@/util/api';

export interface VaultItem {
  name: string;
  username: string;
  password: string;
}

export interface DatabaseVaultItem extends VaultItem {
  guid: string;
  user_guid: string;
}
