import { PrismaClient } from '@prisma/client';
import { getModelByName } from '@adminjs/prisma';

export const PhotosResource = (prisma: PrismaClient) => ({
  resource: { model: getModelByName('Photo'), client: prisma },
  options: {
    id: 'Photos',
    navigation: { name: 'Entities' },
    actions: {
      bulkDelete: { isVisible: false },
      delete: { isVisible: false },
      new: { isVisible: false },
      edit: { isVisible: false },
      show: { isVisible: false },
    },
    // listProperties: ['type', 'code', 'contact'],
    sort: {
      sortBy: 'createdAt',
      direction: 'asc',
    },
  },
});
