import { ApolloServer, ApolloServerOptions } from "@apollo/server";
import { NextRequest } from "next/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";


const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest>(apolloServer as any, {  
  context: async req => {
    const token = req.headers.get("authorization");
    
    return {
      req,
      body: {
        token: token ? `Bearer ${token}` : "",
      }
    };
  },
});

// const handler = startServerAndCreateNextHandler<NextRequest>(apolloServer);
export async function GET(request: NextRequest) {
  return handler(request);
}
export async function POST(request: NextRequest) {  
  return handler(request);
} 
