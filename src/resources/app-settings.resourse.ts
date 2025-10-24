import { DatabaseMetadata } from '@adminjs/sql';
import { ResourceWithOptions } from 'adminjs';

export const SettingsResource = (db: DatabaseMetadata): ResourceWithOptions => ({
  resource: db.table('AppSettings'),
  options: {
    id: 'Settings',
    navigation: null,
    actions: {
      bulkDelete: { isVisible: false },
    },
    // sort: {
    //   sortBy: 'createdAt',
    //   direction: 'asc',
    // },
  },
});
