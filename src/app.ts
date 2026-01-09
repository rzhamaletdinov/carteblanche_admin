import AdminJSExpress from '@adminjs/express';
import AdminJS from 'adminjs';
import Connect from 'connect-pg-simple';
import express from 'express';
import session from 'express-session';
import { Database, Resource } from '@adminjs/prisma';

import { prisma } from './prisma.client.js';
import { componentLoader } from './components/component-loader.js';
import { PhotosResource } from './resources/entity/photos.resourse.js';
import { UserResource } from './resources/entity/user.resource.js';
import { VerificationCodeResource } from './resources/entity/verification_code.resource.js';
import { MatchesResource } from './resources/entity/matches.resourse.js';
import { SettingsResource } from './resources/app-settings.resourse.js';
import { MatchChildrenRatioResource } from './resources/ratio/children-ratio.resourse.js';
import { MatchManAgeRatioResource } from './resources/ratio/man-age-ratio.resourse.js';
import { MatchWoManAgeRatioResource } from './resources/ratio/woman-age-ratio.resourse.js';
import { MatchLooksPersonalityRatioResource } from './resources/ratio/looks-personality-ratio.resourse.js';
import { MatchFirstDateRatioResource } from './resources/ratio/first-date-ratio.resourse.js';
import { MatchDayLookRatioResource } from './resources/ratio/day-look-ratio.resourse.js';
import { FeedResource } from './resources/entity/feed.resourse.js';
import { FeedArchivedResource } from './resources/entity/feed-archived.resourse.js';

AdminJS.registerAdapter({ Database, Resource });

const port = process.env.PORT || 3001;

const DEFAULT_ADMIN = {
  email: 'admin@thegents.com',
  password: 'admin',
};

const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};

const start = async () => {
  const app = express();

  const ConnectSession = Connect(session);
  const sessionStore = new ConnectSession({
    conObject: {
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production',
    },
    tableName: 'session',
    createTableIfMissing: true,
  });

  const resources = [
    VerificationCodeResource(prisma),
    UserResource(prisma),
    PhotosResource(prisma),
    MatchesResource(prisma),
    SettingsResource(prisma),
    MatchChildrenRatioResource(prisma),
    MatchManAgeRatioResource(prisma),
    MatchWoManAgeRatioResource(prisma),
    MatchLooksPersonalityRatioResource(prisma),
    MatchFirstDateRatioResource(prisma),
    MatchDayLookRatioResource(prisma),
    FeedResource(prisma),
    FeedArchivedResource(prisma),
  ];

  const admin = new AdminJS({
    componentLoader,
    rootPath: '/',
    resources,
  });

  if (process.env.NODE_ENV === 'production') {
    await admin.initialize();
  } else {
    console.log('Watching admin files...');
    admin.watch();
  }

  const cookieSecret = process.env.COOKIE_SECRET || 'sessionsecret';

  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate,
      cookieName: 'adminjs',
      cookiePassword: cookieSecret,
    },
    null,
    {
      store: sessionStore,
      resave: true,
      saveUninitialized: true,
      secret: cookieSecret,
      cookie: {
        httpOnly: process.env.NODE_ENV === 'production',
        secure: process.env.NODE_ENV === 'production',
      },
      name: 'adminjs',
    },
  );

  app.use(admin.options.rootPath, adminRouter);

  // Обработка ошибок для детального логирования
  app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    // eslint-disable-next-line no-console
    console.error('[App] ========== ERROR OCCURRED ==========');
    // eslint-disable-next-line no-console
    console.error('[App] Error message:', err.message);
    // eslint-disable-next-line no-console
    console.error('[App] Error stack:', err.stack);
    // eslint-disable-next-line no-console
    console.error('[App] Request URL:', req.url);
    // eslint-disable-next-line no-console
    console.error('[App] Request method:', req.method);
    // eslint-disable-next-line no-console
    console.error('[App] Request body:', JSON.stringify(req.body, null, 2));
    // eslint-disable-next-line no-console
    console.error('[App] Request query:', JSON.stringify(req.query, null, 2));

    // Если это ошибка PostgreSQL, парсим и логируем детали
    if (err.message && err.message.includes('malformed array literal')) {
      // eslint-disable-next-line no-console
      console.error('[App] ========== POSTGRESQL ARRAY ERROR ==========');
      // eslint-disable-next-line no-console
      console.error('[App] Full error message:', err.message);

      // Пытаемся найти проблемное поле в сообщении об ошибке
      const arrayErrorMatch = err.message.match(/malformed array literal:\s*"([^"]+)"/);
      if (arrayErrorMatch) {
        // eslint-disable-next-line no-console
        console.error('[App] Problematic array value:', arrayErrorMatch[1]);
      }

      // Пытаемся найти проблемное поле в SQL запросе
      const sqlMatch = err.message.match(/set\s+"([^"]+)"\s*=\s*\$(\d+)/);
      if (sqlMatch) {
        // eslint-disable-next-line no-console
        console.error('[App] Problematic field in SQL:', sqlMatch[1]);
        // eslint-disable-next-line no-console
        console.error('[App] Parameter number:', sqlMatch[2]);
      }

      // Логируем все массивные поля из body
      const arrayFields = ['photos', 'income_source', 'interests'];
      arrayFields.forEach((field) => {
        if (req.body && field in req.body) {
          // eslint-disable-next-line no-console
          console.error(`[App] Field "${field}" value:`, {
            value: req.body[field],
            type: typeof req.body[field],
            isArray: Array.isArray(req.body[field]),
            stringified: JSON.stringify(req.body[field]),
          });
        }
      });

      // eslint-disable-next-line no-console
      console.error('[App] Full request body:', JSON.stringify(req.body, null, 2));
      // eslint-disable-next-line no-console
      console.error('[App] ============================================');
    }

    next(err);
  });

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`AdminJS available at http://localhost:${port}${admin.options.rootPath}`);
  });
};

start().finally(async () => {
  await prisma.$disconnect();
});
