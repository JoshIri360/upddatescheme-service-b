import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";
import { MONGODB } from "./config.js";
import axios from "axios";
import fs from "fs";

import resolvers from "./userResolvers.js";
import typeDefs from "./typeDefs.js";

// Function to fetch and update type definition file
async function updateTypeDefsFile() {
  try {
    const response = await axios.get("http://localhost:3001/graphql-config");
    const typeDefsContent = response.data;

    // Write the content to the local typeDefs file
    fs.writeFileSync("./typeDefs.js", typeDefsContent, "utf-8");
    console.log("Updated typeDefs file.");
  } catch (error) {
    console.error("Error updating typeDefs file:", error);
  }
}

// Function to fetch and update UserModel file
async function updateUserModelFile() {
  try {
    const response = await axios.get("http://localhost:3001/mongodb-config");
    const userModelContent = response.data;

    // Write the content to the local UserModel file
    fs.writeFileSync("./UserModel.js", userModelContent, "utf-8");
    console.log("Updated UserModel file.");
  } catch (error) {
    console.error("Error updating UserModel file:", error);
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Connected");
    return server.listen({ port: 4000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
    updateTypeDefsFile();
    updateUserModelFile();
  })
  .catch((err) => {
    console.error(err);
  });
