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
    _id: ID
    name: String
    description: String
    createdBy: User
    status: String
    tasks: [Task]
  }

  type Task {
    _id: ID
    title: String
    description: String
    dueDate: String
    priority: String
    project: Project
    assignee: User
    status: String
  }

  type Query {
    users: [User]
    projects: [Project]
    project(projectId: ID!): Project
    tasks(projectId: ID!): [Task]
    task(_id: ID!): Task
  }
  

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addProject(name: String!, description: String, createdBy: ID!): Project
    addTask(title: String!, description: String, dueDate: String!, priority: String, projectId: ID!, assignee: ID!): Project
  }
  
`;


module.exports = typeDefs;
