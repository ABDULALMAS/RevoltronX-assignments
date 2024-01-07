import mongoose, { Document } from "mongoose";

interface IUser extends Document {
  name?: string;
  email: string;
  password: string;
  id?: string;
}

const userSchema =  new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
});

const UserModel = mongoose.model<IUser>("UserModel", userSchema);

export default UserModel;
