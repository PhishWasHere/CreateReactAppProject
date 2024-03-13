import { gql } from "@apollo/client";

export const loginMutation = gql`mutation($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      id
      name
      email
    }
  }
}
`
export const signupMutation = gql`mutation($email: String!, $password: String!, $name: String!) {
  signup(email: $email, password: $password, name: $name) {
    user {
      email
      name
      password
    }
  }
}
`
export const removeUserMutation = gql`mutation($removeUserId: ID!) {
    removeUser(id: $removeUserId) {
    id
  }
}
`
export const updateUserMutation = gql`mutation($name: String!, $email: String!, $password: String!) {
  updateUser(name: $name, email: $email, password: $password) {
    name
    email
    password
  }
}
`

export const createProjectMutation = gql`mutation($name: String!, $description: String!, $dueDate: DateTime!, $userId: String) {
  createProject(name: $name, description: $description, dueDate: $dueDate, userId: $userId) {
    description
    dueDate
    name
    userId
    user{
      id
    }
  }
}
`

export const removeProjectMutation = gql`mutation($removeProjectId: ID!) {
    removeProject(id: $removeProjectId) {
    id
  }
}
`

export const updateProjectMutation = gql`mutation($updateProjectId: ID!, $name: String, $description: String, $dueDate: DateTime, $isActive: Boolean) {
    updateProject(id: $updateProjectId, name: $name, description: $description, dueDate: $dueDate, isActive: $isActive) {
    description
    dueDate
    isActive
    name
    id
  }
}
`

export const createTaskMutation = gql`mutation($name: String!, $description: String!, $dueDate: DateTime, $isActive: Boolean, $projectId: ID!) {
    createTask(name: $name, projectId: $projectId, description: $description, dueDate: $dueDate, isActive: $isActive) {
    description
    dueDate
    id
    isActive
    name
    project {
      id
    }
  }
}
`

export const removeTaskMutation = gql`mutation($removeTaskId: ID!) {
    removeTask(id: $removeTaskId) {
    id
  }
}
`

export const updateTaskMutation = gql`mutation($updateTaskId: ID!, $name: String, $description: String, $dueDate: DateTime, $isActive: Boolean) {
    updateTask(id: $updateTaskId, name: $name, description: $description, dueDate: $dueDate, isActive: $isActive) {
    description
    dueDate
    isActive
    name
    id
  }
}
` 