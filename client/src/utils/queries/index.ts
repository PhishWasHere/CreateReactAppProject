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