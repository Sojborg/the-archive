import {Schema, model} from 'mongoose';

export interface IUser {
  id?: string;
  username: string;
  password: string;
  profilePic?: string;
  isAdmin?: boolean;
  loggedIn?: Date;
}

const UserSchema = new Schema<IUser>(
  {
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    profilePic: {type: String, defaut: ""},
    isAdmin: {type: Boolean, default: false},
    loggedIn: {type: Date}
  },
  {timestamps: true}
);

export const User = model("User", UserSchema);