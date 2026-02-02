import { gql } from "@apollo/client";

export const GET_TUTORIAL = gql`
query Tutorial($ID: ID!) {
  tutorialById(id: $ID) {
    id
    tutorialName
    unitsTitlesList
    units {
      id
      order
      content
      tutorialId
    }
  }
}
`;

export const GET_TUTORIALS_LIST = gql`
query Tutorial($Filters: FilterTutorialInput!){
  tutorialList(filters: $Filters){
    id
    tutorialName
    level
    category
    units {
      id
      order
      content
      tutorialId
    }
  }
}
`;

