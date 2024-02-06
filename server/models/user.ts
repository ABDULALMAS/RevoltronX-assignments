import mongoose, { Document } from "mongoose";

interface IUser extends Document {
  name?: string;
  email: string;
  password: string;
  id?: string;
  role: string
}

const userSchema =  new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
  role: {
    type: String,
    enum: ["user", "approver", "administrator", "writer"],
    default: "user",
  }
});

const UserModel = mongoose.model<IUser>("UserModel", userSchema);

export default UserModel;
