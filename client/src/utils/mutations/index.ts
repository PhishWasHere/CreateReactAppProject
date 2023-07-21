import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        enail
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_PROJECT = gql`
  mutation addProject($name: String!, $description: String!, $status: String!, $userId: ID!) {
    addProject(name: $name, description: $description, status: $status, userId: $userId) {
      _id
      description
      name
      status
      user {
        _id
      }
    }
  }
`;

export const ADD_TASK = gql`
  mutation addTask($projectId: ID!, $name: String!, $description: String!, $dueDate: String!, $priority: String!, $status: String!) {
    addTask(projectId: $projectId, name: $name, description: $description, dueDate: $dueDate, priority: $priority, status: $status) {
      _id
     tasks {
        _id
        name
        description
        dueDate
        priority
        status
     }
    }
  }
`