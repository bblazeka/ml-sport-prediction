import { ApolloServer } from "apollo-server";
import { ApolloServer as LambdaApolloServer } from "apollo-server-lambda";

import * as analysis from "./services/analysis";
import * as game from "./services/game";
import * as team from "./services/team";
import * as league from "./services/league";
import * as player from "./services/player";

import { Database } from "./adapters/dbhandler";
import { getTypeDefs } from "./typeDefs";
import { getResolvers } from "./resolvers";

/// <reference path='./types/index.d.ts' />
/// <reference path='./types/api/index.d.ts' />

const server = new ApolloServer({
  typeDefs: getTypeDefs(),
  resolvers: getResolvers(),
});

let databaseInitialized = false;

async function init() {
  if (!databaseInitialized) {
    console.log("Initializing database...");
    const database = new Database();
    await database.init();
    analysis.init(database);
    game.init(database);
    team.init(database);
    player.init(database);
    league.init(database);

    databaseInitialized = true;
  }
}

// The `listen` method launches a web server.
server.listen().then(async ({ url }) => {
  await init();
  console.log(`🚀  Server ready at ${url}`);
});

// CREATE A HANDLER TO DEPLOY TO SERVERLESS

const createHandler = async () => {
  await init();
  const lambdaServer = new LambdaApolloServer({
    typeDefs: getTypeDefs(),
    resolvers: getResolvers(),
  });
  return lambdaServer.createHandler();
};

// https://github.com/apollographql/apollo-server/issues/1989
export const handler = async (event, context) => {
  const handler = await createHandler();
  return await handler(event, context, undefined);
};
