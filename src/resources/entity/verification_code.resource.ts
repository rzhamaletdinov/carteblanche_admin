import { ResourceOptions } from 'adminjs';
import { PrismaClient } from '@prisma/client';
import { getModelByName } from '@adminjs/prisma';

export const VerificationCodeResource = (prisma: PrismaClient) => ({
  resource: { model: getModelByName('VerificationCode'), client: prisma },
  options: <ResourceOptions>{
    id: 'Verification Codes',
    navigation: { name: 'Entities' },
    actions: {
      bulkDelete: { isVisible: false },
      delete: { isVisible: false },
      new: { isVisible: false },
      edit: { isVisible: false },
      show: { isVisible: false },
    },
    listProperties: ['type', 'code', 'contact'],
    sort: {
      sortBy: 'createdAt',
      direction: 'desc',
    },
  },
});
