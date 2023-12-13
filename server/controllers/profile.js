import express from "express";
import mongoose from "mongoose";
import ProfileModel from "../models/profile.js";

const router = express.Router();



export const getProfile = async(req,res) => {
    try {
      const postProfile = await ProfileModel.find();
  
      res.status(200).json(postProfile);
    } catch (error) {
      res.status(404).json({message: error.message});
    }
  }

export const createProfile = async (req, res) => {
    const profile = req.body;
  
    const newProfile = new ProfileModel({
      ...profile,
      
    });
    try {
      await newProfile.save();
  
      res.status(201).json(newProfile);
    } catch (error) {
      res.status(409).json(error);
    }
  };
  

  export const updateProfile = async (req, res) => {
    const { id: _id } = req.params;
    const profile = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send("No post with that id");
  
    const updatedProfile = await ProfileModel.findByIdAndUpdate(_id, profile, {
      new: true,
    });
    res.json(updatedProfile);
  };