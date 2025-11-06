import { DatabaseMetadata } from '@adminjs/sql';
import { ResourceWithOptions } from 'adminjs';

import { Components } from '../admin/component-loader.js';

export const UserResource = (db: DatabaseMetadata): ResourceWithOptions => ({
  resource: db.table('user'),
  options: {
    id: 'user',
    navigation: { icon: 'User' },
    actions: {
      bulkDelete: { isVisible: false },
      delete: { isVisible: false },
      new: { isVisible: false },
      show: {
        component: Components.ShowUserAction,
      },
    },
    listProperties: ['id', 'name', 'email', 'createdAt'],
    properties: {
      status: {
        availableValues: [
          { value: 'NEW', label: 'New user' },
          { value: 'WAITING_PREMODERATION', label: 'Waiting for pre-moderation' },
          { value: 'ACTIVE', label: 'Active user' },
          { value: 'WAITING_APPROVE', label: 'Waiting for approval' },
          { value: 'DECLINED', label: 'Declined user' },
          { value: 'BANNED', label: 'Blocked user' },
        ],
      },
    },
    sort: {
      sortBy: 'createdAt',
      direction: 'desc',
    },
  },
});
