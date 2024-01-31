


import mongoose, { Document } from 'mongoose';

export interface PostArticleModel {
  title: string;
  category: string;
  message: string;
  name: string;
  creator: string;
  tags: string[];
  selectedFile: string;
  likes: string[];
  comments: string[];
  createdAt: Date;
<<<<<<< HEAD
=======
  status: string;
>>>>>>> role-based-access-control
}

export type PostArticleDocument = Document & PostArticleModel;

const articleSchema = new mongoose.Schema({
  title: String,
  category: String,
  message: String,
  name: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  comments: { type: [String], default: [] },
  createdAt: {
    type: Date,
    default: new Date(),
  },
<<<<<<< HEAD
=======
  status: {
    type: String,
    enum: ["pending", "approved"],
    default: "pending",
  }
>>>>>>> role-based-access-control
});

const PostArticle = mongoose.model<PostArticleDocument>('PostArticle', articleSchema);

<<<<<<< HEAD
export default PostArticle;
=======
export default PostArticle;
>>>>>>> role-based-access-control
