import { ApolloServer, ApolloServerOptions } from "@apollo/server";
import { NextRequest } from "next/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

import { userAuth } from "@/utils/auth";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }: { req: any }) => {
    const user = userAuth.getUser();
    return {
      headers: req.headers,
      user
    };
  },
});
const handler = startServerAndCreateNextHandler<NextRequest>(apolloServer);
export async function GET(request: NextRequest) {
  return handler(request);
}
export async function POST(request: NextRequest) {
  return handler(request);
} 