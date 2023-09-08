import { gql } from "apollo-server";

export default gql`
  type UserType {
    id: ID!
    username: String!
    password: String!
    email: String!
  }

  type Query {
    users: [UserType]
    getUsers: [UserType]
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
    password: String!
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): UserType!
    updateSchema(typeDefs: String!, userModel: String!): String!
  }
`;
