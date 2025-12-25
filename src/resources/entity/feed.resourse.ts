import { PrismaClient } from '@prisma/client';
import { getModelByName } from '@adminjs/prisma';

export const FeedResource = (prisma: PrismaClient) => ({
  resource: { model: getModelByName('Feed'), client: prisma },
  options: {
    id: 'Feed',
    navigation: { name: 'Entities' },
    actions: {
      bulkDelete: { isVisible: false },
    },
  },
});
