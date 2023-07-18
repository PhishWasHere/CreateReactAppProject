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
  mutation($name: String!, $description: String, $createdBy: ID!, $tasks: [ID]) {
    addProject(name: $name, description: $description, createdBy: $createdBy, tasks: $tasks) {
      _id
      name
      description
      createdBy {
        _id
        username
      }
      tasks {
        _id
        title
        description
      }
    }
  }
`;


export const ADD_TASK = gql`
  mutation($title: String!, $description: String, $dueDate: String!, $priority: String, $project: ID!, $assignee: ID!) {
    addTask(title: $title, description: $description, dueDate: $dueDate, priority: $priority, project: $project, assignee: $assignee) {
      _id
      title
      description
      dueDate
      priority
      project {
        _id
        name
        description
      }
      assignee {
        _id
        username
        email
      }
    }
  }
`;



