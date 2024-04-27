import { gql } from 'apollo-server'

export const typeDefs = gql`
  scalar Date

  type Post{
    id: ID
    title: String
    creator: String
    createdAt: Date
    message: String
    tags: [String]
    likeCount : Int
    selectedFile : String
  }

  input CreatePost{
    title: String!
    creator: String!
    message: String!
    tags: [String]
    selectedFile : String
  }

  type Response{
    err: Boolean!
    msg: String
  }

  type Query{
    getPosts: [Post!]!
  }

  type Mutation{
    createPost(title: String!, creator: String!, message: String!, tags: [String], selectedFile : String): Response!, 
    deletePost(id: ID!): Response!
    likePost(id: ID!): Response!
    reactPost(id: ID!, type: String!): Response!
  }
`

// type Mutation{
//       registerUser(input: User!): Response!
//       loginUser(email: String!, password: String!): Response!
//       createPost(token: String!, text: String!): Response!
//       deletePost(token: String!, id: ID!): Response!
//       updatePost(token: String!, id: ID!, text: String!): Response!
//       createComment(token: String!, id: ID!, text: String!): Response!
//       deleteComment(token: String!, post_id: ID!, comment_id: ID!): Response!
//       addLike(token: String!, id: ID!): Response!
//       removeLike(token: String!, id: ID!): Response!
//     }

// type Response{
//     err: Boolean!
//     posts: [Post]
//     token: String
//   }

// id: ID!
//       userName: String!
//       createdAt: Date!
//       text: String!
//       comments: [Comment]!
//       likes: [Like]!
//       likeCount : Int!
//       commentCount : Int!