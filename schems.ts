import { config, list } from '@keystone-6/core';
import { text, password } from '@keystone-6/core/fields';

type Session = {
  data: {
    id: string;
    isAdmin: boolean;
  };
};

const isAdmin = ({ session }: { session: Session }) => session?.data.isAdmin;

export const Post = list({
  fields: {
    title: text(),
    description: text(),
  },
  access: {
    operation: {
      query: () => true,
      create: isAdmin,
      update: isAdmin,
      delete: isAdmin,
    },
  },
});

export const User = list({
  fields: {
    name: text({ validation: { isRequired: true } }),
    email: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
    password: password(),
  },
  access: {
    operation: {
      query: () => true,
      create: isAdmin,
      update: isAdmin,
      delete: isAdmin,
    },
  },
});
