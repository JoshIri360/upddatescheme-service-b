import express from "express";
import cors from "cors";
import fs from "fs";
import bodyParser from "body-parser"; // Add body-parser to parse JSON requests

const app = express();
app.use(cors());
app.use(bodyParser.json()); // Use body-parser to parse JSON requests

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

// Handle POST request to update typeDefs file
app.post("/update-graphql-config", (req, res) => {
  try {
    const newTypeDefsContent = req.body.typeDefsContent; // Assuming the request body contains the new content
    fs.writeFileSync(typeDefsFilePath, newTypeDefsContent, "utf-8");
    res.status(200).send("TypeDefs file updated successfully.");
  } catch (error) {
    console.error("Error updating typeDefs file:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Handle POST request to update UserModel file
app.post("/update-mongodb-config", (req, res) => {
  try {
    const newUserModelContent = req.body.userModelContent; // Assuming the request body contains the new content
    fs.writeFileSync(userModelFilePath, newUserModelContent, "utf-8");
    res.status(200).send("UserModel file updated successfully.");
  } catch (error) {
    console.error("Error updating UserModel file:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3001, () => {
  console.log("Service B is running on http://localhost:3001");
});
