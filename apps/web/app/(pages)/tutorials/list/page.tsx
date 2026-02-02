import { GET_TUTORIALS_LIST, ApolloProviderWrapper, createServerApolloClient } from "@repo/gql";
import TutorialsPage from "./TutorialsPage";


export default async function TutorialsListPage() {
  const client = createServerApolloClient("user");

  await client.query({
    query: GET_TUTORIALS_LIST,
    variables: {
      Filters: {}
    }
  });

  const initialApolloState = client.cache.extract(); // cache to hydrate client

  return (
    <ApolloProviderWrapper initialApolloState={initialApolloState} role="user">
      <TutorialsPage />
    </ApolloProviderWrapper>
  );
}
