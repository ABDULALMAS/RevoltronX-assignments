import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import PostArticle, { PostArticleModel, PostArticleDocument } from '../models/postMessage.ts';

const router = express.Router();

<<<<<<< HEAD
=======

export const getArticlesTableData = async(req: Request, res: Response) => {
  try {
    
    const artcileTableData =  await PostArticle.find();

  res.status(200).json({
    data: artcileTableData,
    message: "Articles Table Data fetched successfully!"
  })
} catch (error) {
  res.status(404).json({message: error.message});
}
}

export const updateArticleStatus = async (req: Request, res: Response) => {
  
  
  try {
    const { id: _id } = req.params;
    const { status : newStatus} = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No article with that id");

  const updatedArticle = await PostArticle.findByIdAndUpdate(
    _id,
    { $set: {status : newStatus}},
    {new: true}
  )

  if(updatedArticle)
  res.json({ message: "Article status updated successfully!",data: updatedArticle})

  } catch (error) {
    
  }
}

>>>>>>> role-based-access-control
export const createArticle = async (req: Request, res: Response) => {
  const article = req.body as PostArticleModel;

  const newArticle = new PostArticle({
    ...article,
    createdAt: new Date().toISOString(),
  });

  try {
    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(409).json(error);
  }
};

export const getArticles = async (req: Request, res: Response) => {
  const { page } = req.query;
  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await PostArticle.countDocuments({});

    const articles = await PostArticle.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.status(200).json({
      data: articles,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const commentPost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { value } = req.body;

  const post = (await PostArticle.findById(id)) as PostArticleDocument;

  post.comments.push(value);

  const updatedPost = await PostArticle.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedPost);
};

export const getArticlesBySearch = async (req: Request, res: Response) => {
  const { searchQuery, tags } = req.query;

  try {
    let title: RegExp | undefined;

    if (searchQuery && typeof searchQuery === 'string') {
      title = new RegExp(searchQuery, 'i');
    }

    const posts = await PostArticle.find({
      $or: [{ title }, { tags: { $in: (tags as string).split(',') } }],
    });

    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


export const getArticle = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const post = await PostArticle.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  const { id: _id } = req.params;
  const post = req.body as PostArticleModel;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

  const updatedPost = await PostArticle.findByIdAndUpdate(_id, post, {
    new: true,
  });

  res.json(updatedPost);
};

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

  await PostArticle.findByIdAndDelete(id);

  res.json({ message: 'Post deleted successfully' });
};

export const likePost = async (req: any, res: Response) => {
  const { id } = req.params;

  if (!req?.userId) {
    return res.json({ message: 'Unauthenticated' });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  const post = await PostArticle.findById(id) as PostArticleDocument;

  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updatedPost = await PostArticle.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.status(200).json(updatedPost);
};