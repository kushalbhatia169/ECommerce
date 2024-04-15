import mongoose from "mongoose";

interface iPostSchema {
    title: string;
    message: string;
    creator: string;
    tags: string[];
    selectedFile: string;
    likeCount: number;
    createdAt: Date;
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