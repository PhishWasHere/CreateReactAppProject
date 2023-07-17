const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    createdAt: String
  }

  type Project {
    _id: ID
    name: String
    description: String
    createdBy: User
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
    comments: [User]
  }

  type Query {
    users: [User]!
    user(userid: ID!): User
    projects(userid: ID!): [Project]!
    tasks(projectid: ID!): [Task]!
    singleProject(id: ID!): ProjectDetails
  }

  type ProjectDetails {
    project: Project
    tasks: [Task]
    user: User
  }

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addProject(name: String!, description: String, createdBy: ID!, tasks: [ID]): Project
    addTask(title: String!, description: String, dueDate: String!, priority: String, project: ID!, assignee: ID!): Task
  }
  
`;


module.exports = typeDefs;
