import { BaseKeystoneTypeInfo, DatabaseConfig } from '@keystone-6/core/types';

export const keystoneDb: DatabaseConfig<BaseKeystoneTypeInfo> = {
  provider: 'sqlite',
  url: process.env.DATABASE_URL || 'file:./keystone-example.db',
};