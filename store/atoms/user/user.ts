import { User } from '@prisma/client';
import { atom } from 'recoil';

interface UserAuthData {
  isOpenModal: boolean;
  isLoading: boolean;
  mode: 'Sign in' | 'Sign up';
  user: User | null;
}

export const userAuthData = atom<UserAuthData>({
  key: 'userAuthData',
  default: {
    isOpenModal: false,
    isLoading: false,
    mode: 'Sign in',
    user: null,
  },
});
