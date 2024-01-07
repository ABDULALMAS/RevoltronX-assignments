import mongoose, { Document, Schema } from "mongoose";

export interface IProfile extends Document {
  userId?: string;
  photo?: string;
  name?: string;
  email?: string;
  age?: string;
  gender?: string;
  DOB?: string;
  phoneNumber?: string;
}

const profileSchema = new Schema<IProfile>({
  userId: { type: String, default: '' },
  photo: { type: String, default: '' },
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  age: { type: String, default: '' },
  gender: { type: String, default: '' },
  DOB: { type: String, default: '' },
  phoneNumber: { type: String, default: '' },
});

const ProfileModel = mongoose.model<IProfile>("ProfileModel", profileSchema);

export default ProfileModel;