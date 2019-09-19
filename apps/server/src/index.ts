import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema, Resolver, Query } from 'type-graphql';
import { createConnection } from 'typeorm';

@Resolver()
class HelloResolver {
  @Query(() => String)
  hello() {
    return 'Hello World!';
  }
}

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

  const schema = await buildSchema({ resolvers: [HelloResolver] });

  const server = new ApolloServer({ schema });

  server.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('Server Started on http://localhost:4000/graphql');
  });
};

main();
