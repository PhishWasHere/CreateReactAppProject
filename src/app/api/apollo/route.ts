import { ApolloServer, ApolloServerOptions } from "@apollo/server";
import { NextRequest } from "next/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import logs from "@/utils/apolloLogs";


const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  // plugins: [
  //   logs
  // ]
});

const handler = startServerAndCreateNextHandler<NextRequest>(apolloServer as any, {
  // i hate how this is done, but it works and cant figure out a better way to do it
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
