import { Request, Response } from "express";
import mongoose from "mongoose";
import BookMarks from "../models/bookmarks.ts";

export const createBookMark = async(req: Request, res: Response) => {
try {
   const  { id: _id} = req.params;
   const { articleId : newId} = req.body;

   console.log(_id)
   console.log(newId)


   const result =  await BookMarks.findByIdAndUpdate(
    _id,
    {$addToSet: {bookmarks: newId}},
    {upsert: true, new: true}
   );

   if(!result){
       console.log('New document created:', _id);
    }



   res.status(200).json({message: "Article Bookmarked successfully"});
} catch (error) {
    res.status(500).json({ message: 'Error bookmarking article', error: error.message });
}
}

export const  getBookMarks = async(req: Request, res: Response) => {
try {
    const { id : _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No bookmark with that user id");


    const result = await BookMarks.findById(_id);
    res.status(200).json({message: "Bookmarks fetched successfully", result})
    
} catch (error) {
    res.status(404).json({ message: error.message });
    
}
}