import Link from "next/link";
import { notFound } from "next/navigation";
import { tutorials } from "../dummyTutorials";
import { gql } from "@apollo/client";
import TutorialViewer from "./TutorialViewr";
import { ApolloProviderWrapper, createServerApolloClient, GET_TUTORIAL } from "@repo/gql";
import { log } from "console";

interface PageProps {
  tutorialId: Promise<{ tutorialId: string }>;
}


export default async function TutorialPage({ params }: PageProps) {
  const resolvedParams = await params

  const client = createServerApolloClient("user");
  await client.query({
    query: GET_TUTORIAL,
    variables: { ID: resolvedParams.tutorialId },
    context: {
      headers: {
        Authorization: `Bearer ...`,
        Cookie: "sessionId=abcd1234",
      },
    },
  });

  const initialApolloState = client.cache.extract(); // cache to hydrate client

  return (
    <ApolloProviderWrapper initialApolloState={initialApolloState} role="user">
      <TutorialViewer tutorialId={resolvedParams.tutorialId} />
    </ApolloProviderWrapper>
  );
}
