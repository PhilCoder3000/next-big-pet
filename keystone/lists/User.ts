import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import {
  checkbox,
  password,
  relationship,
  select,
  text,
} from '@keystone-6/core/fields';
import { isAdminOrPerson, isPerson, isUser } from './access';

export const User = list({
  access: allowAll,
  fields: {
    name: text({
      validation: { isRequired: true },
    }),
    email: text({
      validation: { isRequired: true },
      isIndexed: 'unique',
    }),
    password: password({ validation: { isRequired: true }, access: isPerson }),
    isAdmin: checkbox({
      access: {
        read: allowAll,
        update: isUser,
      },
    }),
    posts: relationship({
      ref: 'Post.author',
      many: true,
    }),
    theme: select({
      type: 'enum',
      options: [
        { label: 'Dark', value: 'dark' },
        { label: 'Light', value: 'light' },
      ],
      defaultValue: 'light',
      ui: {
        displayMode: 'radio',
      },
    }),
  },
});
