import  express,{Request, Response } from "express";
import HighlightsModel from "../models/highLights";
import mongoose from "mongoose";

export const createHighlights = async(req: Request, res: Response) => {
    try {
      const { highlights, userId } = req.body; 
      const { id: _id } = req.params; 

      
      const result = await HighlightsModel.findOneAndUpdate(
       { userId: userId, tagId: _id},
       { $addToSet: { highlights: highlights}},
       {upsert: true, new: true}
      );

      if(!result) {
        console.log("New highlights document created!")
      }

      console.log(result)
      res.status(200).json({message: "Highlight added successfully",result})
    
    } catch (error) {
        res.status(500).json({ message: 'Error highlighting article', error: error.message });
    }
  }


  export const getHighlights = async (req: Request, res: Response) => {
    try {
      const { userId, tagId } = req.params;

    
  
      // if (!mongoose.Types.ObjectId.isValid(_id))
      // return res.status(404).send("No bookmark with that user id");
  
      const result = await HighlightsModel.findOne({ userId: userId, tagId: tagId });
  
      if (!result) {
        return res.status(404).json({ message: "No highlights found for the given user and tag" });
      }
  
      res.status(200).json({ message: "Highlights fetched successfully", result });
    } catch (error) {
      console.error("Error fetching highlights:", error);
      res.status(500).json({ message: "Error fetching highlights", error: error.message });
    }
  };
  
  export const updateScrollPosition = async( req: Request, res: Response) => {
    try {
      const { scrollPosition, userId } = req.body; 
      const { id: _id } = req.params; 

      const result = await HighlightsModel.findOneAndUpdate(
        { userId: userId, tagId: _id},
        { $set: { scrollPosition: scrollPosition}},
        {upsert: true, new: true}
       );
       if(!result) {
        console.log("New document created!")
      }

      
      res.status(200).json({message: "scroll position added successfully",result})
    
    } catch (error) {
        res.status(500).json({ message: 'Error highlighting article', error: error.message });
    }
  }

  export const createNote = async(req: Request, res: Response) => {
    try {
      const { id : _id} = req.params;
      const { note , tagId} = req.body;

     const newNote = {
      ...note,
      createdAt: new Date().toISOString(),

     }

     const updatedNote = await HighlightsModel.findOneAndUpdate(
      { userId: _id, tagId: tagId },
      { $push: { notes: newNote } },
      { new: true , upsert: true}
    );

    res.status(200).json({message:"note added successfully", updatedNote})
     
    } catch (error) {
      res.status(500).json({ message: 'Error highlighting article', error: error.message });
      
    }
  }