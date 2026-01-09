import { PrismaClient } from '@prisma/client';
import { getModelByName } from '@adminjs/prisma';

export const MatchChildrenRatioResource = (prisma: PrismaClient) => ({
  resource: { model: getModelByName('MatchChildrenRatio'), client: prisma },
  options: {
    id: 'MatchChildrenRatio',
    navigation: { name: 'Ratios' },
    actions: {
      bulkDelete: { isVisible: false },
    },
  },
});
