import { gql } from '@apollo/client';
 
export const QUERY_PROJECTS = gql`
  query {
    projects {
      _id
      description
      name
      status
      tasks {
        _id
      }
    }
  }
`;

export const QUERY_PROJECT = gql`
  query project($projectId: ID!) {
    project(projectId: $projectId) {
      _id
      name
      description
      status
      tasks {
        description
        _id
        dueDate
        name
        priority
        status
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($userId: ID!) {
    user(userId: $userId) {
      _id
      username
      projects {
        _id
        name
        description
        status
        tasks {
          description
          _id
          dueDate
          name
          priority
          status
        }
      }
    }
  }
`;