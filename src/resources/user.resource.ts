import { DatabaseMetadata } from '@adminjs/sql';
import { ResourceWithOptions } from 'adminjs';

export const UserResource = (db: DatabaseMetadata): ResourceWithOptions => ({
  resource: db.table('user'),
  options: {
    id: 'Users',
    navigation: { icon: 'User' },
    actions: {
      bulkDelete: { isVisible: false },
      delete: { isVisible: false },
      new: { isVisible: false },
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
  },
});
