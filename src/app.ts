import { buildRouter } from '@adminjs/express';
import AdminJS from 'adminjs';
import express from 'express';

import componentLoader from './admin/component-loader.js';
import initializeDb from './db/index.js';

const port = process.env.PORT || 3001;

const start = async () => {
  const app = express();

  const { db } = await initializeDb();

  const admin = new AdminJS({
    componentLoader,
    resources: [
      {
        resource: db.table('verification_code'),
        options: {
          listProperties: ['code', 'type', 'contact', 'createdAt'],
          editProperties: ['code'],
          showProperties: ['code'],
          sort: {
            sortBy: 'createdAt',
            direction: 'desc',
          },
        },
      },
      {
        resource: db.table('user'),
      },
    ],
  });

  if (process.env.NODE_ENV === 'production') {
    await admin.initialize();
  } else {
    console.log('Watching admin files...');
    admin.watch();
  }

  const router = buildRouter(
    admin,
    null,
    // {
    //   cookiePassword: process.env.COOKIE_SECRET,
    //   cookieName: 'adminjs',
    //   provider,
    // },
    null,
    // {
    //   secret: process.env.COOKIE_SECRET,
    //   saveUninitialized: true,
    //   resave: true,
    // },
  );

  app.use(admin.options.rootPath, router);

  app.listen(port, () => {
    console.log(`AdminJS available at http://localhost:${port}${admin.options.rootPath}`);
  });
};

start();
