import mongoose from "mongoose";

const articleSchema = mongoose.Schema({
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
});

var PostArticle = mongoose.model("PostArticle", articleSchema);

export default PostArticle;