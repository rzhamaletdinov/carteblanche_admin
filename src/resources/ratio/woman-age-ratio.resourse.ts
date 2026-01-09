import { PrismaClient } from '@prisma/client';
import { getModelByName } from '@adminjs/prisma';

export const MatchWoManAgeRatioResource = (prisma: PrismaClient) => ({
  resource: { model: getModelByName('MatchWomanAgeRatio'), client: prisma },
  options: {
    id: 'MatchWomanAgeRatio',
    navigation: { name: 'Ratios' },
    actions: {
      bulkDelete: { isVisible: false },
    },
  },
});
