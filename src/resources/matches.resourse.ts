import { DatabaseMetadata } from '@adminjs/sql';
import { ResourceWithOptions } from 'adminjs';

import { Components } from '../admin/component-loader.js';

export const MatchesResource = (db: DatabaseMetadata): ResourceWithOptions => ({
  resource: db.table('match'),
  options: {
    id: 'Matches',
    navigation: null,
    actions: {
      // bulkDelete: { isVisible: false },
      // delete: { isVisible: true },
      new: { component: Components.NewMatchAction },
      // edit: { isVisible: true },
      // show: { isVisible: true },
    },
    listProperties: ['id', 'user1Id', 'user2Id', 'status', 'createdAt', 'status', 'chat_id'],
    sort: {
      sortBy: 'createdAt',
      direction: 'asc',
    },
  },
});
