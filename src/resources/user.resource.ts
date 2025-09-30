import { DatabaseMetadata } from '@adminjs/sql';
import { ResourceWithOptions } from 'adminjs';

export const UserResource = (db: DatabaseMetadata): ResourceWithOptions => ({
  resource: db.table('user'),
  options: {
    id: 'user',
    navigation: { icon: 'User' },
    actions: {
      bulkDelete: { isVisible: false },
      delete: { isVisible: false },
      new: { isVisible: false },
      show: {
        after: async (response) => {
          if (!response?.record?.params?.id) {
            return response;
          }

          try {
            const photoTable = db.table('photo');
            const photoProperties = photoTable.properties.map((property) => property.path());
            const referenceProperty = photoTable.properties.find((property) => property.reference?.() === 'user');

            let userForeignKey = referenceProperty?.path() ?? null;
            if (!userForeignKey) {
              if (photoProperties.includes('userId')) {
                userForeignKey = 'userId';
              } else if (photoProperties.includes('user_id')) {
                userForeignKey = 'user_id';
              }
            }

            if (!userForeignKey) {
              return response;
            }

            let createdAtColumn: string | null = null;
            if (photoProperties.includes('createdAt')) {
              createdAtColumn = 'createdAt';
            } else if (photoProperties.includes('created_at')) {
              createdAtColumn = 'created_at';
            }

            const buildPhotosQuery = () => {
              const query = photoTable.knex(photoTable.tableName);
              if (photoTable.schemaName) {
                return query.withSchema(photoTable.schemaName);
              }
              return query;
            };

            const photosQuery = buildPhotosQuery().where(userForeignKey, response.record.params.id);

            if (createdAtColumn) {
              photosQuery.orderBy(createdAtColumn, 'asc');
            }

            const photos = await photosQuery;

            return {
              ...response,
              meta: {
                ...(response.meta ?? {}),
                userPhotosCount: photos.length,
              },
              record: {
                ...response.record,
                params: {
                  ...response.record.params,
                  photos,
                },
              },
            };
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Failed to load user photos in show action', error);
            return response;
          }
        },
      },
    },
    listProperties: ['id', 'name', 'email', 'createdAt'],
    properties: {
      status: {
        availableValues: [
          { value: 'NEW', label: 'New user' },
          { value: 'WAITING_PREMODERATION', label: 'Waiting for pre-moderation' },
          { value: 'ACTIVE', label: 'Active user' },
          { value: 'WAITING_APPROVE', label: 'Waiting for approval' },
          { value: 'DECLINED', label: 'Declined user' },
          { value: 'BANNED', label: 'Blocked user' },
        ],
      },
    },
  },
});
