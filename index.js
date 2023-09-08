import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(cors());

// File paths for typeDefs and UserModel files
const typeDefsFilePath = "./typeDefs.js";
const userModelFilePath = "./UserModel.js";

app.get("/graphql-config", (req, res) => {
  try {
    // Read the content of the typeDefs file
    const typeDefsContent = fs.readFileSync(typeDefsFilePath, "utf-8");

    res.setHeader("Content-Type", "text/plain");
    res.send(typeDefsContent);
  } catch (error) {
    console.error("Error reading typeDefs file:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/mongodb-config", (req, res) => {
  try {
    // Read the content of the UserModel file
    const userModelContent = fs.readFileSync(userModelFilePath, "utf-8");

    res.setHeader("Content-Type", "text/plain");
    res.send(userModelContent);
  } catch (error) {
    console.error("Error reading UserModel file:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3001, () => {
  console.log("Service B is running on http://localhost:3001");
});
