import { Components } from '../../components/component-loader.js';
import { PrismaClient } from '@prisma/client';
import { getModelByName } from '@adminjs/prisma';

export const MatchesResource = (prisma: PrismaClient) => ({
  resource: { model: getModelByName('Match'), client: prisma },
  options: {
    id: 'Matches',
    navigation: { name: 'Entities' },
    actions: {
      new: { component: Components.NewMatchAction },
    },
    listProperties: ['id', 'user1Id', 'user2Id', 'status', 'createdAt', 'status', 'chatId'],
    sort: {
      sortBy: 'createdAt',
      direction: 'desc',
    },
  },
});
