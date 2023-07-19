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
    tasks: [Task]
    status: String
  }

  type Task {
    _id: ID
    title: String
    description: String
    dueDate: String
    priority: String
    project: Project
    assignee: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    projects: [Project]
    project(_id: ID!): Project
    tasks: [Task]
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
    addTask(title: String!, description: String, dueDate: String!, priority: String, project: ID!, assignee: ID!): Task
  }
  
`;


module.exports = typeDefs;
