import AdminJSExpress from '@adminjs/express';
import AdminJS from 'adminjs';
import Connect from 'connect-pg-simple';
import express from 'express';
import session from 'express-session';
import { Database, Resource } from '@adminjs/prisma';

import { prisma } from './prisma.client.js';
import { componentLoader } from './admin/component-loader.js';
import { PhotosResource } from './resources/entity/photos.resourse.js';
import { UserResource } from './resources/entity/user.resource.js';
import { VerificationCodeResource } from './resources/entity/verification_code.resource.js';
import { MatchesResource } from './resources/entity/matches.resourse.js';
import { SettingsResource } from './resources/app-settings.resourse.js';
import { MatchChildrenRatioResource } from './resources/ratio/children-ratio.resourse.js';
import { MatchManAgeRatioResource } from './resources/ratio/man-age-ratio.resourse.js';
import { MatchWoManAgeRatioResource } from './resources/ratio/woman-age-ratio.resourse.js';

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
      connectionString: process.env.DATABASE_URL_ADMIN,
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

  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate,
      cookieName: 'adminjs',
      cookiePassword: 'sessionsecret',
    },
    null,
    {
      store: sessionStore,
      resave: true,
      saveUninitialized: true,
      secret: 'sessionsecret',
      cookie: {
        httpOnly: process.env.NODE_ENV === 'production',
        secure: process.env.NODE_ENV === 'production',
      },
      name: 'adminjs',
    }
  );

  app.use(admin.options.rootPath, adminRouter);

  app.listen(port, () => {
    console.log(`AdminJS available at http://localhost:${port}${admin.options.rootPath}`);
  });
};

start().finally(async () => {
  await prisma.$disconnect();
});
