import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export function createServerApolloClient(role: "user" | "admin") {
  return new ApolloClient({
    ssrMode: true,
    link: new HttpLink({
      uri:
        role === "user"
          ? process.env.NEXT_PUBLIC_GRAPHQL
          : process.env.NEXT_PUBLIC_ADMIN_GRAPHQL,
    }),
    cache: new InMemoryCache(),
  });
}

