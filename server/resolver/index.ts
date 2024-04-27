import dateScalar from "../scalars/Date";
import { PostsResolver } from "./postResolver";

export const Resolvers = {
  Query: {
    getPosts: PostsResolver.getPosts
  },
  Mutation: {
    createPost: PostsResolver.createPost,
    deletePost: PostsResolver.deletePost,
    reactPost: PostsResolver.reactPost
  },
  Date : dateScalar
}