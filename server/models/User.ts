import {Schema, model} from 'mongoose';

const UserSchema = new Schema(
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