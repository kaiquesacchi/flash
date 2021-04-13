import { ApolloServer } from "apollo-server-micro";

import { typeDefs } from "../../graphql/schemas";
import { resolvers } from "../../graphql/resolvers";
import dbConnect from "../../../lib/mongoose";

export interface iApolloContext {
  db: typeof import("mongoose");
}

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async () => {
    const db = await dbConnect();
    return {
      db,
    };
  },
});

// Lets the Apollo Server handle the parsing.
export const config = {
  api: {
    bodyParser: false,
  },
};

// Points the Apollo server to the endpoint.
export default apolloServer.createHandler({ path: "/api/graphql" });
