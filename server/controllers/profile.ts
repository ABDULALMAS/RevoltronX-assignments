import express, { Request, Response } from "express";
import mongoose from "mongoose";
import ProfileModel from "../models/profile.ts";

const router = express.Router();

export const getProfile = async (req: Request, res: Response) => {
  try {
    const postProfile = await ProfileModel.find();

    res.status(200).json(postProfile);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createProfile = async (req: Request, res: Response) => {
  const profile = req.body;

  const newProfile = new ProfileModel(profile);
  try {
    const savedProfile = await newProfile.save();

    res.status(201).json(savedProfile);
  } catch (error) {
    res.status(409).json(error);
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  const { id: _id } = req.params;
  const profile = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No profile with that id");

  const updatedProfile = await ProfileModel.findByIdAndUpdate(
    _id,
    profile,
    {
      new: true,
    }
  );
  
  if (updatedProfile) {
    res.json(updatedProfile);
  } else {
    res.status(404).send("Profile not found");
  }
};

export default router;
