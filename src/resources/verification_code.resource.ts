import { DatabaseMetadata } from '@adminjs/sql';
import { ResourceWithOptions } from 'adminjs';

export const VerificationCodeResource = (db: DatabaseMetadata): ResourceWithOptions => ({
  resource: db.table('verification_code'),
  options: {
    id: 'Verification Codes',
    navigation: null,
    actions: {
      bulkDelete: { isVisible: false },
      delete: { isVisible: false },
      new: { isVisible: false },
      edit: { isVisible: false },
      show: { isVisible: false },
    },
    listProperties: ['type', 'code', 'contact'],
    sort: {
      sortBy: 'createdAt',
      direction: 'asc',
    },
  },
});
