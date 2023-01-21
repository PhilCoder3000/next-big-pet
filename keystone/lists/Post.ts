import { list } from '@keystone-6/core';
import { relationship, text } from '@keystone-6/core/fields';
import { isAdmin, isUser } from './access';

export const Post = list({
  access: {
    operation: {
      query: isUser,
      create: isUser,
      update: isUser,
      delete: isUser,
    },
  },
  fields: {
    title: text({
      validation: { isRequired: true },
    }),
    content: text({
      validation: { isRequired: true },
    }),
    author: relationship({
      ref: 'User.posts',
      many: false,
    }),
  },
});
