import {
  createEffect,
  createEvent,
  restore,
} from 'effector';
import { User } from '@prisma/client';

export const setUser = createEvent<User>('setUser');
export const clearUser = createEvent('clearUser');

export const login = createEffect('login');
export const logout = createEffect('logout');

export const $loginError = restore(login.failData);


