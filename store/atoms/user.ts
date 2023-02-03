import { User } from '@prisma/client';
import { atom } from 'recoil';

interface UserAuthData {
  isOpenModal: boolean;
  isLoading: boolean;
  mode: 'Sign in' | 'Sign up';
  name: string;
  email: string;
  password: string;
  authenticatedUser: User | null;
}

export const userAuthData = atom<UserAuthData>({
  key: 'userAuthData',
  default: {
    isOpenModal: false,
    isLoading: false,
    mode: 'Sign in',
    name: '',
    email: '',
    password: '',
    authenticatedUser: null,
  },
});
