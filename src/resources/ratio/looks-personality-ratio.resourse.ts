import { PrismaClient } from '@prisma/client';
import { getModelByName } from '@adminjs/prisma';

export const MatchLooksPersonalityRatioResource = (prisma: PrismaClient) => ({
  resource: { model: getModelByName('MatchLooksPersonalityRatio'), client: prisma },
  options: {
    id: 'MatchLooksPersonalityRatio',
    navigation: { name: 'Ratios' },
    actions: {
      bulkDelete: { isVisible: false },
    },
  },
});
