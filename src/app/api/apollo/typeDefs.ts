
const typeDefs = `#graphql
  scalar DateTime

  type Query {
    Hello: String
  }

  type AuthPayload {
    token: String
    user: User
  }

  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    projects: [Project]
  }

  type Project {
    id: ID!
    name: String!
    description: String!
    isActive: Boolean
    createdBy: User
    dueDate: DateTime
    tasks: [Task]
  }

  type Task {
    id: ID!
    name: String!
    description: String!
    isActive: Boolean
    dueDate: DateTime
    project: Project!
  }

  type Query {
    users: [User]
    user(id: ID!): User
    projects: [Project]
    project(id: ID!): Project
    tasks: [Task]
    task(id: ID!): Task
  }

  type Mutation {
    signup(email: String!, password: String!, name: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    
    createProject(name: String!, description: String!, dueDate: DateTime): Project
    createTask(name: String!, description: String, dueDate: DateTime, projectId: ID!): Task
    
    removeProject(id: ID!): Project
    removeTask(id: ID!): Task
    removeUser(id: ID!): User

    updateProject(id: ID!, name: String, description: String, dueDate: DateTime, isActive: Boolean): Project
    updateTask(id: ID!, name: String, description: String, dueDate: DateTime, isActive: Boolean): Task
    updateUser(id: ID!, name: String, email: String, password: String): User
  }

`;

export default typeDefs;