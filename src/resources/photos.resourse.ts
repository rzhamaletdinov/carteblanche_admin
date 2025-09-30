import { DatabaseMetadata } from '@adminjs/sql';
import { ResourceWithOptions } from 'adminjs';

export const PhotosResource = (db: DatabaseMetadata): ResourceWithOptions => ({
  resource: db.table('photo'),
  options: {
    id: 'Photos',
    navigation: null,
    actions: {
      bulkDelete: { isVisible: false },
      delete: { isVisible: false },
      new: { isVisible: false },
      edit: { isVisible: false },
      show: { isVisible: false },
    },
    // listProperties: ['type', 'code', 'contact'],
    sort: {
      sortBy: 'createdAt',
      direction: 'asc',
    },
  },
});
