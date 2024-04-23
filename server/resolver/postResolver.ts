import { iPostSchema } from "../models/postMessage.model";

import Post from '../models/postMessage.model';
// const jwt = require('jsonwebtoken')
// const jwtSecret = require('../config/jwtConfig')

export const PostsResolver = {

  getPosts: async () => {
    return Post.find({})
    .then((posts: iPostSchema[]) => {
      return posts.map((post) => ({
        id: post._id,
        title: post.title,
        message: post.message,
        creator: post.creator,
        tags: post.tags,
        selectedFile: post.selectedFile,
        likeCount: post.likeCount,
        createdAt: post.createdAt
      }))
    })
  },
  
  createPost: async (parent: unknown ,args: any) => {
    try{
      //const {id} = jwt.verify(args.token,jwtSecret.secret)
      console.log(args);
      const { title, message, creator, tags, selectedFile } = args;
      const post = new Post({ title, message, creator, tags, selectedFile });
      await post.save();

      return ({
        err : false,
        msg : "Post Created Successfully"
      });
    } catch(error){

      return ({
        err : true,
        msg : "Cound not create the post."
      })
    }
  },

  deletePost: async (parent: unknown, args: any) => {
    try{
        //const {id} = jwt.verify(args.token,jwtSecret.secret);
      await Post.findByIdAndDelete(args.id).then(() => {
        return {
          message: true
        }
      })
      .catch(err => {
        throw new Error(err);
      });
    }catch(error){
        return ({
          err : true,
          msg : "Cound not delete the post."
        })
    }
  }

  // updatePost: async (parent,args) => {
  //     try{
  //         const {id} = jwt.verify(args.token,jwtSecret.secret)
  //         return User.findOne({user : id})
  //             .then(async (user) => {
  //                 if(!user){
  //                     return ({
  //                         err : true,
  //                         msg : "Unauthenticated User"
  //                     })
  //                 }
  //                 return Post.findOne({ $and : [{_id : args.id},{userName : user.user}]})
  //                 .then(async (post) => {
  //                     post.text = args.text
  //                     await post.save()
  //                     return ({
  //                         err : false,
  //                         msg : "Post Updated Successfully"
  //                     })
  //                 })
  //             })
  //     }catch(error){
  //         return ({
  //             err : true,
  //             msg : "Cound not update the post."
  //         })
  //     }
  // },
}   