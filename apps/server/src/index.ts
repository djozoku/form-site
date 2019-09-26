import 'reflect-metadata';

import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';

import UserResolver from './resolvers/User';

const main = async () => {
  await createConnection({
    name: 'default',
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'ozokudev',
    database: 'form-db',
    synchronize: true,
    entities: ['src/entity/*.*']
  });
  const app = express();

  const schema = await buildSchema({ resolvers: [UserResolver] });

  const server = new ApolloServer({ schema });

  server.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('Server Started on http://localhost:4000/graphql');
  });
};

main();
