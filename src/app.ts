import AdminJSExpress from '@adminjs/express';
import AdminJS from 'adminjs';
import Connect from 'connect-pg-simple';
import express from 'express';
import session from 'express-session';

import componentLoader from './admin/component-loader.js';
import initializeDb from './db/index.js';
import { UserResource } from './resources/user.resource.js';
import { VerificationCodeResource } from './resources/verification_code.resource.js';

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

  const { db } = await initializeDb();

  const ConnectSession = Connect(session);
  const sessionStore = new ConnectSession({
    conObject: {
      connectionString: process.env.DATABASE_URL_ADMIN,
      ssl: process.env.NODE_ENV === 'production',
    },
    tableName: 'session',
    createTableIfMissing: true,
  });

  const admin = new AdminJS({
    componentLoader,
    rootPath: '/',
    resources: [
      VerificationCodeResource(db),
      UserResource(db),
    ],
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
    },
  );

  app.use(admin.options.rootPath, adminRouter);

  app.listen(port, () => {
    console.log(`AdminJS available at http://localhost:${port}${admin.options.rootPath}`);
  });
};

start();
