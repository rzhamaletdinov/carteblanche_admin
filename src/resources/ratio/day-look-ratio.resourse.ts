import { PrismaClient } from '@prisma/client';
import { getModelByName } from '@adminjs/prisma';

export const MatchDayLookRatioResource = (prisma: PrismaClient) => ({
  resource: { model: getModelByName('MatchDayLookRatio'), client: prisma },
  options: {
    id: 'MatchDayLookRatio',
    navigation: { name: 'Ratios' },
    actions: {
      bulkDelete: { isVisible: false },
    },
  },
});
