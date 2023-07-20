import { gql } from '@apollo/client';
 
export const QUERY_PROJECTS = gql`
  query {
    projects {
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

export const QUERY_PROJECT = gql`
  query project($projectId: ID!) {
    project(projectId: $projectId) {
      _id
      name
      description 
      tasks {
        _id
        title
        description
        dueDate
        priority
        assignee {
          _id
          username
          email
        }
        status
      }
      status
    }
  }
`;