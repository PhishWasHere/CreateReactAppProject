"use client";

import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  concat,
} from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { userAuth } from "@/utils/auth";
import { setContext } from "@apollo/client/link/context";

const httpLink = new HttpLink({
  uri: process.env.DOMAIN || "http://localhost:3000/api/apollo",
});

// not setting context for server side rendering
// need to fix this as i cant validate anything server side
const authLink = setContext((_, { headers }) => {
  console.log("authLink");
  const token = userAuth.getToken();
  if (!token) {
    console.log("no token");
    return headers;
  }
  
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

function makeClient() {
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: authLink.concat(
      typeof window === "undefined" ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
      ]): httpLink,
    )
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}