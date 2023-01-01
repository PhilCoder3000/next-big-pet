import { statelessSessions } from '@keystone-6/core/session';

export const keystoneSession = statelessSessions({
  secret: 'secret',
});
