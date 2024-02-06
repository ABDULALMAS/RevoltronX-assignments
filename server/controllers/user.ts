import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import UserModel from "../models/user.ts";
import mongoose from "mongoose";

const secret = "testing";

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body ;
 

  try {
    const oldUser = await UserModel.findOne({ email });
   

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      oldUser.password as string
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { email: oldUser.email, id: oldUser._id },
      secret,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const oldUser = await UserModel.findOne({ email });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModel.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      secret,
      {
        expiresIn: "1d",
      }
    );

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};

export const getUsers = async (req: Request, res: Response) => {
try {
  const Users = await UserModel.find();


  res.status(200).json(Users);

} catch (error) {
  res.status(404).json({message: error.message})
}
}

export const updateRole = async (req: Request, res: Response) => {
  try {
    const { id: _id} = req.params;
    const  {role: newRole}  = req.body;


    if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No user with that id");

    const updatedUser = await UserModel.findByIdAndUpdate(
      _id,
      { $set: { role: newRole } },
      {new: true}
      )
      
      console.log(updatedUser)
if(updatedUser) {
  res.json({message: "User Role Updated Successfully", user: updatedUser})
}
else{
  res.status(404).json({message: "User not found"});
}

  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
