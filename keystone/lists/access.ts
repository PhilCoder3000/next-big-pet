import {
  KeystoneContext,
  KeystoneListsAPI,
  SessionStrategy,
} from '@keystone-6/core/types';
import { Session } from '../types';

type AccessArgs = {
  session: Session;
  // context: KeystoneContext;
  // listKey: any;
  // operation: any;
  item?: any;
};

export const isAdmin = ({ session }: AccessArgs) => session?.data.isAdmin;

export const isUser = ({ session }: AccessArgs) => !!session?.data;
// export const isPostOwner = ({ session }: AccessArgs ) =>
// export const isPerson = ({ session, item }: { session: Session; item?: UserData }) =>
//   session?.data.id === item?.id;
export const isPerson = ({ session, item }: any) =>
  session?.data.id === item?.id;

export const isAdminOrPerson = ({ session, item }: AccessArgs) =>
  isAdmin({ session }) || isPerson({ session, item });
