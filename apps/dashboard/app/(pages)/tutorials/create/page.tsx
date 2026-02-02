import Link from "next/link";
import { CREATE_TUTORIAL, ApolloProviderWrapper, createServerApolloClient } from "@repo/gql";
import { gql } from "@apollo/client";
import CreateTutorialPage from "./CreateTutorial";


export default async function TutorialsListPage() {

  return (
    <ApolloProviderWrapper role="admin">
      <CreateTutorialPage />
    </ApolloProviderWrapper>
  );
}
