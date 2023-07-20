const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type User {
    _id: ID
    username: String
    email: String
    password: String
    projects: [Project]
    tasks: [Task] 
  }

  type Project {
    _id: ID!
    user: User!
    name: String!
    description: String!
    status: String!
    tasks: [Task!]!
  }

  type Task {
  _id: ID!
  project: Project!
  name: String!
  description: String!
  dueDate: String!
  priority: String!
  status: String!
  }
  
  type Auth {
    token: ID!
    user: User 
  }

  type Query {
    users: [User]
    projects: [Project]
    project(projectId: ID!): Project
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addProject(name: String!, description: String!, status: String!, userId: ID!): Project
    addTask(projectId: ID!, name: String!, description: String!, dueDate: String!, priority: String!, status: String!): Task
  }
  
`;


module.exports = typeDefs;
