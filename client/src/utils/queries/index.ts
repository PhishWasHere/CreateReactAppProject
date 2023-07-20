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