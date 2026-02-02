import { gql } from "@apollo/client"

export const CREATE_TUTORIAL = gql`  mutation CreateTutorial($tutorialData: CreateTutorialInput!) {
  createTutorial(input: $tutorialData) {
    id
    tutorialName
    description
    level
    thumbnail
    units {
      content
      id
      tutorialId
      order
      unitTitle
    }
  }
}
`

//   "tutorialData": {
//     "authorId": "author 101",
//       "category": "back end",
//         "description": "asdsadadadsa",
//           "level": "easey",
//             "thumbnail": "image.png",
//               "tutorialName": "tutorial 101",
//                 "units": [
//                   {
//                     "content": "<div>Unit_01 content</div>",
//                     "order": 1,
//                     "unitTitle": "Unit_01 "
//                   },
//                   {
//                     "content": "<div>Unit_02 content</div>",
//                     "order": 2,
//                     "unitTitle": "Unit_02"
//                   }
//                 ]
//   }



