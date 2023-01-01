import { config } from '@keystone-6/core';
import { withAuth } from './keystone/auth/withAuth';
import { keystoneLists } from './keystone/lists';
import { keystoneSession } from './keystone/auth/sessions';
import { keystoneDb } from './keystone/db';

export default withAuth(
  config({
    db: keystoneDb,
    lists: keystoneLists,
    session: keystoneSession,
  }),
);
