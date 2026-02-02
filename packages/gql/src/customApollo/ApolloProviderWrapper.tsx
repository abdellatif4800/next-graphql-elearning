"use client";

import { ApolloProvider } from "@apollo/client/react";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ReactNode, useMemo } from "react";

function createClientApolloClient(
  role: "user" | "admin",
  initialState?: Record<string, any>,
) {
  return new ApolloClient({
    link: new HttpLink({
      uri:
        role === "user"
          ? process.env.NEXT_PUBLIC_GRAPHQL
          : process.env.NEXT_PUBLIC_ADMIN_GRAPHQL,
    }),
    cache: new InMemoryCache().restore(initialState ?? {}),
  });
}

export function ApolloProviderWrapper({
  children,
  role,
  initialApolloState,
}: {
  children: ReactNode;
  role: "user" | "admin";
  initialApolloState?: Record<string, any>;
}) {
  const client = useMemo(
    () => createClientApolloClient(role, initialApolloState),
    [role, initialApolloState]
  );

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
