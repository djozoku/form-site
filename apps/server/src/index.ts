import 'dotenv/config';
import 'reflect-metadata';

import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';

import MailSender from './utils/sendmail';
import UserResolvers from './resolvers/user';
import { refreshToken, checkAuth } from './utils/auth';

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

  const app = express();

  app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
  app.use(cookieParser());

  app.post('/refresh_token', refreshToken);

  const schema = await buildSchema({
    resolvers: [...UserResolvers],
    validate: true,
    authChecker: checkAuth
  });

  const server = new ApolloServer({ schema, context: ({ req, res }) => ({ req, res }) });

  server.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('Server Started on http://localhost:4000/graphql');
  });
};

main();
