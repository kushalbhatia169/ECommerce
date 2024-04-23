import { gql } from "graphql-tag";

export const GET_POSTS = gql`
  query {
    getPosts{
      id,
      title,
      creator,
      createdAt,
      message,
      tags,
      likeCount,
      selectedFile
    }
  }
`

// export const GET_POSTINFO = gql`
//     query($id : ID!){
//         getPostInfo(id: $id){
//             userName
//             createdAt
//             text
//             likes{
//                 userName
//             }
//             comments{
//                 userName
//                 text
//                 createdAt
//             }
//         }
//     }
// `

export const CREATE_POST = gql`
  mutation($title: String!, $creator: String!, $message: String!, $tags: [String], $selectedFile : String) {
    createPost(title: $title, creator: $creator, message: $message, tags: $tags, selectedFile : $selectedFile) {
      err
      msg
    }
  }
`

export const DELETE_POST = gql`
  mutation($id: ID!) {
    deletePost(id: $id) {
      err
      msg
    }
  }
`

// export const UPDATE_POST = gql`
//     mutation($token: String!, $id: ID!, $text: String!) {
//         updatePost(token: $token, id: $id, text: $text) {
//             err
//             msg
//         }
//     }
// `