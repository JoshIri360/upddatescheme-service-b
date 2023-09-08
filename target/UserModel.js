import { model, Schema } from "mongoose";

const UserSchema = new Schema({
  username: String,
  password: String,
  createdAt: String,
  email: String,
  profilePic: String,
});

const User = model("User", UserSchema); 

export default User;
