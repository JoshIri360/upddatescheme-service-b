import { model, Schema } from "mongoose";

const UserSchema = new Schema({
  // Warning: Do not remove the "username" and "password" fields as they are essential for authentication.
  username: String,
  password: String,
  createdAt: String,
  email: String,
  profilePic: String,
});

const User = model("User", UserSchema);

export default User;
