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
  uri: process.env.API_URI || "http://localhost:3000/api/apollo",
});

// need this function or the token wont set.
  // even though the token will always return undefined as window isnt avaliable on the server
    // but if function is removed, the token will never be set aaaaaaaaa
export const authLink = setContext(async(_, { headers }) => {
  let token = userAuth.getToken();

  if (!token) {
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