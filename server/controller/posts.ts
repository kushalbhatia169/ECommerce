import PostMessage from "../models/postMessage.model";
import { Request, Response } from "express";

class PostActions{
  createPost = (req: Request, res: Response) => {
    const {title, message, creator, tags, selectedFile } = req.body;

    if(!title || !message || !creator || !tags) {
      console.log("Not all values are there");
    }
    const newPostMessage = new PostMessage({title, message, creator, tags, selectedFile});

    try {
      newPostMessage.save();

      res.status(200).json({
        message:"Thanks for adding the memory"
      });
    } catch (error: any) {
      res.status(404).json({message: error});
    }
  }

  getPosts = async (_req: Request, res: Response) => {
    try {
      const getPosts = await PostMessage.find({});
      console.log(getPosts);
      res.status(200).json({
        posts: getPosts
      });
    } catch (error) {
      res.status(404).json({message: error});
    }
  }
}

export default PostActions;
