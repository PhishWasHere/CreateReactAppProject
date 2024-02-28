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
const signupMutation = gql`mutation($email: String!, $password: String!, $name: String!) {
  signup(email: $email, password: $password, name: $name) {
    user {
      email
      name
      password
    }
  }
}
`
const removeUserMutation = gql`mutation($id: ID!) {
    removeUser(id: $removeUserId) {
    id
  }
}
`
const updateUserMutation = gql`mutation($name: String!, $email: String!, $password: String!) {
  updateUser(name: $name, email: $email, password: $password) {
    name
    email
    password
  }
}
`

const createProjectMutation = gql`mutation($name: String!, $description: String!, $dueDate: DateTime) {
  createProject(name: $name, description: $description, dueDate: $dueDate) {
    description
    dueDate
    name
  }
}
`

