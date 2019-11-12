import 'dotenv/config';
import 'reflect-metadata';

import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import i18next from 'i18next';
import i18nextMiddleware from 'i18next-express-middleware';

import enCommon from '@form/i18n/lib/en/common.json';
import enValidation from '@form/i18n/lib/en/validation.json';
import fiCommon from '@form/i18n/lib/fi/common.json';
import fiValidation from '@form/i18n/lib/fi/validation.json';
import { formatFunc } from '@form/i18n';

import { refreshToken, checkAuth } from './utils/auth';
import MailSender from './utils/sendmail';
import UserResolvers from './resolvers/user';
import GroupResolvers from './resolvers/group';

const isDev = process.env.NODE_ENV !== 'production';

const main = async () => {
  await createConnection({
    name: 'default',
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_DATABASE || 'form-db',
    synchronize: isDev || false,
    entities: [`${__dirname}/entity/*.*`],
    logging: isDev ? true : undefined
  });

  await MailSender.init();

  i18next.use(i18nextMiddleware.LanguageDetector).init({
    detection: {
      order: ['header'],
      caches: false
    },
    resources: {
      en: {
        common: enCommon,
        validation: enValidation
      },
      fi: {
        common: fiCommon,
        validation: fiValidation
      }
    },
    fallbackLng: ['en'],
    interpolation: {
      format: formatFunc
    }
  });

  const app = express();

  app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
  app.use(cookieParser());
  app.use(i18nextMiddleware.handle(i18next));

  app.post('/refresh_token', refreshToken);

  const schema = await buildSchema({
    resolvers: [...UserResolvers, ...GroupResolvers],
    validate: true,
    authChecker: checkAuth
  });

  const server = new ApolloServer({ schema, context: ({ req, res }) => ({ req, res }) });

  server.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log('Server Started on http://localhost:4000/graphql');
  });
};

main();
