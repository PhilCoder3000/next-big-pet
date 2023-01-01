import { statelessSessions } from '@keystone-6/core/session';

let secret = process.env.SESSION_SECRET;
if (!secret && process.env.NODE_ENV !== 'production') {
  secret = 'secret_secret_secret_secret_secret_secret';
}

export const keystoneSession = statelessSessions({
  secret: secret!,
});
