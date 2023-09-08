import User from "./UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { SECRET_KEY } from "./config.js";

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
}

function validateParamsNotEmpty(...params) {
  params.forEach((param) => {
    if (param.trim() === "") {
      throw new Error(`${param} must not be empty`);
    }
  });
}

export default {
  Query: {
    getUsers: async () => {
      try {
        const users = await User.find();
        return users;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) {
      validateParamsNotEmpty(username, email, password, confirmPassword);
      if (password !== confirmPassword) {
        throw new Error("Passwords must match");
      }
      // Ensure user doesn't already exist
      const user = await User.findOne({ username });
      if (user) {
        throw new Error("Username is taken");
      }
      // Hash password and create auth token
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        username,
        email,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();
      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
    async login(_, { username, password }) {
      validateParamsNotEmpty(username, password);
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error("User not found");
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        throw new Error("Invalid credentials");
      }
      const token = generateToken(user);
      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    async updateSchema(_, { typeDefs, userModel }) {
      try {
        fs.writeFileSync("./typeDefs.js", typeDefs, "utf-8");
        fs.writeFileSync("./UserModel.js", userModel, "utf-8");

        console.log("Updated typeDefs and UserModel files.");
        return "Schema updated successfully.";
      } catch (error) {
        console.error("Error updating schema:", error);
        throw new Error("Internal Server Error");
      }
    },
  },
};
