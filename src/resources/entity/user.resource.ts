import { Components } from '../../admin/component-loader.js';

import { PrismaClient } from '@prisma/client';
import { getModelByName } from '@adminjs/prisma';

export const UserResource = (prisma: PrismaClient) => ({
  resource: { model: getModelByName('User'), client: prisma },
  options: {
    id: 'User',
    navigation: { name: 'Entities', icon: 'User' },
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
