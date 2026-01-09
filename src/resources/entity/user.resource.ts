import { PrismaClient } from '@prisma/client';
import { getModelByName } from '@adminjs/prisma';

import { Components } from '../../components/component-loader.js';
import { PatchHook } from '../../hooks/patch.hook.js';

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
      edit: {
        before: PatchHook,
        after: async (response: { record?: { errors?: Record<string, unknown> } }) => {
          if (response.record && response.record.errors && Object.keys(response.record?.errors).length > 0) {
            // eslint-disable-next-line no-console
            console.error('[UserResource] Edit after hook - Errors:', JSON.stringify(response.record?.errors, null, 2));
          }
          return response;
        },
      },
    },
    listProperties: ['id', 'name', 'email', 'createdAt'],
    properties: {
      income_source: {
        type: 'array',
        isArray: true,
        components: { edit: Components.IncomeSourcesEditAction },
        isVisible: { edit: true, show: true },
      },
      interests: {
        type: 'array',
        isArray: true,
        isVisible: { edit: true, show: true },
      },
      photos: {
        type: 'array',
        isArray: true,
        isVisible: { edit: true, show: true },
      },
      status: {
        isRequired: true,
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
