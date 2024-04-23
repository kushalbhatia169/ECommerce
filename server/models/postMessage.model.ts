import mongoose from "mongoose";

export interface iPostSchema {
    title: string;
    message: string;
    creator: string;
    tags: string[];
    selectedFile: string;
    likeCount: number;
    createdAt: Date;
    _id?: any;
};


const postSchema = new mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

const postMessage = mongoose.model<iPostSchema>('postMessage', postSchema);

export default postMessage;