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
    user(userId: ID!): User
    projects: [Project]
    project(projectId: ID!): Project
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addProject(name: String!, description: String!, status: String!, userId: ID!): Project
    addTask(projectId: ID!, name: String!, description: String!, dueDate: String!, priority: String!, status: String!): Project
    removeTask(projectId: ID!, taskId: ID!): Project
    removeProject(projectId: ID!): Project
    updateProject(projectId: ID!, name: String!, description: String!, status: String!): Project
    updateTask(projectId: ID!, taskId: ID!, name: String!, description: String!, dueDate: String!, priority: String!, status: String!): Project
  }
  
`;


module.exports = typeDefs;
