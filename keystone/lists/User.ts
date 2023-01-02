import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { checkbox, password, text } from '@keystone-6/core/fields';
import { Session } from '../types';

type UserData = {
  // id: string;
  name: string;
  // email: string;
  // password: string;
  // isAdmin: boolean;
};

const isAdmin = ({ session }: { session: Session }) => session?.data.isAdmin;

const isUser = ({ session }: { session: Session }) => !!session?.data.id;

// const isPerson = ({ session, item }: { session: Session; item?: UserData }) =>
//   session?.data.id === item?.id;
const isPerson = ({ session, item }: any) => session?.data.id === item?.id;

const isAdminOrPerson = ({ session, item }: any) =>
  isAdmin({ session }) || isPerson({ session, item });

export const User = list({
  access: allowAll,
  fields: {
    name: text({
      validation: { isRequired: true },
      access: allowAll,
    }),
    email: text({
      validation: { isRequired: true },
      isIndexed: 'unique',
      access: {
        read: isAdminOrPerson,
      },
    }),
    password: password({ validation: { isRequired: true }, access: isPerson }),
    isAdmin: checkbox({
      access: {
        read: allowAll,
        update: isUser,
      },
    }),
  },
});
