import { config } from '@keystone-6/core';
import { Post } from './schema';
import { User } from './schemas/users/user';

const dbUrl =
  process.env.DATABASE_URL ||
  `postgres://${process.env.USER}@prisma-keystone-workshop`;

export default config({
  db: {
    provider: 'sqlite',
    url: 'file:./keystone.db',
  },
  experimental: {
    generateNextGraphqlAPI: true,
  },
  lists: { Post, User },
});
