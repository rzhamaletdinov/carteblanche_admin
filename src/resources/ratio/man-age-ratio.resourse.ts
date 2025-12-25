import { PrismaClient } from '@prisma/client';
import { getModelByName } from '@adminjs/prisma';

export const MatchManAgeRatioResource = (prisma: PrismaClient) => ({
  resource: { model: getModelByName('MatchManAgeRatio'), client: prisma },
  options: {
    id: 'MatchManAgeRatio',
    navigation: { name: 'Ratios' },
    actions: {
      bulkDelete: { isVisible: false },
    },
  },
});
