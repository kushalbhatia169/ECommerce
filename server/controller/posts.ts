import mongoose from "mongoose";
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
      res.status(200).json({
        posts: getPosts
      });
    } catch (error) {
      res.status(404).json({message: error});
    }
  }

  deletePost = async(req: Request, res: Response) => {
    try {
      const { params:{ id = false } } = req;
      if(id && !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          message: `No post found with Id: ${id}`
        });
      }

      await PostMessage.findByIdAndDelete(id);

      return res.status(200).json({
        message: "post Deleted successfully."
      });
    } catch(error) {

    }
  }
}

export default PostActions;
