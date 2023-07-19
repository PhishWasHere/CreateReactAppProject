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
  query project($_id: ID!) {
    project(_id: $_id) {
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