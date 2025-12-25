import { PrismaClient } from '@prisma/client';
import { getModelByName } from '@adminjs/prisma';

export const MatchFirstDateRatioResource = (prisma: PrismaClient) => ({
  resource: { model: getModelByName('MatchFirstDateRatio'), client: prisma },
  options: {
    id: 'MatchFirstDateRatio',
    navigation: { name: 'Ratios' },
    actions: {
      bulkDelete: { isVisible: false },
    },
  },
});
