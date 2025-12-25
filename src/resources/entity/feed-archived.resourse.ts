import { PrismaClient } from '@prisma/client';
import { getModelByName } from '@adminjs/prisma';

export const FeedArchivedResource = (prisma: PrismaClient) => ({
  resource: { model: getModelByName('FeedArchived'), client: prisma },
  options: {
    id: 'FeedArchived',
    navigation: { name: 'Entities' },
    actions: {
      bulkDelete: { isVisible: false },
    },
  },
});
