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
      },
    },
    listProperties: ['id', 'name', 'email', 'createdAt'],
    properties: {
      income_source: {
        type: 'array',
        // show: Components.ShowArrayEnumsAction,
        isArray: true,
        components: { edit: Components.IncomeSourcesEditAction },
        isVisible: { edit: true, show: true },

        // custom: {
        //   enumValues: [
        //     'BUSINESS_PROFITS',
        //     'SALARY_WAGE',
        //     'INVESTMENTS',
        //     'SELF_EMPLOYMENT',
        //     'ROYALTIES',
        //     'PENSION_RETIREMENT',
        //     'INHERITANCE',
        //     'FAMILY_SUPPORT',
        //   ],
        // },
      },
      // photos: {
      //   type: 'array',
      //   // components: {
      //   //   // edit: join(__dirname, './components/ImagesEdit'),
      //   //   show: Components.ShowArrayAction,
      //   // },
      // },
      // status: {
      //   availableValues: [
      //     { value: 'NEW', label: 'New user' },
      //     { value: 'WAITING_PREMODERATION', label: 'Waiting for pre-moderation' },
      //     { value: 'ACTIVE', label: 'Active user' },
      //     { value: 'WAITING_APPROVE', label: 'Waiting for approval' },
      //     { value: 'DECLINED', label: 'Declined user' },
      //     { value: 'BANNED', label: 'Blocked user' },
      //   ],
      // },
    },
    sort: {
      sortBy: 'createdAt',
      direction: 'desc',
    },
  },
});
