import { list } from '@keystone-6/core';
import { text, password, checkbox } from '@keystone-6/core/fields';

type Session = {
  data: {
    id: string;
    isAdmin: boolean;
  };
};

const isAdmin = ({ session }: { session: Session }) => session?.data.isAdmin;

export const User = list({
  fields: {
    email: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
    nickname: text({ validation: { isRequired: true } }),
    password: password(),
    isAdmin: checkbox({
      defaultValue: false
    })
  },
  access: {
    operation: {
      query: () => true,
      create: () => true,
      update: () => true,
      delete: () => true,
    },
  },
});