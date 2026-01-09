import { DatabaseDialect } from '@adminjs/sql';

export const databaseType: DatabaseDialect = (process.env.DATABASE_URL?.startsWith('postgresql')
  || process.env.DATABASE_URL?.startsWith('postgres')) ? 'postgresql' : 'postgresql';

// Извлекаем имя БД из DATABASE_URL если DATABASE_NAME не задан
const getDatabaseName = (): string => {
  if (process.env.DATABASE_NAME) {
    return process.env.DATABASE_NAME;
  }
  if (process.env.DATABASE_URL) {
    const parts = process.env.DATABASE_URL.split('/');
    const dbName = parts[parts.length - 1]?.split('?')[0];
    if (dbName) {
      return dbName;
    }
  }
  throw new Error(
    'DATABASE_NAME is required. Either set DATABASE_NAME env variable or ensure DATABASE_URL contains database name',
  );
};

export const connectionOptions = {
  connectionString: process.env.DATABASE_URL,
  database: getDatabaseName(),
};
