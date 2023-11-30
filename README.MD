# Service B README

Service B is a part of a two-service system designed to provide GraphQL functionality with a focus on schema and type definition updates. This README will guide you through setting up and understanding Service B's purpose and functionality.

## Overview
Service B is a backend service responsible for managing MongoDB schema models and GraphQL type definitions. It is designed to work alongside another service, referred to as "Service A," which handles basic GraphQL endpoints such as signup and login. The primary objective of Service B is to ensure that Service A always uses the most up-to-date versions of GraphQL type definitions and schema models.

Key components of Service B include:
- Express.js server to expose endpoints for retrieving GraphQL type definitions and schema models.
- GitHub Actions workflow for automatically updating Service A with the latest type definitions upon changes.

## Features
Service B includes the following features:
- **GraphQL Schema and Type Definitions**: Service B stores GraphQL schema and type definitions in separate files (`typeDefs.js` and `UserModel.js`).

- **Endpoint for GraphQL Config**: It exposes an endpoint (`/graphql-config`) to retrieve the current GraphQL schema and type definitions.

- **Endpoint for MongoDB Config**: It exposes an endpoint (`/mongodb-config`) to retrieve the current MongoDB schema models.

- **GitHub Actions Workflow**: A GitHub Actions workflow (`workflow.yml`) is set up to automatically update Service A with the latest GraphQL schema and type definitions upon changes. It pushes these updates to the Service A repository.

## Prerequisites
Before you begin using Service B, ensure you have the following prerequisites in place:
- Node.js and npm installed.
- Access to a MongoDB database for schema modeling (or replace it with your preferred database).
- Knowledge of GraphQL and Express.js.

## Installation
1. Clone the Service B repository to your local environment.
2. Install dependencies by running `npm install` in the root directory.

## Usage
### Local Development
1. Configure the paths to your GraphQL schema and MongoDB schema model files in `index.js`:
   - `typeDefsFilePath`: Path to your GraphQL schema file (e.g., `./typeDefs.js`).
   - `userModelFilePath`: Path to your MongoDB schema model file (e.g., `./UserModel.js`).

2. Start Service B locally:
   ```bash
   npm start
   ```
   This will start the Express.js server on `http://localhost:3001`.

### GitHub Actions Workflow
Service B is designed to work in conjunction with Service A using GitHub Actions. When changes are pushed to Service B's repository, it automatically triggers a workflow to update Service A with the latest GraphQL schema and type definitions.

To set up the workflow, make sure you have configured the following in `workflow.yml`:
- Replace `main` with the name of your main branch if it's different.
- Set `API_TOKEN_GITHUB` in your GitHub repository's secrets with the necessary permissions to push changes to Service A's repository.
- Adjust the paths and repository information as needed.