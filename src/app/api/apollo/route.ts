import { ApolloServer, ApolloServerOptions } from "@apollo/server";
import { NextRequest } from "next/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

import { userAuth } from "@/utils/auth";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }: {req: Request, res: Response}) => {
    const user = userAuth.getUser();
    console.log("context log", user, req.headers);
    
    return {
      user
    };
  },
} as ApolloServerOptions<any>);

const handler = startServerAndCreateNextHandler<NextRequest>(apolloServer);
export async function GET(request: NextRequest) {
  return handler(request);
}
export async function POST(request: NextRequest) {
  return handler(request);
} 
