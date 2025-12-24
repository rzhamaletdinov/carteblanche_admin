import { PrismaClient } from '@prisma/client';
import { getModelByName } from '@adminjs/prisma';

export const SettingsResource = (prisma: PrismaClient) => ({
  resource: { model: getModelByName('AppSettings'), client: prisma },
  options: {
    id: 'Settings',
    navigation: null,
    actions: {
      bulkDelete: { isVisible: false },
    },
  },
});
