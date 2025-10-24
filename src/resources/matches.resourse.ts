import { DatabaseMetadata } from '@adminjs/sql';
import { ResourceWithOptions } from 'adminjs';

import { Components } from '../admin/component-loader.js';

export const MatchesResource = (db: DatabaseMetadata): ResourceWithOptions => ({
  resource: db.table('match'),
  options: {
    id: 'Matches',
    navigation: null,
    actions: {
      new: { component: Components.NewMatchAction },
    },
    listProperties: ['id', 'user1Id', 'user2Id', 'status', 'createdAt', 'status', 'chatId'],
    sort: {
      sortBy: 'createdAt',
      direction: 'asc',
    },
  },
});
