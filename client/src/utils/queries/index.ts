import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query {
    users {
      _id
      username
      email
    }
  }
`;

export const QUERRY_SINGLE_USER = gql`
  query($userid: ID!) {
    user(userid: $userid) {
      _id
      username
      email
    }
  }
`;

export const QUERY_PROJECTS = gql`
  query($userid: ID!) {
    projects(userid: $userid) {
      _id
      name
      description
      createdBy {
        _id
        username
        email
      }
      tasks {
        _id
        title
        description
      }
    }
  }
`;

export const QUERY_TASK = gql`
  query($projectid: ID!) {
    tasks(projectid: $projectid) {
      _id
      title
      description
      dueDate
      priority
      project {
        _id
        name
        description
        createdBy {
          _id
          username
          email
        }
      }
      assignee {
        _id
        username
        email
      }
      comments {
        _id
        username
        email
      }
    }
  }
`;

export const QUERRY_PROJECT_DETAILS = gql`
  query($id: ID!) {
    singleProject(id: $id) {
      project {
        _id
        name
        description
        createdBy {
          _id
          username
          email
        }
      }
      tasks {
        _id
        title
        description
        dueDate
        priority
      }
      user {
        _id
        username
        email
      }
    }
  }
`;