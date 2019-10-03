import 'dotenv/config';
import 'reflect-metadata';

import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';

import UserResolvers from './resolvers/user';

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

  const app = express();

  const schema = await buildSchema({ resolvers: [...UserResolvers], validate: false });

  const server = new ApolloServer({ schema, context: ({ req, res }) => ({ req, res }) });

  server.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('Server Started on http://localhost:4000/graphql');
  });
};

main();
