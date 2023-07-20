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
  mutation Mutation($name: String!, $description: String!, $status: String!, $userId: ID!) {
    addProject(name: $name, description: $description, status: $status, userId: $userId) {
      _id
      name
      status
      description
      userId
    }
  }
`;

export const ADD_TASK = gql`
  mutation Mutation($projectId: ID!, $name: String!, $description: String!, $dueDate: String!, $priority: String!, $status: String!) {
    addTask(projectId: $projectId, name: $name, description: $description, dueDate: $dueDate, priority: $priority, status: $status) {
      _id
      description
      name
      status
    }
  }
`

export const ADD_TASK_sunset = gql`
  mutation($title: String!, $description: String, $dueDate: String!, $priority: String, $project: ID!, $assignee: ID!) {
    addTask(title: $title, description: $description, dueDate: $dueDate, priority: $priority, project: $project, assignee: $assignee) {
      _id
      task {
        _id
        title
        description
        dueDate
        priority
        assignee {
          _id
          username
        }
      }
    }
  }
`;